import { cn } from "@/lib/utils";

export default function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl",
        hover &&
          "transition-all duration-300 hover:border-circuit-400/40 hover:bg-white/[0.05] hover:shadow-glow",
        className
      )}
    >
      {children}
    </div>
  );
}
