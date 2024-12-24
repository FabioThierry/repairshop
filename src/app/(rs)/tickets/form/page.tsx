import { getTicket } from "@/lib/queries/getTicket";
import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Users, init as kindeInit } from "@kinde/management-api-js";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { ticketId, customerId } = await searchParams;

  if (!ticketId && !customerId) return { title: "Missing Ticket ID or Costumer ID" };

  if (customerId) return { title: `New Ticket for Costumer ${customerId}` };

  if (ticketId) return { title: `Edit Ticket ${ticketId}` };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  try {
    const { ticketId, customerId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">Ticket or Costumer ID required to load ticket form</h2>
          <BackButton title="GoBack" variant="default" />
        </>
      );
    }
    const { getPermission, getUser } = getKindeServerSession();
    const [managerPermission, user] = await Promise.all([getPermission("manager"), getUser()]);
    const isManager = managerPermission?.isGranted;

    // new ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Costumer ID #{customerId} Not Found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">Costumer ID #{customerId} number is not active</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      // return ticket form
      if (isManager) {
        kindeInit(); // Initializes the Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users ? users.map((user) => ({ id: user.email!, description: user.email! })) : [];

        return <TicketForm customer={customer} techs={techs} isManager={isManager} />;
      } else {
        return <TicketForm customer={customer} />;
      }
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
      if (isManager) {
        kindeInit(); // Initializes the Kinde Management API
        const { users } = await Users.getUsers();

        const techs = users ? users.map((user) => ({ id: user.email!, description: user.email! })) : [];

        return <TicketForm customer={customer} ticket={ticket} techs={techs} isManager={isManager} />;
      } else {
        const isEditable = user.email?.toLocaleLowerCase() === ticket.tech?.toLocaleLowerCase();
        return <TicketForm customer={customer} ticket={ticket} isEditable={isEditable} />;
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw "Error: " + e.message;
    }
  }
}
