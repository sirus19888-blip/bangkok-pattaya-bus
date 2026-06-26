import { DocumentLayout } from "../DocumentLayout";
import "../globals.css";

export { metadata } from "../rootMetadata";

export default function DefaultRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DocumentLayout lang="en">{children}</DocumentLayout>;
}
