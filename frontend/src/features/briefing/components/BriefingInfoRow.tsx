interface BriefingInfoRowProps {
  label: string;
  value: string;
}

/** One label/value line in the briefing's case-file summary card. */
export function BriefingInfoRow({ label, value }: BriefingInfoRowProps) {
  return (
    <div className="flex flex-col gap-0.5 py-2.5 first:pt-0 last:pb-0">
      <span className="file-label">{label}</span>
      <span className="text-sm text-text">{value}</span>
    </div>
  );
}
