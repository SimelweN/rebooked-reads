import { toast as sonnerToast } from "sonner";
import { useState } from "react";

interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const toast = ({ title, description, variant = "default" }: ToastOptions) => {
  if (variant === "destructive") {
    sonnerToast.error(title, {
      description,
    });
  } else {
    sonnerToast.success(title, {
      description,
    });
  }
};

export function useToast() {
  return { 
    toast,
    toasts: [] // Empty array for compatibility with Toaster component
  };
}
