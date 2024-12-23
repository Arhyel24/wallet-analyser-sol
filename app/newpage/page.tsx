"use client";
import { SyntheticEvent, useState } from "react";
import { PublicKey } from "@solana/web3.js";
import { Client } from "@solflare-wallet/utl-sdk";
import getremark from "../actions/get-remark";
import About from "@/components/about";
import Support from "@/components/support";
import { ModeToggle } from "@/components/ui/darkmode-toggle";
import Result from "@/components/result-modal";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("");
  const [review, setReview] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [difficulty, setDifficulty] = useState("noobie");

  const handleChange = (event) => {
    setDifficulty(event.target.value);
  };

  const analyzeData = async (event: SyntheticEvent) => {
    const apiKey = process.env.NEXT_PUBLIC_QNAPIKEY!;

    event.preventDefault();
    setLoading(true);
    setError("");
    if (!wallet || wallet.trim().length !== 44) {
      setError("Invalid wallet address, please enter a valid wallet address");
      setLoading(false);
      return;
    }

    setModalOpen(true);

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

      // console.log(response);

      const accounts = response.accounts;

      //console.log(accounts);

      const tokens = await Promise.all(
        accounts.map(async (account) => {
          // Parse the account data
          const parsedAccountInfo = account.account.data;
          const mintAddress = parsedAccountInfo["parsed"]["info"]["mint"];
          const tokenBalance =
            parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];

          const mint = new PublicKey(mintAddress);
          const utl = new Client();

          // Fetch the mint information
          const token = await utl.fetchMint(mint);

          // return {
          //   name: token?.name || "Unknown Token",
          //   img: token?.logoURI || null,
          //   symbol: token?.symbol || "Unknown",
          //   mint: mint.toString(),
          //   tokenBalance,
          // };

          return `Name: ${token?.name || "Unknown Token"}, 
                Image: ${token?.logoURI || "No Image"}, 
                Symbol: ${token?.symbol || "Unknown"}, 
                Mint: ${mint.toString()}, 
                Token Balance: ${tokenBalance}`;
        })
      );

      // console.log("tokens: ", tokens);

      const review = await getremark(
        `${response.balance}, ${tokens.toString()}`,
        difficulty
      );

      setBalance(response.balance);
      setReview(review);
    } catch (error) {
      setError("Something went wrong, please try again!");
      console.error("Error details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-300 fixed w-full dark:bg-gray-900 dark:text-gray-200">
      <nav className="bg-blue-600 dark:bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-white text-lg font-bold">
            SOLTRACE
          </a>
          <ul className="flex space-x-4">
            <li>
              <About />
            </li>
            <li>
              <Support />
            </li>
            <li>
              <ModeToggle />
            </li>
          </ul>
        </div>
      </nav>

      <header className="bg-blue-500 dark:bg-gray-700 text-white py-8 flex min-h-screen flex-column item-center justify-center">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">
            Get feedback on your SOL wallet holdings!
          </h1>
          <p className="mt-2">Buckle up for some great response</p>
          <form
            id="analysis-form"
            className="w-[80%] mx-auto mt-10"
            method="POST"
            onSubmit={analyzeData}
          >
            <div className="mb-4">
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                placeholder="Enter your wallet address"
              />
              {error && <p className="text-red-300">{error}</p>}
            </div>
            <div className="p-3 font-sans">
              <h2 className="text-sm mb-1">Select Your Review Level</h2>
              <select
                value={difficulty}
                onChange={handleChange}
                className="p-2 text-sm rounded border transition-colors duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-black"
              >
                <option value="noobie">Noobie</option>
                <option value="pro">Pro</option>
                <option value="savage">Savage</option>
              </select>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded"
            >
              {loading ? "Analysing..." : "Analyze Wallet"}
            </button>
          </form>
        </div>
        <Result
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          balance={balance}
          review={review}
          loading={loading}
        />
      </header>
    </div>
  );
}
