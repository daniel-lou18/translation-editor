import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TmsTableBody from "./TmsTableBody";
import { useTms } from "@/hooks/useTms";

export default function TmsTable() {
  const { tms } = useTms();

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="pl-0">Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Source lang</TableHead>
          <TableHead>Target lang</TableHead>
          <TableHead>Domain</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-[100px] pr-0">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tms.length > 0 ? (
          <TmsTableBody tms={tms} />
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No TMs found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
