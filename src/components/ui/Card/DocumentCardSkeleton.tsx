import CardComponent from "@/components/ui/Card/CardComponent";
import { FileText } from "lucide-react";
import Container from "../Container";
import { Skeleton } from "../skeleton";

export default function DocumentCardSkeleton() {
  // Create arrays to represent the number of skeleton items to display
  const documentDetailItems = Array(11).fill(null); // Matches the number of document details
  const translationDetailItems = Array(4).fill(null); // Matches the number of translation details

  // Array of width classes for varying skeleton widths
  const valueWidths = ["w-20", "w-36", "w-16", "w-28"];

  return (
    <CardComponent>
      <CardComponent.Header
        title="Document Details"
        description="Information about this document and its content"
      >
        <FileText className="h-5 w-5 text-muted-foreground" />
      </CardComponent.Header>
      <CardComponent.Content className="p-0 gap-0">
        <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 px-6 pt-4 font-semibold">
          Document Metrics
        </Container>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
          {documentDetailItems.map((_, index) => (
            <Container key={index} className="flex flex-col space-y-2">
              {/* Label skeleton */}
              <Skeleton className="h-4 w-24" />
              {/* Value skeleton */}
              <Skeleton className="h-4 w-32" />
            </Container>
          ))}
        </Container>

        {/* Translation metrics section */}
        <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 border-t border-sidebar-border px-6 pt-4 font-semibold">
          Translation Metrics
        </Container>

        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
          {translationDetailItems.map((_, index) => (
            <Container key={index} className="flex flex-col space-y-2">
              {/* Label skeleton */}
              <Skeleton className="h-4 w-28" />
              {/* Value skeleton - varying widths for visual interest */}
              <Skeleton
                className={`h-4 ${valueWidths[index % valueWidths.length]}`}
              />
            </Container>
          ))}
        </Container>
      </CardComponent.Content>
      <CardComponent.Footer text="This document contains source text that can be translated into multiple languages." />
    </CardComponent>
  );
}
