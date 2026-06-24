import { cn } from "@/lib/utils";

export default function GradientBlob({
  className,
  variant = "blue",
}: {
  className?: string;
  variant?: "blue" | "violet" | "cyan";
}) {
  const colors = {
    blue: "from-circuit-500/40 via-circuit-400/10 to-transparent",
    violet: "from-violet-accent/40 via-violet-accent/10 to-transparent",
    cyan: "from-cyan-accent/35 via-cyan-accent/10 to-transparent",
  };

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl",
        colors[variant],
        className
      )}
    />
  );
}
