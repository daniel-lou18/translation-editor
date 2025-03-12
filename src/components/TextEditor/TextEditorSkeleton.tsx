import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/ui/Container";
import EditorbarContainer from "@/components/ui/Editor/EditorbarContainer";
import TopbarContainer from "@/components/ui/Editor/TopbarContainer";
import IconsContainer from "@/components/ui/Editor/IconsContainer";
import ContentContainer from "@/components/ui/Editor/ContentContainer";
import { Separator } from "@/components/ui/separator";

// Skeleton for a single editor segment
function EditorSegmentSkeleton() {
  return (
    <Container className="min-h-0 flex items-stretch gap-4 px-4 py-2">
      <Container className="w-12 pt-2">
        <Skeleton className="w-6 h-6" />
      </Container>
      <Container className="flex-1 rounded-lg p-2">
        <Skeleton className="w-full h-16" />
      </Container>
      <Container className="flex-1 rounded-lg p-2">
        <Skeleton className="w-full h-16" />
      </Container>
      <Container className="w-8 flex items-center justify-center">
        <Skeleton className="w-6 h-6 rounded-full" />
      </Container>
    </Container>
  );
}

// Skeleton for the project controls
function ProjectControlsSkeletonFull() {
  return (
    <TopbarContainer>
      {/* Logo */}
      <Skeleton className="w-8 h-8" />
      <Separator orientation="vertical" className="h-6" />

      {/* Project selector */}
      <Skeleton className="w-48 h-8" />
      <Separator orientation="vertical" className="h-6" />

      {/* Document selector */}
      <Skeleton className="w-48 h-8" />
      <Separator orientation="vertical" className="h-6" />

      {/* Translation selector */}
      <Skeleton className="w-48 h-8" />
      <Separator orientation="vertical" className="h-6" />

      {/* Progress indicator */}
      <Skeleton className="w-32 h-8" />
    </TopbarContainer>
  );
}

// Skeleton for the editor controls
function EditorControlsSkeleton() {
  return (
    <EditorbarContainer>
      <Container className="flex">
        <IconsContainer>
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
        </IconsContainer>

        <IconsContainer>
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
        </IconsContainer>

        <IconsContainer>
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
        </IconsContainer>

        <IconsContainer>
          <Skeleton className="w-8 h-8" />
          <Skeleton className="w-8 h-8" />
        </IconsContainer>
      </Container>

      {/* Download button */}
      <Skeleton className="w-32 h-9" />
    </EditorbarContainer>
  );
}

// Skeleton for the side menu
function SideMenuSkeleton() {
  return (
    <Container className="col-span-3 sticky top-0 min-h-screen h-fit space-y-4 bg-background">
      <Container className="mt-4 px-4 space-y-4">
        {/* Reformulation matches */}
        <div className="space-y-2">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-24" />
        </div>

        {/* Memory matches */}
        <div className="space-y-2">
          <Skeleton className="w-full h-8" />
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="w-full h-16 mb-2" />
            ))}
        </div>
      </Container>
    </Container>
  );
}

// Main TextEditor skeleton
export default function TextEditorSkeleton() {
  return (
    <Container className="grid grid-cols-12 border-b border-border">
      <ProjectControlsSkeletonFull />
      <EditorControlsSkeleton />

      <ContentContainer>
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <EditorSegmentSkeleton key={i} />
          ))}
      </ContentContainer>

      <SideMenuSkeleton />
    </Container>
  );
}
