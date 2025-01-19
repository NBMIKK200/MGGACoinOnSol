window.Jupiter.init({
    displayMode: "integrated",
    integratedTargetId: "integrated-terminal",
    endpoint: "https://api.mainnet-beta.solana.com",
    defaultExplorer: "Solscan",
    formProps: {
      fixedOutputMint: true,
      swapMode: "ExactIn",
      initialAmount: "100000000",
      initialOutputMint: "FoyZoKXj8LxH29rND5AH5QcqGcH7FqeD8kjmN9zmpump",
      initialSlippageBps: 5,
    },
  });


  