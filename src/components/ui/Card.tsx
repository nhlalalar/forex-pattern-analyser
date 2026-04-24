import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "green" | "red" | "none";
}

export function Card({ children, className, hover, glow = "none", ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-xl border border-[#1e2535] bg-[#131720] p-5",
        hover && "card-hover cursor-pointer",
        glow === "blue" && "glow-blue",
        glow === "green" && "glow-green",
        glow === "red" && "glow-red",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={cn("text-sm font-semibold text-slate-300 uppercase tracking-wider", className)}>
      {children}
    </h3>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}
