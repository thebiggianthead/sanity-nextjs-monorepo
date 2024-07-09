"use client";

import base from "@repo/sanity-config";
import { NextStudio } from "next-sanity/studio";
import { defineConfig } from "sanity";

const config = defineConfig({
  ...base,
  basePath: "/studio",
});

export default function StudioPage() {
  return <NextStudio config={config} />;
}
