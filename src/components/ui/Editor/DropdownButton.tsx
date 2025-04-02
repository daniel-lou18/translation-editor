import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ReactElement } from "react";

type DropdownButtonProps = {
  buttonData: { label: string; icon: ReactElement };
  menuData: { label: string; onClick: () => void }[];
  className?: string;
  variant?: "default" | "icon";
};

export default function DropdownButton({
  buttonData,
  menuData,
  className,
  variant = "default",
}: DropdownButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant === "default" ? "outline" : "ghost"}
          size={variant === "default" ? "sm" : "icon"}
          className={cn(
            "gap-1",
            variant === "default" ? "h-9 border-border" : "h-8 w-8",
            className
          )}
        >
          {buttonData.icon}
          {variant === "default" && buttonData.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {menuData.map((item) => (
          <DropdownMenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
