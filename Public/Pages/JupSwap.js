window.Jupiter.init({
    displayMode: "integrated",
    integratedTargetId: "integrated-terminal",
    endpoint: "https://api.mainnet-beta.solana.com",
    defaultExplorer: "Solscan",
    formProps: {
      fixedOutputMint: true,
      swapMode: "ExactIn",
      initialAmount: "100000000",
      initialOutputMint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      initialSlippageBps: 5,
    },
  });
  