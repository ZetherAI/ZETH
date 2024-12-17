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
      name: "message_time",
      title: "Last Name",
      type: "date",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "password",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "url",
    }),
    defineField({
      name: "ammount_spent",
      title: "Ammount Spent ($)",
      type: "number",
    }),
    defineField({
      name: "collections",
      title: "Collections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "collection" }] }],
    }),
    defineField({
      name: "orders",
      title: "Orders",
      type: "array",
      of: [{ type: "reference", to: [{ type: "order" }] }],
    }),
    defineField({
      name: "notifications",
      title: "Notifications",
      type: "array",
      of: [{ type: "reference", to: [{ type: "notification" }] }],
    }),
  ],
  initialValue: {
    ammount_spent: 0,
  },
  preview: {
    select: {
      title: "first_name",
    },
  },
});
