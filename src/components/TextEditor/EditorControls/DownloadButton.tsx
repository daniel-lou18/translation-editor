import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";

type DownloadButtonProps = {
  data: { label: string; onClick: () => void }[];
};

export default function DownloadButton({ data }: DownloadButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 h-9 border-border">
          <Download className="w-4 h-4" />
          Download
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data.map((item) => (
          <DropdownMenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
