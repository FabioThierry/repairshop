import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { customers } from "../db/schema";

export const insertCustomerSchema = createInsertSchema(customers, {
  firstName: (schema) => schema.firstName.min(1, "First name is required"),
  lastName: (schema) => schema.lastName.min(1, "Last name is required"),
  address1: (schema) => schema.address1.min(1, "Address is required"),
  city: (schema) => schema.city.min(1, "City is required"),
  state: (schema) => schema.state.min(1, "State is required"),
  email: (schema) =>
    schema.email.email("Invalid email").min(1, "Email is required"),
  zip: (schema) =>
    schema.zip.regex(/^\d{5}$/, "Invalid zip code: exemple: 12345"),
  phone: (schema) =>
    schema.phone.regex(
      /^\d{2}\d{4,5}-\d{4}$/,
      "Invalid phone number: exemple: 11 1234-5678"
    ),
});

export const selectCustomerSchema = createSelectSchema(customers);

export type InsertCustomerSchemaType = typeof insertCustomerSchema._type;

export type SelectCustomerSchemaType = typeof selectCustomerSchema._type;
