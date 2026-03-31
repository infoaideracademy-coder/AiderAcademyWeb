import { defineArrayMember, defineField, defineType } from "sanity";
import { ImagesIcon } from "@sanity/icons";

export const partnersSectionType = defineType({
  name: "partnersSection",
  title: "Logo Slider",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      initialValue: "Our Partners & Accreditations",
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "partner",
          fields: [
            defineField({
              name: "name",
              title: "Partner Name",
              type: "string",
            }),
            defineField({
              name: "logo",
              title: "Logo Image",
              type: "image",
              options: { hotspot: true },
              fields: [
                {
                  name: "alt",
                  type: "string",
                  title: "Alternative Text",
                },
              ],
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "logo",
            },
          },
        }),
      ],
    }),
  ],
});
