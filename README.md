# Project Report: Solana Wallet Analyzer using QuickNode Functions (Soltrace.xyz)

## 1. Project Overview

### Problem Statement

Managing cryptocurrency wallets can be challenging for users, especially those with multiple tokens and accounts. Existing tools often lack tailored feedback and actionable insights to help users understand and optimize their holdings.

### Solution

The Solana Wallet Analyzer addresses this by analyzing a user's wallet on Solana, retrieving balances, and providing a personalized review based on the difficulty level selected by the user. This functionality leverages QuickNode Functions for seamless blockchain data retrieval and uses Gemini's API for insightful feedback. The result is an interactive, user-friendly platform that enhances the user experience and provides meaningful insights into wallet holdings.

## 2. Integration Details

### QuickNode Functions Integration

QuickNode Functions are used to retrieve critical data from the Solana blockchain. This includes:

- Wallet balance (native SOL balance).
- Associated tokens and their respective balances.

#### Implementation

1. Setting Up QuickNode:

   - Created a QuickNode project with Solana endpoint enabled.
   - Configured QuickNode Functions to fetch wallet and token data.

2. Workflow:

   - User inputs their wallet address and selects a difficulty level.
   - QuickNode Functions fetch data using Solana’s RPC endpoints.
   - The retrieved data is passed to Gemini’s API for review generation.

#### Code Example

```javascript
// Using QuickNode to fetch wallet balance and tokens
const data = {
    network: "solana-mainnet",
    dataset: "block",
    blockNumber: 19532341,
    user_data: {
      max_fee: 0.5,
      wallet_address: wallet,
    },
  };

    try {
      const res = await fetch(
        "https://api.quicknode.com/functions/rest/v1/functions/6f4a6185-15c5-4327-8e9c-3d32ad59d83b/call?result_only=true",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();


      const review = await getremark(
        `${response.balance}, ${tokens.toString()}`,
        difficulty
      );

      setBalance(response.balance);
      setReview(review);
    } catch (error) {
      setError("Something went wrong, please try again!");
      console.error("Error details:", error);
```

### Integration with Gemini API

The retrieved wallet data is sent to Gemini’s API for generating insights and feedback based on the user's selected difficulty level.

#### Feedback Workflow

1. Data passed to Gemini with wallet statistics.
2. Gemini returns suggestions, portfolio diversification tips, and risk analysis.
3. Feedback is displayed on the website in a user-friendly format.

#### Example Response

```json
{
  "wallet": "<wallet_address>",
  "solBalance": 5.34,
  "tokens": [
    { "name": "USDC", "balance": 300 },
    { "name": "Raydium", "balance": 20 }
  ],
  "feedback": "Your portfolio is well-balanced. Consider diversifying further into stablecoins."
}
```

### Frontend Integration

- Technology Used: Nextjs for an interactive UI.
- Dynamic Feedback Display: User selects difficulty, and feedback is presented in real time.

## 3. Technical Documentation

### Environment Setup

1. QuickNode Setup:

   - Create a project in QuickNode.
   - Generate API keys and configure access for Solana Functions.

2. Gemini API Access:

   - Obtain API credentials.
   - Configure endpoints for sending and receiving data.

### Endpoints

#### QuickNode Functions

- getBalances

  - Input: Wallet address
  - Output: SOL balance

- `getTokenAccountsByOwner`

  - Input: Wallet address, Token Program ID
  - Output: List of associated tokens and balances

#### Gemini API

- Input: Wallet data (string)
- Output: Portfolio feedback (string)

### Error Handling

- Wallet Validation: Ensure valid Solana wallet address format.
- API Failures: Retry mechanism with user notification on failure.

## 4. Usability and Impact

### User Benefits

- Simplifies wallet analysis with personalized insights.
- Provides actionable recommendations for portfolio management.
- Scalable for different levels of user expertise (difficulty levels).

### Real-World Impact

This project empowers cryptocurrency users by providing them with better understanding and management of their assets. By leveraging blockchain transparency and tailored feedback, it simplifies portfolio optimization.

## 5. Demo and Repository

- Live Demo: [https://soltrace.xyz](https://soltrace.xyz)
- GitHub Repository: [https://github.com/arhyel24/wallet-analyser-sol](https://github.com/arhyel24/wallet-analyser-sol)

## 6. Content for X (Twitter)

### Post

🚀 Excited to launch my Solana Wallet Analyzer! 🔍

Built using @QuickNode Functions to fetch wallet balances & tokens, paired with @Gemini for personalized feedback. Seamlessly analyze your Solana wallet & get actionable insights.

🔗 Try it here: [demo link]
🛠️ Learn more: [GitHub link]

\#Solana #QuickNode #CryptoTools #BlockchainDevelopment

