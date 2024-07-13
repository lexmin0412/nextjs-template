import { headers } from "next/headers";
import Link from "next/link";

export default function Test() {
  const headersx = headers();
  const currentHref = headersx.get("x-request-url");
	return (
    <Link
      href={`/oauth?sourceURI=${encodeURIComponent(currentHref as string)}`}
    >
      测试 OAuth
    </Link>
  );
}
