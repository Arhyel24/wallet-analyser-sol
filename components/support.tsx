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
          variant="outline"
          className="bg-blue-600 dark:bg-gray-800"
        >
          Support
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <DialogHeader>
          <DialogTitle>Support Developer</DialogTitle>
          <DialogDescription>
            If you have any questions or need assistance, please don't hesitate
            to reach out to @earhyel on X (twitter).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 flex flex-col items-center">
          <p>Suprise your developer with something 🙊</p>

          <form
            method="post"
            className="w-[90%] mx-auto mt-10 space-y-2"
            onSubmit={handleClick}
          >
            <div className=" gap-2 flex">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="p-2 text-sm rounded border transition-colors duration-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-black"
              >
                <option value="ngn">NGN</option>
                <option value="usd">USD</option>
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
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded mt-1 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded"
            >
              Suprise
            </button>
          </form>
          <div ref={el} />
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
