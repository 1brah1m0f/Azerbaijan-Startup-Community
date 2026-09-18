import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * ASC wordmark that swaps to a light-on-dark cut in night mode via CSS, so
 * the right file is visible even before the theme toggle hydrates.
 */
export function BrandLogo({
  className,
  priority = false,
  alt = "Azerbaijan Startup Community",
}: {
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <span className={cn("relative inline-flex items-center", className)}>
      <Image
        src="/logos/asc-logo-tight.png"
        alt={alt}
        width={168}
        height={82}
        priority={priority}
        className="h-full w-auto object-contain dark:hidden"
      />
      <Image
        src="/logos/asc-logo-dark.png"
        alt={alt}
        width={168}
        height={82}
        priority={priority}
        className="hidden h-full w-auto object-contain dark:block"
      />
    </span>
  );
}
