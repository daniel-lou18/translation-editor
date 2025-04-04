import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { ReactNode } from "react";

type TranslationCardProps = {
  data: {
    header: ReactNode;
    content: ReactNode;
    footerLeft: ReactNode;
    status: {
      label: string;
      color: string;
    };
  };
};

export default function TranslationCard({ data }: TranslationCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden w-auto h-40">
      <CardHeader className="justify-center text-sm font-medium bg-muted px-4 py-2 h-[25%] border-b border-input py-2 border-b">
        {data.header}
      </CardHeader>
      <CardContent
        className={cn(
          "text-sm text-muted-foreground font-medium px-4",
          "flex-1 pt-4"
        )}
      >
        {data.content}
      </CardContent>
      <CardFooter className="px-4 py-2 text-xs text-muted-foreground h-[30%]">
        <Container className="flex justify-between w-full">
          <span className="inline-flex items-center px-2 py-1">
            {data.footerLeft}
          </span>
          <Container className="px-2 py-1">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-2 ${data.status.color}`}
            />
            <span>{data.status.label}</span>
          </Container>
        </Container>
      </CardFooter>
    </Card>
  );
}
