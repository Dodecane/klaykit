<a href="https://klaykit.vercel.app/">
  <img alt="klaykit" src="https://user-images.githubusercontent.com/372831/168174718-685980e0-391e-4621-94a1-29bf83979fa5.png" />
</a>

# KlayKit

**The best way to connect Klaytn wallet**

KlayKit is a [React](https://reactjs.org/) library that makes it easy to add wallet connection to your dapp.

- 🔥 Out-of-the-box wallet management
- ✅ Easily customizable
- 🦄 Built on top of [wagmi](https://github.com/tmm/wagmi), [ethers](https://docs.ethers.io) and [rainbowkit](https://github.com/rainbow-me/rainbowkit)

## Quick start

You can scaffold a new KlayKit + [wagmi](https://wagmi.sh) + [Next.js](https://nextjs.org) app with one of the following commands, using your package manager of choice:

```bash
npm init klaykit@latest
# or
yarn create klaykit@latest
# or
pnpm create klaykit@latest
```

## Documentation

For full documentation, visit [klaykit.vercel.app](https://klaykit.vercel.app/).

### Try it out

You can use the CodeSandbox links below try out KlayKit:

- with [Create React App](https://codesandbox.io/s/rainbowkit-create-react-app-1vwx1r)
- with [Create React App (TypeScript)](https://codesandbox.io/s/rainbowkit-create-typescript-app-xuxnqy)
- with [Next.js](https://codesandbox.io/s/rainbowkit-nextjs-gz890p)

## Examples

The following examples are provided in the [examples](./examples/) folder of this repo.

- `with-create-react-app`
- `with-next`
- `with-next-custom-button`
- `with-next-mint-nft`
- `with-next-siwe-iron-session`
- `with-remix`
- `with-vite`

### Running examples

To run an example locally, install dependencies.

```bash
pnpm install
```

Then go into an example directory, eg: `with-next`.

```bash
cd examples/with-next
```

Then run the dev script.

```bash
pnpm run dev
```

## License

Licensed under the MIT License.

See [LICENSE](./LICENSE) for more information.
