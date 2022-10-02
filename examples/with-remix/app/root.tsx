import { useState } from 'react';
import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { json } from '@remix-run/node';
import type {
  MetaFunction,
  LinksFunction,
  LoaderFunction,
} from '@remix-run/node';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import type { Chain } from 'wagmi';
import {
  RainbowKitProvider,
  ConnectButton,
  getDefaultWallets,
  Cypress,
  Baobab,
} from '@rainbow-me/rainbowkit';

import globalStylesUrl from './styles/global.css';
import rainbowStylesUrl from '@rainbow-me/rainbowkit/styles.css';

type Env = { ALCHEMY_API_KEY?: string; PUBLIC_ENABLE_TESTNETS?: string };

type LoaderData = { ENV: Env };

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'RainbowKit Remix Example',
  viewport: 'width=device-width,initial-scale=1',
});

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: globalStylesUrl },
  { rel: 'stylesheet', href: rainbowStylesUrl },
];

// Note: These environment variables are hard coded for demonstration purposes.
// See: https://remix.run/docs/en/v1/guides/envvars#browser-environment-variables
export const loader: LoaderFunction = () => {
  const data: LoaderData = {
    ENV: {
    },
  };

  return json(data);
};

export default function App() {
  const { ENV } = useLoaderData<LoaderData>();

  // Remix modules cannot have side effects so the initialization of `wagmi`
  // client happens during render, but the result is cached via `useState`
  // and a lazy initialization function.
  // See: https://remix.run/docs/en/v1/guides/constraints#no-module-side-effects
  const [{ client, chains }] = useState(() => {
    const { chains, provider, webSocketProvider } = configureChains(
      [
        Cypress,
        Baobab,
      ],
      [jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) })]
    );

    const { connectors } = getDefaultWallets({
      appName: 'RainbowKit Remix Example',
      chains,
    });

    const client = createClient({
      provider,
      connectors,
      autoConnect: true,
    });

    return {
      client,
      chains,
    };
  });

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {client && chains ? (
          <WagmiConfig client={client}>
            <RainbowKitProvider chains={chains as Chain[]}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '12px',
                }}
              >
                <ConnectButton />
              </div>
            </RainbowKitProvider>
            <Outlet />
          </WagmiConfig>
        ) : null}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
