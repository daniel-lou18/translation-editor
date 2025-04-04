import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Link } from "react-router";

type DashboardCardProps = {
  children: ReactNode;
  href: string;
  title: ReactNode;
  description: ReactNode;
  className?: string;
};

export default function DashboardCard({
  children,
  href,
  title,
  description,
  className,
}: DashboardCardProps) {
  return (
    <Link to={href}>
      <Card
        className={cn(
          "group relative flex flex-col overflow-hidden w-44 h-44 shadow-md hover:-translate-y-1 hover:translate-x-0.5 hover:shadow-xl hover:border-muted-foreground/50 transition-all duration-300 ease-in-out",
          className
        )}
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
    </Link>
  );
}
