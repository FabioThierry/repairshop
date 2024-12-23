import * as Sentry from "@sentry/nextjs";

import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import CustomerTable from "@/app/(rs)/customers/CustomerTable";

export const metadata = {
  title: "Customer Search"
};
export default async function Customers({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;
  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResults-3"
  });
  const results = await getCustomerSearchResults(searchText);
  span.end();

  return (
    <>
      <CustomerSearch />
      {results.length ? <CustomerTable data={results} /> : <p className="mt-4">No Results Found</p>}
    </>
  );
  // return results
}
