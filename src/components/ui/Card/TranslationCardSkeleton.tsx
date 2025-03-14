import CardComponent from "@/components/ui/Card/CardComponent";
import { Languages } from "lucide-react";
import Container from "../Container";
import { Skeleton } from "../skeleton";

export default function TranslationCardSkeleton() {
  // Create arrays to represent the number of skeleton items to display
  const translationDetailItems = Array(8).fill(null); // Matches the number of translation details
  const contentMetricItems = Array(8).fill(null); // Matches the number of content metrics
  const complexityMetricItems = Array(4).fill(null); // Matches the number of complexity metrics

  // Array of width classes for varying skeleton widths
  const valueWidths = [
    "w-20",
    "w-36",
    "w-16",
    "w-28",
    "w-24",
    "w-32",
    "w-40",
    "w-18",
  ];

  return (
    <CardComponent>
      <CardComponent.Header
        title="Translation Metrics"
        description="Loading translation metrics..."
      >
        <Languages className="h-5 w-5 text-muted-foreground" />
      </CardComponent.Header>
      <CardComponent.Content className="p-0 gap-0">
        {/* Translation Overview Section */}
        <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 px-6 pt-4 font-semibold">
          Translation Overview
        </Container>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
          {translationDetailItems.map((_, index) => (
            <Container key={index} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton
                className={`h-4 ${valueWidths[index % valueWidths.length]}`}
              />
            </Container>
          ))}
        </Container>

        {/* Content Metrics Section */}
        <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 border-t border-sidebar-border px-6 pt-4 font-semibold">
          Content Metrics
        </Container>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
          {contentMetricItems.map((_, index) => (
            <Container key={index} className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton
                className={`h-4 ${valueWidths[index % valueWidths.length]}`}
              />
            </Container>
          ))}
        </Container>

        {/* Complexity & Activity Metrics Section */}
        <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 border-t border-sidebar-border px-6 pt-4 font-semibold">
          Complexity & Activity Metrics
        </Container>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
          {complexityMetricItems.map((_, index) => (
            <Container key={index} className="flex flex-col space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton
                className={`h-4 ${valueWidths[index % valueWidths.length]}`}
              />
            </Container>
          ))}
        </Container>
      </CardComponent.Content>
      <CardComponent.Footer text="Loading translation statistics..." />
    </CardComponent>
  );
}
