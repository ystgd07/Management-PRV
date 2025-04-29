"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CustomSheet = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
  }
>(({ className, children, open, onOpenChange, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center",
        !open && "pointer-events-none opacity-0",
        open && "animate-in fade-in-0",
        className
      )}
      style={{ width: "420px", maxWidth: "100%", margin: "0 auto" }}
      {...props}
    >
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm",
          !open && "pointer-events-none opacity-0",
          open && "animate-in fade-in-0"
        )}
        style={{ width: "420px", maxWidth: "100%", margin: "0 auto" }}
        onClick={() => onOpenChange?.(false)}
      />
      {children}
    </div>
  );
});
CustomSheet.displayName = "CustomSheet";

const CustomSheetContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    hideCloseButton?: boolean;
    onClose?: () => void;
  }
>(
  (
    { className, children, hideCloseButton = false, onClose, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 w-full max-w-[420px] mx-auto rounded-t-xl border bg-background p-6 shadow-lg animate-in slide-in-from-bottom-10",
          className
        )}
        {...props}
      >
        <div className='w-12 h-1.5 bg-muted rounded-full mx-auto mb-6' />
        {!hideCloseButton && (
          <Button
            className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'
            variant='ghost'
            size='sm'
            onClick={onClose}
          >
            <X className='h-4 w-4' />
            <span className='sr-only'>Close</span>
          </Button>
        )}
        {children}
      </div>
    );
  }
);
CustomSheetContent.displayName = "CustomSheetContent";

const CustomSheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
CustomSheetHeader.displayName = "CustomSheetHeader";

const CustomSheetTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
CustomSheetTitle.displayName = "CustomSheetTitle";

export { CustomSheet, CustomSheetContent, CustomSheetHeader, CustomSheetTitle };
