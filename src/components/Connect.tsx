import { useAccount, useConnect, useDisconnect } from "wagmi";

export function Connect() {
  const { connector, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div>
      <div>
        {isConnected && (
          <button
            className="greenbtn"
            onClick={() => disconnect()}
          >
            Disconnect from {connector?.name}
          </button>
        )}
        <div className="flex space-x-4">
          {connectors
            .filter((x) => x.ready && x.id !== connector?.id)
            .map((x) => (
              <button
                className="whitebtn hover:border-teal-400"
                key={x.id}
                onClick={() => connect({ connector: x })}
              >
                {x.name}
                {isLoading && x.id === pendingConnector?.id && " (connecting)" }
              </button>
            ))}
        </div>
      </div>
      {error && <div>{error.message}</div>}
    </div>
  );
}
