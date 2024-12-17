import { defineField, defineType } from "sanity";
// import { UserIcon } from 'lucide-react';

export const client = defineType({
  name: "assister_chat",
  title: "Chat With Assister",
  type: "document",
  // icon: UserIcon,
  fields: [
    defineField({
      name: "message",
      title: "User Message",
      type: "string",
    }),
    defineField({
      name: "response_to",
      title: "Response To",
      type: "reference",
      to: { type: "user_message" },
    }),
  ],
});
