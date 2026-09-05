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
          body: "Bangkok Pattaya Bus Guide is an independent travel guide published by Paweł Giżyński, a private individual based in Poland, European Union, who is the data controller for the personal data described on this page. It is not an official bus operator website. The guide is maintained to help travelers understand bus routes, stations, prices, schedule sources, and practical travel notes.",
        },
        {
          title: "Cookies and similar technologies",
          body: "The site may use cookies, local storage, or similar technologies for basic site functionality, analytics, affiliate tracking, embedded maps, and future advertising. Some third-party services may set their own cookies when you interact with their content or links.",
        },
        {
          title: "Analytics",
          body: "This site uses cookie-free traffic analytics from Vercel to understand basic page usage without storing analytics cookies. Google Analytics is handled differently by region, and the region is detected from your browser time zone rather than from your IP address. In the European Economic Area, the United Kingdom and Switzerland, Google Analytics is not loaded until you choose Allow analytics in the consent banner. Outside those regions it loads on your first visit under implied consent and no banner is shown. In both cases you can change or withdraw your choice at any time through the cookie settings link in the footer; choosing Reject stops Google Analytics and clears the _ga cookies this site has set.",
        },
        {
          title: "Affiliate links",
          body: "Some links to booking platforms or support services are affiliate links, including partners such as 12Go (transport) and Agoda (hotels). When you click an affiliate link, that partner may set cookies for marketing purposes and to track the click for commission attribution, so the site may earn a commission if you later book. This does not affect the timetable information, prices shown from operator sources, or editorial recommendations.",
        },
        {
          title: "How affiliate clicks are counted",
          body: "When you click a booking or hotel link, this site records the click on its own server and forwards one event to Google Analytics through the Measurement Protocol. That event contains only the partner name, the position of the link on the page, the route and the page language. It is sent with a single fixed identifier shared by every visitor, so it cannot be used to recognise you, to link your clicks together, or to build a profile. Because it does not identify anyone, this server-side count is made regardless of your analytics choice. The separate browser-side Google Analytics event described above is not sent if you have rejected analytics.",
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
          body: "Some pages ask third-party services for live data from your browser, which means those services receive your IP address. Destination weather comes from open-meteo.com on the homepage and on route pages. Currency rates come from open.er-api.com on route pages. Neither sets cookies for this site, and when either is unavailable the page shows saved estimates clearly labelled as such. Guide pages make neither request. If you use the Was this guide helpful button, your message is delivered through formsubmit.co. Station maps are embedded from OpenStreetMap and load only after you open a map. The site is hosted by Vercel and also links out to 12Go, Agoda, Buy Me a Coffee, Google Maps, Wikimedia Commons and Thailand Transfer Guide. These providers process data under their own privacy policies.",
        },
        {
          title: "Maps and embedded content",
          body: "Station pages may include embedded OpenStreetMap maps and links to Google Maps. Embedded maps and external links may allow those services to receive technical information such as IP address, browser information, or the page you came from. Google Maps is used as an external link, not as a Google Maps API integration.",
        },
        {
          title: "Consent and withdrawal",
          body: "The analytics consent banner lets you accept or reject Google Analytics before it loads. You can change your analytics choice later from the cookie settings link in the footer, and you may also withdraw consent by clearing cookies in your browser.",
        },
        {
          title: "Data retention basics",
          body: "Email messages and correction reports may be kept as long as needed to reply, verify reported changes, maintain schedule history, or protect the site from abuse. Analytics and third-party data retention periods depend on the provider settings and policies.",
        },
        {
          title: "Contact",
          body: "For privacy questions, correction requests, outdated schedule reports, or operator updates, contact Paweł Giżyński at bangkokpattayabus@gmail.com. This includes requests to access, correct or delete personal data, and any question about how this site handles it. Please do not use this email for urgent travel support; confirm urgent travel details directly with the bus station or operator.",
        },
        {
          title: "Last updated",
          body: "This privacy policy was last reviewed on 5 September 2026, when the publisher and data controller were named. The previous review on 29 August 2026 checked each statement here against how the site actually behaves, including when Google Analytics loads, how affiliate clicks are counted, and which third-party services the browser contacts.",
        },
      ]}
    />
  );
}
