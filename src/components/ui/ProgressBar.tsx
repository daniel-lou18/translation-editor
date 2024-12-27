type ProgressBarProps = {
  processedSegments: number;
  totalSegments: number;
  percentage: number;
};

export default function ProgressBar({
  processedSegments,
  totalSegments,
  percentage,
}: ProgressBarProps) {
  return (
    <p
      className={`${
        percentage === 100 ? "opacity-0" : ""
      } transition duration-1000`}
    >{`Processing ${processedSegments} of ${totalSegments} segments (${percentage} %)`}</p>
  );
}
