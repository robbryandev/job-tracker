import * as React from "react";

import { cn } from "@/lib/utils";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <>
        <p className="pl-2">{props.label}</p>
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  }
);
TextInput.displayName = "TextInput";

export { TextInput };