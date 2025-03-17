import TranslationCard from "@/components/ui/Card/TranslationCard";
import TranslationCardSkeleton from "@/components/ui/Card/TranslationCardSkeleton";
import DataHandler from "@/components/ui/DataHandler";
import { useGetTranslationSegments } from "@/hooks/useGetTranslationSegments";
import { FileText } from "lucide-react";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";

export default function TranslationDetails() {
  const { document, translation, segments, isLoading, isError, error } =
    useGetTranslationSegments();

  return (
    <Container className="space-y-8">
      <PageTitle title="Translation details" />
      <DataHandler
        data={{
          translation,
          document,
          segments,
        }}
        loading={{
          isLoading,
          component: <TranslationCardSkeleton />,
        }}
        error={{
          isError,
          error,
        }}
        empty={{
          isEmpty:
            !translation &&
            !document &&
            segments.length === 0 &&
            !isLoading &&
            !isError,
          component: <EmptyTranslationState />,
        }}
      >
        {(data) => (
          <TranslationCard
            translation={data.translation}
            document={data.document}
            segments={data.segments}
          />
        )}
      </DataHandler>
    </Container>
  );
}

function EmptyTranslationState() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">No Translation Found</h3>
      <p className="text-muted-foreground mt-2">
        The translation you're looking for doesn't exist or has been removed.
      </p>
    </div>
  );
}
