export const apiVersion = "2026-03-29";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const basePath = "/studio";
export const hasRequiredSanityEnv = Boolean(projectId && dataset);
