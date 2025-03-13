import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TmsTableBody from "./TmsTableBody";
import { useTms } from "@/hooks/useTms";

const tmsTableHeader = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Description",
    key: "description",
  },
  {
    label: "Source lang",
    key: "sourceLang",
  },
  {
    label: "Target lang",
    key: "targetLang",
  },
  {
    label: "Domain",
    key: "domain",
  },
  {
    label: "Created",
    key: "created",
  },
  {
    label: "Actions",
    key: "actions",
    className: "w-[100px] pr-0",
  },
];

export default function TmsTable() {
  const { tms } = useTms();

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {tmsTableHeader.map((header) => (
            <TableHead key={header.key} className={header.className ?? ""}>
              {header.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TmsTableBody tms={tms} />
      </TableBody>
    </Table>
  );
}
