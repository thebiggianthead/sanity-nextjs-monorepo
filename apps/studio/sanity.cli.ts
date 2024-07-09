import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  },
  vite(config, env) {
    addEnvironmentVariables(config, env);
    return config;
  },
});

// Vite and Next.js (Webpack) treat environment variables
// differently. This provides compatibility for Next.js
// style environment variables in Vite, for packages like
// @repo/sanity-config that need to work with both bundlers
function addEnvironmentVariables(config: any, env: any) {
  const prefix = "NEXT_PUBLIC";

  Object.keys(process.env).forEach((name) => {
    if (!name.startsWith(prefix)) return;
    config.define ??= {};
    config.define[`process.env.${name}`] = JSON.stringify(process.env[name]);
  });
}
