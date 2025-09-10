import * as React from "react";
import clsx from "clsx";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function Button({ className, asChild, ...props }: ButtonProps) {
  const Comp: any = asChild ? ("a" as any) : "button";
  return (
    <Comp
      className={clsx(
        "inline-flex items-center justify-center rounded-2xl border border-transparent bg-brand px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
        className
      )}
      {...props}
    />
  );
}
