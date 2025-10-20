import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface FeatureUpdateDialogProps {
  label: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  icon?: React.ReactNode;
  muted?: boolean;
}

const FeatureUpdateDialog: React.FC<FeatureUpdateDialogProps> = ({
  label,
  className,
  size = "default",
  icon,
  muted = false,
}) => {
  const triggerClass = muted
    ? `w-full ${className || ""} bg-gray-200 text-gray-600 hover:bg-gray-200 border-gray-200 cursor-pointer`
    : className || "";
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={triggerClass} size={size}>
          {icon}
          {icon ? <span className="ml-2 -mt-0.5" /> : null}
          {label}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-book-600 to-book-700 text-white p-5">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 rounded-full p-2">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <AlertDialogTitle className="text-white text-lg">
                Temporarily Unavailable
              </AlertDialogTitle>
              <p className="text-white/90 text-sm">
                We’re upgrading checkout to bring you new features.
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-3">
          <AlertDialogDescription>
            The Buy Now and Checkout actions are temporarily disabled while we improve your shopping experience. This will only be for a short time.
          </AlertDialogDescription>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Faster, smoother payments</li>
            <li>Improved delivery options</li>
            <li>Better order tracking</li>
          </ul>
          <div className="rounded-md border border-book-200 bg-book-50 p-3 text-book-800 text-sm">
            Thank you for your patience — we’ll be back very soon.
          </div>
        </div>
        <AlertDialogFooter className="px-6 pb-6">
          <AlertDialogAction className="bg-book-600 hover:bg-book-700">
            Okay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FeatureUpdateDialog;
