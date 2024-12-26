"use client";
import { SyntheticEvent, useState } from "react";
import Image from "next/image";
import { PublicKey } from "@solana/web3.js";
import { Client } from "@solflare-wallet/utl-sdk";
import getremark from "../actions/get-remark";
import About from "@/components/about";
import Support from "@/components/support";
import { Coins, DollarSign, History } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [balance, setBalance] = useState("");
  const [review, setReview] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("This is an error");
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
    <>
      <div className="p-4 fixed w-full top-2 flex z-50 justify-between items-center overflow-hidden px-8 md:px-20 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 bg-purple-950">
        <a href="/" className="flex gap-2 items-center justify-center">
          <Image
            src="/logo.jpg"
            width={100}
            height={100}
            alt="logo"
            className="h-10 w-10"
          />
          <a className="text-white text-lg font-bold">SOLTRACE</a>
        </a>
        <ul className="flex space-x-1 md:space-x-4">
          <li>
            <About />
          </li>
          <li>
            <Support />
          </li>
        </ul>
      </div>
      <div
        className="px-8 md:px-20 text-white flex justify-center w-full flex-col gap-4 transition-all
                      duration-300 scroll-smooth"
      >
        <div className="flex flex-column item-center justify-center mt-28">
          <div className="container mx-auto text-center flex flex-col justify-center gap-4">
            <h1 className="text-4xl font-bold">
              Get feedback on your SOL wallet holdings!
            </h1>
            <p className="mt-2 text-xl text-purple-100">
              Buckle up for some great response
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <div>
                <p className="text-lg text-purple-200">
                  Select response level:-
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className={`p-3 border-2 border-purple-600 rounded-md text-purple-100 text-sm ${
                    difficulty === "noobie" && "bg-purple-600"
                  }`}
                  onClick={() => setDifficulty("noobie")}
                >
                  Noobie
                </button>
                <button
                  className={`p-3 border-2 border-purple-600 rounded-md text-purple-100 text-sm ${
                    difficulty === "pro" && "bg-purple-600"
                  }`}
                  onClick={() => setDifficulty("pro")}
                >
                  Pro
                </button>
                <button
                  className={`p-3 border-2 border-purple-600 rounded-md text-purple-100 text-sm ${
                    difficulty === "savage" && "bg-purple-600"
                  }`}
                  onClick={() => setDifficulty("savage")}
                >
                  Savage
                </button>
              </div>
            </div>

            <div
              className="w-full flex border-2 h-20
          items-stretch justify-center relative rounded-xl overflow-hidden p-0 border-purple-400"
            >
              <input
                type="text"
                value={wallet}
                onChange={(e) => setWallet(e.target.value)}
                className="flex-1 p-4 h-20 bg-purple-950 text-purple-200 outline-none m-0"
                placeholder="Enter your SOL wallet address"
              />
              <button
                disabled={loading}
                type="submit"
                className="bg-purple-600 text-white px-4"
                onClick={analyzeData}
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>
            </div>

            {error && <p className="text-red-300 text-xs">{error}</p>}
          </div>
        </div>
        <hr className="outline-none border-dashed border border-purple-200" />

        <Tabs defaultValue="review" className="w-full">
          <TabsList className="w-full flex bg-purple-800 dark:bg-purple-800 ">
            <TabsTrigger
              value="review"
              className="flex-1 text-center bg-purple-800
             dark:bg-purple-800 text-white dark:text-white"
            >
              Review
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="flex-1 text-center bg-purple-800
             dark:bg-purple-800 text-white dark:text-white"
            >
              Analytics
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="review"
            className="border border-purple-500 p-2 rounded-md"
          >
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-xl">Review</h2>
              <div className="border-2 border-purple-400 rounded-lg w-full p-2">
                {review ? (
                  <>
                    <Image
                      src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f9d0/512.webp"
                      width={100}
                      height={100}
                      alt="emicon"
                    />
                    <p className="text-sm text-purple-50">{review}</p>
                  </>
                ) : (
                  <p className="text-sm text-purple-50 text-center">
                    No review yet, please connect or enter your wallet address
                  </p>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="analytics"
            className="border border-purple-500 p-2 rounded-md"
          >
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-xl">Analytics</h2>
              <div className="border-2 border-purple-400 rounded-lg w-full p-2">
                <div className="flex flex-col w-full">
                  <h3>General Info</h3>
                  <div className="flex flex-col md:flex-row  gap-4 border border-purple-600 p-4 rounded-md  bg-purple-900">
                    <div className="flex flex-nowrap flex-1 gap-2">
                      <div>
                        <DollarSign
                          className="h-full bg-purple-200 rounded-sm p-1 text-purple-600"
                          size={40}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-purple-100 text-xs">
                          Estimated Balance
                        </p>
                        <p className="text-lg text-white">$200,000</p>
                      </div>
                    </div>
                    <div className="flex flex-nowrap flex-1 gap-2">
                      <div>
                        <Coins
                          className="h-full bg-purple-200 rounded-sm p-1 text-purple-600"
                          size={40}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-purple-100 text-xs">
                          Token Types Hold
                        </p>
                        <p className="text-lg text-white">8</p>
                      </div>
                    </div>
                    <div className="flex flex-nowrap flex-1 gap-2">
                      <div>
                        <History
                          className="h-full bg-purple-200 rounded-sm p-1 text-purple-600"
                          size={40}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-purple-100 text-xs">Transactions</p>
                        <p className="text-lg text-white">2,101</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full mt-4">
                  <h3>Tokens Metrics</h3>
                  <div className="flex flex-col gap-4 border border-purple-600 p-4 rounded-md bg-purple-900">
                    <div className="flex flex-col md:flex-row gap-4 rounded-sm">
                      <div className="flex flex-nowrap flex-1 h-28  rounded-md bg-purple-950"></div>
                      <div className="flex flex-nowrap flex-1 h-28 rounded-md bg-purple-950"></div>
                    </div>
                    <div className="border border-purple-600 p-4 h-20 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* <Result
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          balance={balance}
          review={review}
          loading={loading}
        /> */}
      </div>
    </>
  );
}
