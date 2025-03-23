import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EnrollmentForm from "./forms/EnrollForm";
import { cn } from "@/lib/utils";

const EnrollmentButton = ({className}: {className : string}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn("border-black px-3 py-2 border-2 hover:bg-[#2C5364] hover:text-gray-100", className)}>
            Enroll
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Us Today!</DialogTitle>
          <DialogDescription>
            Fill the form below and you&apos;re well on your way to your target!
          </DialogDescription>
        </DialogHeader>
        <EnrollmentForm />
      </DialogContent>
    </Dialog>
  );
};

export default EnrollmentButton;
