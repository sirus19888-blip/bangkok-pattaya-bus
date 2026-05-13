import { ADS_ENABLED } from "@/lib/ads";

export function ConsentManagementPlaceholder() {
  if (!ADS_ENABLED) {
    return (
      <div
        hidden
        data-cmp-placeholder="google-certified-cmp-required-before-ads"
        data-ads-enabled="false"
        data-regions="EEA,UK,Switzerland"
        data-tcf-required="true"
      />
    );
  }

  return (
    <div
      hidden
      data-cmp-placeholder="replace-with-google-certified-iab-tcf-cmp"
      data-ads-enabled="true"
      data-regions="EEA,UK,Switzerland"
      data-tcf-required="true"
    />
  );
}
