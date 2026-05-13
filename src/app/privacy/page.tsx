import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy | Bangkok Pattaya Bus Guide",
  description:
    "Privacy policy for Bangkok Pattaya Bus Guide, including cookies, analytics, affiliate links, advertising, maps, embedded content, and contact information.",
  alternates: {
    canonical: absoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return (
    <TrustPage
      eyebrow="Privacy"
      title="Privacy policy"
      intro="This page explains how Bangkok Pattaya Bus Guide handles privacy, cookies, analytics, affiliate links, future advertising, maps, embedded content, and contact requests."
      sections={[
        {
          title: "Who runs this guide",
          body: "Bangkok Pattaya Bus Guide is an independent travel guide. It is not an official bus operator website. The guide is maintained to help travelers understand bus routes, stations, prices, schedule sources, and practical travel notes.",
        },
        {
          title: "Cookies and similar technologies",
          body: "The site may use cookies, local storage, or similar technologies for basic site functionality, analytics, affiliate tracking, embedded maps, and future advertising. Some third-party services may set their own cookies when you interact with their content or links.",
        },
        {
          title: "Analytics",
          body: "This site may use privacy-conscious analytics to understand which pages are useful, find technical issues, and improve the guide. Analytics data may include page views, device or browser information, referrer information, approximate location, and interaction events. The site does not use analytics to change timetable information.",
        },
        {
          title: "Affiliate links",
          body: "Some links to booking platforms or support services may be affiliate links. If you click an affiliate link and later buy a ticket or service, the site may earn a commission. This does not affect the timetable information, prices shown from operator sources, or editorial recommendations.",
        },
        {
          title: "Advertising",
          body: "Advertising is not currently enabled. The site is being prepared for possible future advertising, including disabled ad placements after schedule information, after station information, and after FAQ sections. Ads will not be placed above the main H1, above the main route CTA, or between individual departure times.",
        },
        {
          title: "Google products",
          body: "The site may use Google products in the future, such as Google AdSense or other advertising tools. If Google advertising is enabled for users in the EEA, the UK, or Switzerland, the site will need a Google-certified consent management platform that integrates with the IAB Transparency and Consent Framework before serving personalized ads.",
        },
        {
          title: "Third-party providers",
          body: "The site may link to or use services from third-party providers such as 12Go, Buy Me a Coffee, Google Maps, OpenStreetMap, Wikimedia Commons, analytics providers, hosting providers, and future advertising partners. These providers may process data under their own privacy policies.",
        },
        {
          title: "Maps and embedded content",
          body: "Station pages may include embedded OpenStreetMap maps and links to Google Maps. Embedded maps and external links may allow those services to receive technical information such as IP address, browser information, or the page you came from. Google Maps is used as an external link, not as a Google Maps API integration.",
        },
        {
          title: "Consent and withdrawal",
          body: "If a cookie or consent banner is enabled in the future, you will be able to accept, reject, or manage optional cookies where required. You may also withdraw consent by clearing cookies in your browser or using the consent controls that will be provided before advertising is enabled.",
        },
        {
          title: "Data retention basics",
          body: "Email messages and correction reports may be kept as long as needed to reply, verify reported changes, maintain schedule history, or protect the site from abuse. Analytics and third-party data retention periods depend on the provider settings and policies.",
        },
        {
          title: "Contact",
          body: "For privacy questions, correction requests, outdated schedule reports, or operator updates, contact bangkokpattayabus@gmail.com. Please do not use this email for urgent travel support; confirm urgent travel details directly with the bus station or operator.",
        },
      ]}
    />
  );
}
