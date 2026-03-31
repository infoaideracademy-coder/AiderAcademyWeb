import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";

const fallbackDataset = dataset || "production";
const fallbackProjectId = projectId || "placeholder-project-id";

const builder = createImageUrlBuilder({
  projectId: fallbackProjectId,
  dataset: fallbackDataset,
});

export const urlForImage = (source: SanityImageSource) => builder.image(source).auto("format");
