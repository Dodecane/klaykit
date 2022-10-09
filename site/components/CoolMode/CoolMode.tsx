import { Box } from 'components/Box/Box';
import { Button, Props as ButtonProps } from 'components/Button/Button';
import { useCoolMode } from 'lib/useCoolMode';
import React from 'react';
import { cool } from './CoolMode.css';

export function CoolMode() {
  const coolMetaMaskRef = useCoolMode('/metaMask.svg');
  const coolKaikasRef = useCoolMode('/kaikas.svg');
  const coolWalletConnectRef = useCoolMode('/walletConnect.svg');

  return (
    <Box className={cool} id="cool-mode-demo">
      <Box ref={coolKaikasRef}>
        <CoolButton src="/kaikas.svg">Kaikas</CoolButton>
      </Box>
      <Box ref={coolWalletConnectRef}>
        <CoolButton src="/walletConnect.svg">WalletConnect</CoolButton>
      </Box>
      <Box ref={coolMetaMaskRef}>
        <CoolButton src="/metaMask.svg">MetaMask</CoolButton>
      </Box>
    </Box>
  );
}

type CoolButtonProps = ButtonProps & { src: string };

function CoolButton(props: CoolButtonProps) {
  return (
    <Button
      prefix={
        <Box
          as="img"
          borderRadius="2"
          size="7"
          src={props.src}
          style={{ pointerEvents: 'none' }}
        />
      }
      size="xl"
      {...props}
      style={{
        justifyContent: 'center',
        userSelect: 'none',
        width: '100%',
      }}
    />
  );
}
