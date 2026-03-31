import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const token = process.env.SANITY_WRITE_TOKEN;

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
});
