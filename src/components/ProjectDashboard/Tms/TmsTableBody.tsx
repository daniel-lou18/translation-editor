import { Tm } from "@/types/Tm";
import TmsTableRow from "./TmsTableRow";
import { useDeleteTm } from "@/hooks/useDeleteTm";
import { useUpdateTm } from "@/hooks/useUpdateTm";
import { useEditTable } from "@/hooks/useEditTable";

type TmsTableBodyProps = {
  tms: Tm[];
};

export default function TmsTableBody({ tms }: TmsTableBodyProps) {
  const { deleteTm, isDeleting } = useDeleteTm();
  const { updateTm, isSaving } = useUpdateTm();
  const { setEditingId, setEditFormData, ...restProps } =
    useEditTable<Tm>(updateTm);

  const tmsRowMenuData = {
    name: "tm",
    items: [
      {
        value: "View details",
        onClick: () => {},
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
        onClick: () => {},
      },
      {
        value: "Delete",
        onClick: (tm: Tm) => {
          deleteTm(tm.id);
        },
      },
    ],
  };

  return tms.map((tm) => (
    <TmsTableRow
      key={tm.id}
      data={tm}
      isSaving={isSaving || isDeleting}
      rowMenuData={tmsRowMenuData}
      {...restProps}
    />
  ));
}
