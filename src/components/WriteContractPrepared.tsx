import { useSimulateContract } from "wagmi";

import { wagmiContractConfig } from "./contracts";

export function WriteContractPrepared() {
  const { data, error, isError, isLoading, status } = useSimulateContract({
    ...wagmiContractConfig,
    functionName: "mint",
  });

  console.log('status: ', status, data);

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <pre>{error.message}</pre>}
    </div>
  );
}
