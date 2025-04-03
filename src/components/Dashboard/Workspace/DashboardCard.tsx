import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type DashboardCardProps = {
  children: ReactNode;
  title: ReactNode;
  description: ReactNode;
  cardClassName?: string;
};

export default function DashboardCard({
  children,
  title,
  description,
  cardClassName,
}: DashboardCardProps) {
  return (
    <Card
      className={cn("flex flex-col overflow-hidden w-44 h-44", cardClassName)}
    >
      <CardHeader className="bg-muted px-6 py-0 h-[25%] border-b border-input">
        {children}
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
