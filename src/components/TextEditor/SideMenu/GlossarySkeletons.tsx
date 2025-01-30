import Container from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function GlossarySkeletons() {
  return (
    <Container className="space-y-1">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-12" />
    </Container>
  );
}
