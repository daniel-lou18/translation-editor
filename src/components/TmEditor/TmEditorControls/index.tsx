import {
  CircleXIcon,
  ClipboardPaste,
  Download,
  FileCheck,
  FileSearch,
  Lock,
  SquareCheckBig,
} from "lucide-react";
import { Button } from "../../ui/button";
import Container from "@/components/ui/Container";
import { useExportTranslation } from "@/hooks/useExportTranslation";
import EditorbarContainer from "@/components/ui/Editor/EditorbarContainer";
import TmbarContainer from "@/components/ui/Editor/Tmbar";
import IconsContainer from "@/components/ui/Editor/IconsContainer";
import DropdownButton from "@/components/ui/Editor/DropdownButton";

export default function TmEditorControls() {
  // const {
  //   activeSegmentId,
  //   handleStatusChange,
  //   handleStatusChangeAll,
  // } = useEditor();

  const { downloadFile } = useExportTranslation();
  // const { currentView, changeView } = useResources();

  const downloadData = [
    {
      label: "Microsoft Excel (.xlsx)",
      onClick: () =>
        downloadFile({
          input: "application/vnd.ms-excel",
          output:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        }),
    },
    {
      label: "Comma-separated values (.csv)",
      onClick: () => downloadFile({ input: "text/csv", output: "text/csv" }),
    },
    {
      label: "Tab-separated values (.tsv)",
      onClick: () =>
        downloadFile({
          input: "text/tab-separated-values",
          output: "text/tab-separated-values",
        }),
    },
  ];

  return (
    <>
      <EditorbarContainer>
        <Container className="flex">
          <IconsContainer>
            <Button
              variant="ghost"
              className="h-8 w-8"
              // onClick={() => handleStatusChange(activeSegmentId)}
            >
              <SquareCheckBig />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8"
              // onClick={handleStatusChangeAll}
            >
              <FileCheck />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8"
              onClick={() => undefined}
            >
              <Lock />
            </Button>
          </IconsContainer>
          <IconsContainer>
            <Button
              variant="ghost"
              className="h-8 w-8"
              onClick={() => undefined}
            >
              <ClipboardPaste />
            </Button>
            <Button
              variant="ghost"
              className="h-8 w-8"
              onClick={() => undefined}
            >
              <CircleXIcon />
            </Button>
          </IconsContainer>

          <IconsContainer>
            {/* <Button
              variant="ghost"
              className="h-8 w-8"
              onClick={() => downloadFile("txt")}
            >
              <Download />
            </Button> */}
            <Button variant="ghost" className="h-8 w-8">
              <FileSearch />
            </Button>
          </IconsContainer>
        </Container>
        <DropdownButton
          buttonData={{
            label: "Download",
            icon: <Download className="w-4 h-4" />,
          }}
          menuData={downloadData}
        />
      </EditorbarContainer>
      <TmbarContainer />
    </>
  );
}
