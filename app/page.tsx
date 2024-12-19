"use client";
import { SyntheticEvent, useState } from "react";
import getremark from "./actions/get-remark";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeData(e: SyntheticEvent) {
    const apiKey = process.env.NEXT_PUBLIC_QNAPIKEY!;

    setError("");
    e.preventDefault();
    setLoading(true);

    if (!wallet || wallet.length !== 44) {
      setError(
        "Invalid wallet address. It must be 44 characters long and not empty."
      );
      setLoading(false);
      return;
    }

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

      const bal = await res.json();

      const review = await getremark(bal.balance);

      setBalance(bal.balance);
      setReview(review);
    } catch (error) {
      setError("Something went wrong, please try again!");
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="bg-blue-300 dark:bg-gray-900 dark:text-gray-200">
      <nav className="bg-blue-600 dark:bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-white text-lg font-bold">
            SOLTRACE
          </a>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                Support
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <header className="bg-blue-500 dark:bg-gray-700 text-white py-8 flex flex-column item-center justify-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">
            Get feedback on your SOL wallet activities!
          </h1>
          <p className="mt-2">Analyze your data with ease</p>
          <form
            id="analysis-form"
            className="w-[80%] mx-auto mt-10"
            onSubmit={analyzeData}
            method="POST"
          >
            <div className="mb-4">
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                placeholder="Enter your wallet address"
              />
            </div>
            {error && <p className="text-red-300">{error}</p>}
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Loading..." : "Analyze Wallet"}
            </button>
          </form>
        </div>
      </header>

      <section className="py-8">
        <div className="container mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Analysis Result</h2>
            <div id="result" className="text-gray-700 dark:text-gray-300">
              {balance ? (
                <>
                  <p>{balance}</p>
                  <p>{review}</p>
                </>
              ) : (
                <p>Enter wallet to get analysis!</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
