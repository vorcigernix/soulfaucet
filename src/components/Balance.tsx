export interface BalanceType {
  balance: number;
  network: string;
  quota: Object;
}

export function Balance(props: BalanceType[]) {
  console.log(props);
  return (
    <>
      Balance
    </>
  );
}
