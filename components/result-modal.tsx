import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";

export default function Result({
  modalOpen,
  setModalOpen,
  review,
  balance,
  loading,
}) {
  const emojis = ["1f92f", "1f975", "1f976", "1f648"];
  const rand = Math.floor(Math.random() * 3);

  const icon = emojis[rand];

  return (
    <Dialog open={modalOpen}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-gray-800 p-6 rounded shadow-md">
        <DialogHeader>
          <DialogTitle>Analysis Result</DialogTitle>
          <DialogDescription>
            Merry christmas and happy new year in advance, enjoy your review,
            don't forget to share on your feed!
          </DialogDescription>
        </DialogHeader>

        <div id="result" className="text-gray-700 dark:text-gray-300">
          {!loading ? (
            <div className="flex flex-col items-center">
              <Image
                src={`https://fonts.gstatic.com/s/e/notoemoji/latest/${icon}/512.webp`}
                alt={icon}
                width={200}
                height={200}
              />
              <p className="text-sm text-center dark:text-gray-300">
                {balance}
              </p>
              <p className="text-sm text-center dark:text-gray-300">{review}</p>
            </div>
          ) : (
            <div className="space-y-2 flex flex-col items-center">
              <Skeleton className="h-[125px] w-[250px] rounded-xl dark:bg-gray-700" />
              <Skeleton className="h-4 w-[200px] dark:bg-gray-700" />
              <Skeleton className="h-4 w-[250px] dark:bg-gray-700" />
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              disabled={loading}
              onClick={() => setModalOpen(false)}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
