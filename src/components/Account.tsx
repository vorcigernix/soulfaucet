import { useAccount, useBalance, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { data: ensNameData } = useEnsName({ address });

  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <>
      <div>
        {ensNameData ?? address}
        {ensNameData ? ` (${address})` : null}
      </div>
      <div>
        Balance: {data?.formatted} {data?.symbol}
      </div>
    </>
  );
}
