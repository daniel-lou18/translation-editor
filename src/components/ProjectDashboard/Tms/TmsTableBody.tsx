import { Tm } from "@/types/Tm";
import TmsTableRow from "./TmsTableRow";
import { useDeleteTm } from "@/hooks/useDeleteTm";
import { useUpdateTm } from "@/hooks/useUpdateTm";
import { useEditTable } from "@/hooks/useEditTable";
import { useTmRoute } from "@/hooks/useTmRoute";
import { TableCell, TableRow } from "@/components/ui/table";

type TmsTableBodyProps = {
  tms: Tm[];
};

export default function TmsTableBody({ tms }: TmsTableBodyProps) {
  const { navigateToTm } = useTmRoute();
  const { deleteTm, isDeleting } = useDeleteTm();
  const { updateTm, isSaving } = useUpdateTm();
  const { setEditingId, setEditFormData, ...restProps } =
    useEditTable<Tm>(updateTm);

  const tmsRowMenuData = {
    name: "tm",
    items: [
      {
        value: "View",
        onClick: (tm: Tm) => {
          navigateToTm(tm.id);
        },
      },
      {
        value: "Edit",
        onClick: (tm: Tm) => {
          setEditingId(tm.id);
          setEditFormData({ ...tm });
        },
      },
      {
        value: "Export",
        subItems: [
          {
            value: "Excel (.xlsx)",
            onClick: () => {},
          },
          {
            value: "Comma-separated values (.csv)",
            onClick: () => {},
          },
          {
            value: "Tab-separated values (.tsv)",
            onClick: () => {},
          },
        ],
      },
      {
        value: "Delete",
        onClick: (tm: Tm) => {
          deleteTm(tm.id);
        },
      },
    ],
  };

  if (tms.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={7} className="h-24 text-center">
          No TMs found
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {tms.map((tm) => (
        <TmsTableRow
          key={tm.id}
          data={tm}
          isSaving={isSaving || isDeleting}
          rowMenuData={tmsRowMenuData}
          {...restProps}
        />
      ))}
    </>
  );
}
