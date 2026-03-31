import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, basePath, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemaTypes";

const fallbackDataset = dataset || "production";
const fallbackProjectId = projectId || "placeholder-project-id";

export const sanityConfig = defineConfig({
  name: "default",
  title: "Aider Academy Studio",
  projectId: fallbackProjectId,
  dataset: fallbackDataset,
  apiVersion,
  basePath,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
