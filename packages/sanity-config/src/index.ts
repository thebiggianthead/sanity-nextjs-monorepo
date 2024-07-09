/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { assist } from "@sanity/assist";
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import {
  presentationTool,
  defineDocuments,
  defineLocations,
  type DocumentLocation,
} from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";

import { DATASET, PROJECT_ID, API_VERSION } from "./env";
import { resolveHref } from "./lib/utils";
import { pageStructure, singletonPlugin } from "./plugins/settings";
import author from "./schemas/documents/author";
import post from "./schemas/documents/post";
import settings from "./schemas/singletons/settings";

const homeLocation = {
  title: "Home",
  href: "/",
} satisfies DocumentLocation;

export default defineConfig({
  dataset: DATASET,
  projectId: PROJECT_ID,
  basePath: "/test",
  schema: {
    types: [
      // Singletons
      settings,
      // Documents
      post,
      author,
    ],
  },
  plugins: [
    presentationTool({
      resolve: {
        mainDocuments: defineDocuments([
          {
            route: "/posts/:slug",
            filter: `_type == "post" && slug.current == $slug`,
          },
        ]),
        locations: {
          settings: defineLocations({
            locations: [homeLocation],
            message: "This document is used on all pages",
            tone: "caution",
          }),
          post: defineLocations({
            select: {
              title: "title",
              slug: "slug.current",
            },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Untitled",
                  href: resolveHref("post", doc?.slug)!,
                },
                homeLocation,
              ],
            }),
          }),
        },
      },
      previewUrl: {
        preview: "/",
        previewMode: {
          enable:
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/api/draft/"
              : "/api/draft",
        },
      },
    }),
    structureTool({ structure: pageStructure([settings]) }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    assist(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === "development" &&
      visionTool({ defaultApiVersion: API_VERSION }),
  ].filter(Boolean) as PluginOptions[],
});
