import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bangkok Pattaya Bus Guide",
    short_name: "BP Bus Guide",
    description: "Bus times and travel tips between Bangkok and Pattaya.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f7f0e3",
    theme_color: "#13233a",
  };
}
