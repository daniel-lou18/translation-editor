type ProgressProps = {
  processedSegments: number;
  totalSegments: number;
  percentage: number;
};

export default function Progress({
  processedSegments,
  totalSegments,
  percentage,
}: ProgressProps) {
  return (
    <p
      className={`${
        percentage === 100 ? "opacity-0" : ""
      } transition duration-1000`}
    >{`Processing ${processedSegments} of ${totalSegments} segments (${percentage} %)`}</p>
  );
}
