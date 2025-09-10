import { clsx } from "clsx";

export function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={clsx("rounded-2xl border bg-white p-6 shadow-sm", className)} {...props} />;
}
