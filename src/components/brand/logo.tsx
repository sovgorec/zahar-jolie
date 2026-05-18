import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "text-xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-4xl sm:text-5xl",
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <div className={cn("flex flex-col items-start gap-0.5", className)}>
      <span
        className={cn(
          "font-semibold tracking-[0.28em] uppercase text-foreground",
          sizeMap[size],
        )}
      >
        Jolie
      </span>
      <span className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.42em] uppercase text-muted-foreground">
        Biotech Beauty
      </span>
    </div>
  );
}
