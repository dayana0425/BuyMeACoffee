import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";
import { wagmiClient, chains } from "../helpers/rainbowSetup";
import { ApolloProvider } from "@apollo/client";
import client from "../helpers/apollo-client";

function MyApp({ Component, pageProps }) {
  const appInfo = {
    appName: "Hola Mundo"
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        showRecentTransactions={true}
        coolMode
        appInfo={appInfo}
        chains={chains}>
        <ApolloProvider client={client}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
