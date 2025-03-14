// This example is based on the wagmi SIWE tutorial
// https://wagmi.sh/examples/sign-in-with-ethereum
import '../styles/global.css';
import 'klaykit/styles.css';
import type { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  getDefaultWallets,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  AuthenticationStatus,
  Cypress,
  Baobab,
} from 'klaykit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { SiweMessage } from 'siwe';
import { useEffect, useMemo, useRef, useState } from 'react';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { chains, provider, webSocketProvider } = configureChains(
  [Cypress, Baobab],
  [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  chains,
});

const demoAppInfo = {
  appName: 'KlayKit Demo',
};

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  const fetchingStatusRef = useRef(false);
  const verifyingRef = useRef(false);
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>('loading');

  // Fetch user when:
  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) {
        return;
      }

      fetchingStatusRef.current = true;

      try {
        const response = await fetch('/api/me');
        const json = await response.json();
        setAuthStatus(json.address ? 'authenticated' : 'unauthenticated');
      } catch (_error) {
        setAuthStatus('unauthenticated');
      } finally {
        fetchingStatusRef.current = false;
      }
    };

    // 1. page loads
    fetchStatus();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', fetchStatus);
    return () => window.removeEventListener('focus', fetchStatus);
  }, []);

  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetch('/api/nonce');
        return await response.text();
      },

      createMessage: ({ nonce, address, chainId }) => {
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: 'Sign in with Klaytn to the app.',
          uri: window.location.origin,
          version: '1',
          chainId,
          nonce,
        });
      },

      getMessageBody: ({ message }) => {
        return message.prepareMessage();
      },

      verify: async ({ message, signature }) => {
        verifyingRef.current = true;

        try {
          const response = await fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, signature }),
          });

          const authenticated = Boolean(response.ok);

          if (authenticated) {
            setAuthStatus(authenticated ? 'authenticated' : 'unauthenticated');
          }

          return authenticated;
        } catch (error) {
          return false;
        } finally {
          verifyingRef.current = false;
        }
      },

      signOut: async () => {
        setAuthStatus('unauthenticated');
        await fetch('/api/logout');
      },
    });
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authAdapter}
        status={authStatus}
      >
        <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
}
