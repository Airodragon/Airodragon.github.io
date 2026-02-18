import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = ComponentPropsWithoutRef<"div">;

export function Container({ className, ...props }: ContainerProps) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)} {...props} />;
}
