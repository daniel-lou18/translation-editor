import {
  ArrowRightFromLine,
  Bot,
  CaseLower,
  CaseUpper,
  CornerRightDown,
  Download,
  Eraser,
  Eye,
  FileCheck,
  FileSearch,
  FileX,
  Lock,
  SquareCheckBig,
  WandSparkles,
} from "lucide-react";
import { Button } from "../../ui/button";
import { useEditor } from "@/contexts/editorContext";
import { useReformulate } from "@/hooks/useReformulate";
import { useQueryClient } from "@tanstack/react-query";
import { TranslationMemoryMatches } from "@/types";
import { useExportTranslation } from "@/hooks/useExportTranslation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { usePreview } from "@/hooks/usePreview";
import { useImprove } from "@/hooks/useImprove";
import { useCurrentProject } from "@/hooks/useCurrentProject";
import EditorbarContainer from "@/components/ui/Editor/EditorbarContainer";
import Tmbar from "@/components/ui/Editor/Tmbar";
import IconsContainer from "@/components/ui/Editor/IconsContainer";
import DropdownButton from "../../ui/Editor/DropdownButton";
import Container from "@/components/ui/Container";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HtmlViewer from "../../ui/DocViewer/HtmlViewer";
import FileError from "@/components/ui/Error/FileError";
import NoFileContent from "@/components/ui/Error/NoFileContent";
import { getFileType } from "@/types/Files";
import DocxViewer from "@/components/ui/DocViewer/DocxViewer";
import DocViewerSkeleton from "@/components/ui/DocViewer/DocViewerSkeleton";

export default function EditorControls() {
  const {
    activeSegmentId,
    getActiveSegment,
    handleStatusChange,
    handleStatusChangeAll,
    handleResetAllSegments,
    handleValueChange,
    toNextSegment,
  } = useEditor();
  const segment = getActiveSegment();
  const { currentDocument, currentTranslation } = useCurrentProject();
  const queryClient = useQueryClient();
  const matches = queryClient.getQueryData<TranslationMemoryMatches>([
    "allMatches",
  ]);
  const currentMatches = matches?.[activeSegmentId]?.matches;
  const targetTexts = currentMatches
    ? currentMatches.map((match) => match.targetText)
    : [];

  const { mutate } = useReformulate();
  const { mutate: mutateImprove } = useImprove();

  const { handleDownload } = useExportTranslation();
  const {
    html,
    isLoading: isLoadingPreview,
    isError: isErrorPreview,
    error: errorPreview,
  } = usePreview();

  function handleReformulate() {
    if (!segment.targetText) return;
    mutate({
      translatedText: segment.targetText,
      examples: targetTexts,
      targetLang: segment.targetLang,
    });
  }

  function handleImprove() {
    if (!segment.targetText || !currentDocument?.domain) return;
    mutateImprove({
      segment: {
        sourceText: segment.sourceText,
        targetText: segment.targetText,
      },
      metadata: {
        sourceLang: segment.sourceLang,
        targetLang: segment.targetLang,
        domain: currentDocument.domain,
      },
    });
  }

  function renderPreview() {
    const contentType = getFileType(currentDocument?.fileName);
    if (isLoadingPreview) {
      return <DocViewerSkeleton />;
    }
    if (isErrorPreview) {
      return <FileError title="Error Loading Preview" error={errorPreview} />;
    }
    if (!html) {
      return <NoFileContent />;
    }

    if (contentType === "word") {
      return (
        <DocxViewer
          data={{
            html: {
              original: currentDocument?.html ?? "No content available",
              translation: html,
            },
            fileName: currentDocument?.fileName ?? "No content available",
          }}
        />
      );
    }

    return (
      <HtmlViewer
        html={{
          original: currentDocument?.html ?? "",
          translation: html,
        }}
      />
    );
  }

  const downloadData = [
    {
      label: "Plain text (.txt)",
      onClick: () => handleDownload(currentTranslation, "text/plain"),
    },
    {
      label: "HTML (.html)",
      onClick: () => handleDownload(currentTranslation, "text/html"),
    },
    {
      label: "PDF (.pdf)",
      onClick: () => handleDownload(currentTranslation, "application/pdf"),
    },
    {
      label: "Word (.docx)",
      onClick: () =>
        handleDownload(
          currentTranslation,
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ),
    },
  ];

  return (
    <TooltipProvider>
      <EditorbarContainer>
        <Container className="flex">
          <IconsContainer>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => handleStatusChange(activeSegmentId)}
                >
                  <SquareCheckBig />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle current segment status</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleStatusChangeAll}
                >
                  <FileCheck />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle status for all segments</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => undefined}
                >
                  <Lock />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Lock segment (soon)</p>
              </TooltipContent>
            </Tooltip>
          </IconsContainer>

          <IconsContainer>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() =>
                    toNextSegment({
                      direction: "forward",
                      skipConfirmed: true,
                    })
                  }
                >
                  <CornerRightDown />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to the next unconfirmed segment</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() =>
                    handleValueChange(activeSegmentId, segment.sourceText)
                  }
                >
                  <ArrowRightFromLine />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy source text to target</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => handleValueChange(activeSegmentId, null)}
                >
                  <Eraser />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear current segment</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleResetAllSegments}
                >
                  <FileX />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clear all segments</p>
              </TooltipContent>
            </Tooltip>
          </IconsContainer>

          <IconsContainer>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() =>
                    handleValueChange(
                      activeSegmentId,
                      segment.targetText?.toUpperCase() ?? null
                    )
                  }
                >
                  <CaseUpper />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Convert to uppercase</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() =>
                    handleValueChange(
                      activeSegmentId,
                      segment.targetText?.toLowerCase() ?? null
                    )
                  }
                >
                  <CaseLower />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Convert to lowercase</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleReformulate}
                >
                  <WandSparkles />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Reformulate translation</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={handleImprove}
                >
                  <Bot />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Improve translation with AI</p>
              </TooltipContent>
            </Tooltip>
          </IconsContainer>

          <IconsContainer>
            <Dialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8">
                      <Eye />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview document</p>
                </TooltipContent>
              </Tooltip>
              <DialogContent className="max-w-[90vw]">
                {renderPreview()}
              </DialogContent>
            </Dialog>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="h-8 w-8">
                  <FileSearch />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search in document (soon)</p>
              </TooltipContent>
            </Tooltip>
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
      <Tmbar />
    </TooltipProvider>
  );
}
