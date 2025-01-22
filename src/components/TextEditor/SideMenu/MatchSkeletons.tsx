import Container from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/skeleton";

export default function MatchSkeletons() {
  return (
    <Container className="space-y-3">
      <Skeleton className="w-full h-28" />
      <Skeleton className="w-full h-28" />
      <Skeleton className="w-full h-28" />
    </Container>
  );
}
