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

export default function About() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-transparent text-white dark:text-white">
          About
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-purple-800 p-6 rounded shadow-md">
        <DialogHeader>
          <DialogTitle className="text-purple-100">About Soltrace</DialogTitle>
          <DialogDescription className="text-purple-200">
            Soltrace a new way of checking your wallet!
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="container mx-auto text-center py-12">
            <p className="text-purple-200">
              SOLTRACE is a simple, convenient, and user-friendly app that helps
              users analyze their SOL wallets and provide feedback on their
              holdings. We strive to make wallet analysis as easy as possible,
              making it accessible to everyone.
            </p>
          </div>
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
