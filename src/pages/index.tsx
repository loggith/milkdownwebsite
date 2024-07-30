import Head from "next/head";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";

const Provider = dynamic(
  () =>
    import("@/components/sn-milkdown").then((module) => ({
      default: module.Playground,
    })),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function Playground() {
  return (
    <>
      <Head>
        <title>Playground | Milkdown</title>
      </Head>
      <div className="m-0 grid border-b border-gray-300 dark:border-gray-600 md:mt-0 md:grid-cols-2">
        <Provider />
      </div>
    </>
  );
}
