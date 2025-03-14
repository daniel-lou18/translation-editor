import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormattedTranslation } from "@/types/Translation";
import TranslationsTableBody from "./TranslationsTableBody";

type TranslationsTableProps = {
  translations: FormattedTranslation[];
};

export default function TranslationsTable({
  translations,
}: TranslationsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-0">Language</TableHead>
          <TableHead>Document</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last update</TableHead>
          <TableHead className="w-[100px] pr-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TranslationsTableBody translations={translations} />
      </TableBody>
    </Table>
  );
}
