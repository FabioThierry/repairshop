import { db } from "@/db";
import { customers } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getCustomer = async (id: number) => {
  const costumer = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));

  return costumer[0];
};
