import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import FreeClassForm from "./forms/FreeClass";

const FreeClassButton = ({className}: {className : string}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn("border-black px-3 py-2 border-2 hover:bg-[#2C5364] hover:text-gray-100", className)}>
            Enroll
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get a taste of your future!</DialogTitle>
          <DialogDescription>
            Fill the form below to enroll for a free class!
          </DialogDescription>
        </DialogHeader>
        <FreeClassForm/>
      </DialogContent>
    </Dialog>
  );
};

export default FreeClassButton;
