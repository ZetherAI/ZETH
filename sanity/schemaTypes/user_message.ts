import { defineField, defineType } from "sanity";
// import { UserIcon } from 'lucide-react';

export const client = defineType({
  name: "user_message",
  title: "User Message",
  type: "document",
  // icon: UserIcon,
  fields: [
    defineField({
      name: "message",
      title: "User Message",
      type: "string",
    }),
    defineField({
      name: "sender",
      title: "sender",
      type: "reference",
      to: { type: "user" },
    }),
  ],
});
