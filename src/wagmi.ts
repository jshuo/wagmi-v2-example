import { http, createConfig } from "wagmi";
import { hardhat, polygonAmoy, mainnet, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const { WC_PROJECT_ID } = publicRuntimeConfig;

const connectors =
  typeof window !== "undefined"
    ? [
        injected(),
        coinbaseWallet({ appName: "Create Wagmi" }),
        walletConnect({ projectId: WC_PROJECT_ID }),
      ]
    : [];

export const config = createConfig({
  chains: [hardhat, polygonAmoy, mainnet,sepolia],
  connectors,
  ssr: true,
  transports: {
    [hardhat.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [mainnet.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
