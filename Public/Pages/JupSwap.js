window.Jupiter.init({
  displayMode: "integrated",
  integratedTargetId: "integrated-terminal",
  endpoint: "https://misty-thrilling-scion.solana-mainnet.quiknode.pro/cf8404eb59e4ff88ff2ef1904ea16e8de1de0135/",
  defaultExplorer: "Solscan",
  formProps: {
      fixedOutputMint: true,
      swapMode: "ExactIn", // Swap mode: ExactIn or ExactOut
      initialAmount: "100000000", // Adjust to your desired input amount
      initialInputMint: "So11111111111111111111111111111111111111112", // Replace with your input token's mint address
      initialOutputMint: "FoyZoKXj8LxH29rND5AH5QcqGcH7FqeD8kjmN9zmpump", // Output token's mint address
      initialSlippageBps: 5, // Slippage tolerance in basis points (5 = 0.05%)
  },
});

