import { getCustomer } from "@/lib/queries/getCustomer";
import { BackButton } from "@/components/BackButton";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "@/app/(rs)/customers/form/CustomerForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { customerId } = await searchParams;
  if (!customerId) return { title: "New Costumer" };
  return { title: `Edit Costumer ${customerId}` };
}
export default async function CustomerFormPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  try {
    const { getPermission } = getKindeServerSession();
    const managerPermission = await getPermission("manager");
    const isManager = managerPermission?.isGranted;

    const { customerId } = await searchParams;

    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">Customer ID #{customerId} Not Found</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }
      console.log("customer data", customer);
      // Put the costumer data in the form
      return <CustomerForm key={customer.id} isManager={isManager} customer={customer} />;
    } else {
      // new costumer form component
      return <CustomerForm key="new" isManager={isManager} />;
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw { message: e.message };
    }
  }
}
