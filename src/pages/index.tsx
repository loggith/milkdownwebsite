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

import { useState, useEffect } from 'react';

export default function Playground() {
  const [unLoading, setUnLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState('');

useEffect(() => {
  if (typeof window !== 'undefined') {
    // 确保只在客户端执行
    const snApi = require('sn-extension-api');
    snApi.initialize({
      debounceSave: 400,
    });
    const unsubscribe = snApi.subscribe(() => {
      setSubscriptionData(snApi.text);
      setUnLoading(true);
    });

    return unsubscribe;
  }
}, []);

  return (
    <>
      <Head>
        <title>Playground | Milkdown</title>
      </Head>
      <div className="snmd-grid">
        {unLoading && <Provider data={subscriptionData} />}
      </div>
    </>
  );
}