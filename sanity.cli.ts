import { apiVersion, dataset, projectId } from "@/sanity/env";

export default {
  api: {
    projectId: projectId || "placeholder-project-id",
    dataset: dataset || "production",
    apiVersion,
  },
};
