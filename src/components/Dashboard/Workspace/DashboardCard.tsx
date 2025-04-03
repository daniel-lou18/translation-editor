import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type DashboardCardProps = {
  title: ReactNode;
  description: ReactNode;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  cardClassName?: string;
  iconClassName?: string;
};

export default function DashboardCard({
  title,
  description,
  icon: Icon,
  iconClassName,
  cardClassName,
}: DashboardCardProps) {
  return (
    <Card
      className={cn("flex flex-col overflow-hidden w-48 h-48", cardClassName)}
    >
      <CardHeader className="bg-muted px-6 py-0 h-[25%] border-b border-input">
        <Icon
          className={cn(
            "h-6 w-6 text-muted-foreground relative top-8",
            iconClassName
          )}
        />
      </CardHeader>
      <CardContent className="flex-1 pt-6 text-sm font-medium">
        {title}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground h-[20%]">
        {description}
      </CardFooter>
    </Card>
  );
}
