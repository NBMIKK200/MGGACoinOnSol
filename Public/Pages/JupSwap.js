window.Jupiter.init({
  /** Required
   * Solana RPC endpoint
   * We do not recommend using the public RPC endpoint for production dApp, you will get severely rate-limited
   */
  endpoint: 'https://api.mainnet-beta.solana.com',
  // ...other props
});



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


  