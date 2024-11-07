import { getTicket } from "@/lib/queries/getTicket";
import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { ticketId, customerId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket or Costumer ID required to load ticket form
          </h2>
          <BackButton title="GoBack" variant="default" />
        </>
      );
    }
    // new ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Costumer ID #{customerId} Not Found
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Costumer ID #{customerId} number is not active
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      // return ticket form
      console.log(customer);
    }
    // edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));
      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} Not Found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      // return ticket form
      console.log("ticket ", ticket);
      console.log("customer ", customer);
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw "Error: " + e.message;
    }
  }
}