export interface BalanceType {
  balance: number;
  network: string;
  quota: {
    batch: any;
    quota: number;
    used: number;
  };
}

export function Balance(props: BalanceType[]) {
  const nets = Object.values(props);
  console.log(nets);

  return (
    <>
      <section className="text-gray-900 body-font w-full bg-white/20 my-4 p-4 border-white/20 border">
        <div className="container divide-y mx-auto">
          {nets.map((net) => {
            return (
              <div
                key={net.network}
                className="flex flex-wrap text-left"
              >
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-2xl text-3xl">
                    {net.network}
                  </h2>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl">
                    {Number(net.balance).toFixed(2)} Ξ
                  </h2>
                  <p className="leading-relaxed">Balance</p>
                </div>
                <div className="p-4 sm:w-1/3 w-1/2">
                  <h2 className="title-font font-medium sm:text-4xl text-3xl">
                    {net.quota.used} of {net.quota.quota}
                  </h2>
                  <p className="leading-relaxed">Requests used</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
