import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId } = await searchParams;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} Not Found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      console.log("customer data", customer);
      // Put the costumer data in the form
    } else {
      // new costumer form component
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw { message: e.message };
    }
  }
}
