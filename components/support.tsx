"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SyntheticEvent, useRef, useState } from "react";
import * as code from "@code-wallet/elements";

export default function Support() {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("ngn");
  const el = useRef<HTMLDivElement>(null);

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    const value = parseInt(amount, 10);
    if (!value || value < 0) {
      return;
    }
    if (currency === "ngn") {
      const { button } = await code.elements.create("button", {
        currency: "ngn",
        amount: value,
        destination: "3PNbsyVavwf17Jr36yfapzNeoLwzjY6eKmoMvdy87FWK",
      });

      if (button) {
        button.mount(el.current!);
      }
    } else {
      const { button } = await code.elements.create("button", {
        currency: "usd",
        amount: value,
        destination: "3PNbsyVavwf17Jr36yfapzNeoLwzjY6eKmoMvdy87FWK",
      });

      if (button) {
        button.mount(el.current!);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-transparent text-white dark:text-white"
        >
          Support
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-purple-800 p-6 rounded shadow-md">
        <DialogHeader>
          <DialogTitle className="text-purple-100">Support Developer</DialogTitle>
          <DialogDescription className="text-purple-200">
            If you have any questions or need assistance, please dont hesitate
            to reach out to @earhyel on X (twitter).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 flex flex-col items-center">
          <p className="text-purple-200">Suprise your developer with something 🙊</p>

          <form
            method="post"
            className="w-[90%] mx-auto mt-10 space-y-2"
            onSubmit={handleClick}
          >
            <div className="flex rounded-md overflow-hidden">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="px-2 text-sm transition-colors duration-300  text-white bg-purple-500 outline-none"
              >
                <option value="ngn" className="bg-purple-500 text-white rounded-none">NGN</option>
                <option value="usd" className="bg-purple-500 text-white rounded-none">USD</option>
              </select>
              <input
                type="number"
                placeholder={
                  currency === "ngn"
                    ? "Max amount is 2000"
                    : "Min amount is 0.5"
                }
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 p-2 border bg-white text-purple-500"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Suprise
            </button>
          </form>
          <div ref={el} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" className="text-white bg-purple-600">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
