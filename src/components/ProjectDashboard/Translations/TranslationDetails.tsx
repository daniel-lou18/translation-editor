import TranslationCard from "@/components/ui/Card/TranslationCard";
import TranslationCardSkeleton from "@/components/ui/Card/TranslationCardSkeleton";
import { useGetTranslationSegments } from "@/hooks/useGetTranslationSegments";
import PageTitle from "@/components/ui/PageTitle";
import Container from "@/components/ui/Container";
import NoContent from "@/components/ui/Error/NoFileContent";
import Error from "@/components/ui/Error/FileError";

export default function TranslationDetails() {
  const { document, translation, segments, isLoading, isError, error } =
    useGetTranslationSegments();

  function renderTranslationCard() {
    if (isLoading) {
      return <TranslationCardSkeleton />;
    }
    if (isError) {
      return <Error title="Error Loading Translation" error={error} />;
    }
    if (!translation) {
      return <NoContent />;
    }

    return (
      <TranslationCard
        translation={translation}
        document={document}
        segments={segments}
      />
    );
  }

  return (
    <Container className="space-y-8">
      <PageTitle title="Translation details" />
      {renderTranslationCard()}
    </Container>
  );
}
