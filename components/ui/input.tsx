import * as React from "react";
import { clsx } from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={clsx(
        "block w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm outline-none placeholder:text-slate-400 focus:border-brand focus:ring-2 focus:ring-brand",
        className
      )}
      {...props}
    />
  );
});
