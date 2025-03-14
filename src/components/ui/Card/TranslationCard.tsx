import CardComponent from "@/components/ui/Card/CardComponent";
import { Translation, TargetSegment } from "@/types/Translation";
import {
  Languages,
  Clock,
  CheckCircle,
  XCircle,
  BarChart,
  Activity,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { formatDate, formatNumber } from "@/utils/formatters";
import Container from "../Container";
import { Segment } from "@/types/Segment";
import { DocumentWithSourceSegments } from "@/types";

type TranslationCardProps = {
  translation: Translation | null;
  document: DocumentWithSourceSegments | null;
  segments: Segment[];
};

export default function TranslationCard({
  translation,
  document,
  segments,
}: TranslationCardProps) {
  if (!translation || !document || !segments.length) {
    return null;
  }

  const { targetSegments, targetLang, createdAt, updatedAt, status } =
    translation;

  // Calculate basic metrics
  const totalSegments = segments.length;
  const translatedSegments = targetSegments.filter(
    (segment: TargetSegment) =>
      segment.status === "translated" && segment.targetText
  ).length;
  const untranslatedSegments = totalSegments - translatedSegments;
  const translationProgress =
    totalSegments > 0 ? (translatedSegments / totalSegments) * 100 : 0;

  // Calculate word and character counts
  const sourceWordCount = segments.reduce(
    (count: number, segment: Segment) =>
      count + (segment.sourceText.split(/\s+/).length || 0),
    0
  );
  const targetWordCount = targetSegments.reduce(
    (count: number, segment: TargetSegment) =>
      count + (segment.targetText?.split(/\s+/).length || 0),
    0
  );
  const sourceCharCount = segments.reduce(
    (count: number, segment: Segment) => count + segment.sourceText.length,
    0
  );
  const targetCharCount = targetSegments.reduce(
    (count: number, segment: TargetSegment) =>
      count + (segment.targetText?.length || 0),
    0
  );

  // Calculate expansion/contraction ratio
  const expansionRatio =
    sourceCharCount > 0 ? targetCharCount / sourceCharCount : 0;
  const wordExpansionRatio =
    sourceWordCount > 0 ? targetWordCount / sourceWordCount : 0;

  // Calculate time metrics
  const translationAge = Math.floor(
    (new Date().getTime() - new Date(createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const lastUpdatedDays = Math.floor(
    (new Date().getTime() - new Date(updatedAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Calculate average segment length
  const avgSourceSegmentLength =
    totalSegments > 0 ? sourceCharCount / totalSegments : 0;
  const avgTargetSegmentLength =
    totalSegments > 0 ? targetCharCount / totalSegments : 0;

  // Calculate complexity metrics
  const longSegments = segments.filter(
    (segment: Segment) => segment.sourceText.length > 100
  ).length;
  const longSegmentsPercentage =
    totalSegments > 0 ? (longSegments / totalSegments) * 100 : 0;

  // Calculate activity metrics
  const recentlyUpdatedSegments = targetSegments.filter(
    (segment: TargetSegment) => {
      const updatedDate = new Date(segment.updatedAt);
      const now = new Date();
      const daysDiff = Math.floor(
        (now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysDiff < 7; // Updated in the last week
    }
  ).length;
  const recentActivityPercentage =
    totalSegments > 0 ? (recentlyUpdatedSegments / totalSegments) * 100 : 0;

  // Calculate edit distance metrics (simplified version)
  const emptyTargetSegments = targetSegments.filter(
    (segment: TargetSegment) =>
      !segment.targetText || segment.targetText.trim() === ""
  ).length;
  const emptyPercentage =
    totalSegments > 0 ? (emptyTargetSegments / totalSegments) * 100 : 0;

  type DetailItem = {
    label: string;
    value: string;
    icon?: React.ReactNode;
  } | null;

  const translationDetails: DetailItem[] = [
    {
      label: "Target Language",
      value: targetLang,
      icon: <Languages className="h-4 w-4 text-muted-foreground" />,
    },
    {
      label: "Translation Status",
      value: status || "In Progress",
      icon:
        status === "completed" ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <Activity className="h-4 w-4 text-amber-500" />
        ),
    },
    {
      label: "Progress",
      value: `${Math.round(translationProgress)}%`,
      icon: <BarChart className="h-4 w-4 text-blue-500" />,
    },
    {
      label: "Translated Segments",
      value: `${formatNumber(translatedSegments)} of ${formatNumber(
        totalSegments
      )}`,
      icon: <CheckCircle className="h-4 w-4 text-green-500" />,
    },
    {
      label: "Untranslated Segments",
      value: formatNumber(untranslatedSegments),
      icon: <XCircle className="h-4 w-4 text-red-500" />,
    },
    {
      label: "Created",
      value: formatDate(createdAt),
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    },
    {
      label: "Last Updated",
      value: formatDate(updatedAt),
      icon: <RefreshCw className="h-4 w-4 text-muted-foreground" />,
    },
    {
      label: "Translation Age",
      value: `${translationAge} days`,
      icon: <Clock className="h-4 w-4 text-muted-foreground" />,
    },
  ].filter(Boolean);

  const contentMetrics: DetailItem[] = [
    {
      label: "Source Word Count",
      value: formatNumber(sourceWordCount),
    },
    {
      label: "Target Word Count",
      value: formatNumber(targetWordCount),
    },
    {
      label: "Source Character Count",
      value: formatNumber(sourceCharCount),
    },
    {
      label: "Target Character Count",
      value: formatNumber(targetCharCount),
    },
    {
      label: "Text Expansion Ratio",
      value: `${(expansionRatio * 100).toFixed(1)}%`,
    },
    {
      label: "Word Expansion Ratio",
      value: `${(wordExpansionRatio * 100).toFixed(1)}%`,
    },
    {
      label: "Avg. Source Segment Length",
      value: `${Math.round(avgSourceSegmentLength)} chars`,
    },
    {
      label: "Avg. Target Segment Length",
      value: `${Math.round(avgTargetSegmentLength)} chars`,
    },
  ];

  const complexityMetrics: DetailItem[] = [
    {
      label: "Long Segments",
      value: `${formatNumber(longSegments)} (${longSegmentsPercentage.toFixed(
        1
      )}%)`,
    },
    {
      label: "Empty Target Segments",
      value: `${formatNumber(emptyTargetSegments)} (${emptyPercentage.toFixed(
        1
      )}%)`,
    },
    {
      label: "Recent Activity",
      value: `${formatNumber(
        recentlyUpdatedSegments
      )} segments (${recentActivityPercentage.toFixed(1)}%)`,
    },
    {
      label: "Days Since Last Update",
      value: `${lastUpdatedDays} days`,
    },
  ];

  return (
    <CardComponent>
      <CardComponent.Header
        title={document.fileName.split(".").slice(0, -1).join(".")}
        description="Information and key metrics about this translation and its progress"
      />
      <CardComponent.Content className="p-0 gap-0">
        {/* Translation Overview Section */}
        <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 px-6 pt-4 font-semibold">
          Translation Overview
        </Container>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
          {translationDetails.map(
            (detail) =>
              detail && (
                <Container
                  key={detail.label}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    {detail.icon}
                    <span className="text-sm font-medium text-muted-foreground">
                      {detail.label}
                    </span>
                  </div>
                  <span className="text-sm">{detail.value}</span>
                </Container>
              )
          )}
        </Container>

        {/* Content Metrics Section */}
        <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 border-t border-sidebar-border px-6 pt-4 font-semibold">
          Content Metrics
        </Container>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
          {contentMetrics.map(
            (detail) =>
              detail && (
                <Container
                  key={detail.label}
                  className="flex flex-col space-y-1"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="text-sm">{detail.value}</span>
                </Container>
              )
          )}
        </Container>

        {/* Complexity & Activity Metrics Section */}
        <Container className="flex flex-col space-y-1 col-span-1 lg:col-span-2 border-t border-sidebar-border px-6 pt-4 font-semibold">
          Complexity & Activity Metrics
        </Container>
        <Container className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-6 py-4">
          {complexityMetrics.map(
            (detail) =>
              detail && (
                <Container
                  key={detail.label}
                  className="flex flex-col space-y-1"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {detail.label}
                  </span>
                  <span className="text-sm">{detail.value}</span>
                </Container>
              )
          )}
        </Container>
      </CardComponent.Content>
      <CardComponent.Footer
        text={`This translation is ${Math.round(
          translationProgress
        )}% complete with ${formatNumber(translatedSegments)} of ${formatNumber(
          totalSegments
        )} segments translated.`}
      />
    </CardComponent>
  );
}
