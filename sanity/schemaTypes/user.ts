import { defineField, defineType } from "sanity";
// import { UserIcon } from 'lucide-react';

export const client = defineType({
  name: "user",
  title: "User",
  type: "document",
  // icon: UserIcon,
  fields: [
    defineField({
      name: "id",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "id",
    },
  },
});
