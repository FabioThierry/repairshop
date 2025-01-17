import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Not Found"
};

export default function NotFound() {
  return (
    <div className="px-2 w-full">
      <div className="mx-auto py-4 flex flex-col justify-center items-center gap-4">
        <h2 className="text-2xl">Page Not Found</h2>
        <Image
          className="m-0 rounded-xl"
          src="/images/404.jpeg"
          width={300}
          height={300}
          sizes="300px"
          alt="404"
          priority={true}
          title="Page not found"
        />
      </div>
      <Link href="/tickets" className="text-center hover:underline">
        <h3>Go Home</h3>
      </Link>
    </div>
  );
}
