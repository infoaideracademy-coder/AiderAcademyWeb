import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const fallbackDataset = dataset || "production";
const fallbackProjectId = projectId || "placeholder-project-id";

export const sanityClient = createClient({
  projectId: fallbackProjectId,
  dataset: fallbackDataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});
