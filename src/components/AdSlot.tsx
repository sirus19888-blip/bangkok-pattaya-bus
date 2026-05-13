import { ADS_ENABLED, type AdSlotId } from "@/lib/ads";

type AdSlotProps = {
  id: AdSlotId;
  label?: string;
};

export function AdSlot({ id, label = "Advertising" }: AdSlotProps) {
  if (!ADS_ENABLED) {
    return (
      <div
        hidden
        data-ad-slot={id}
        data-ads-enabled="false"
        data-ad-placeholder="disabled"
      />
    );
  }

  return (
    <aside
      aria-label={label}
      className="rounded-2xl border border-dashed border-[#d8c8b4] bg-white/70 p-4 text-center text-xs font-bold uppercase tracking-wide text-[#6b7280]"
      data-ad-slot={id}
      data-ads-enabled="true"
    >
      {label}
    </aside>
  );
}
