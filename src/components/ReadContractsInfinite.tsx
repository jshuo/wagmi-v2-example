import { stringify } from "viem";
import { useInfiniteReadContracts } from "wagmi";
import { wagmiContractConfig } from "./contracts";

type resData = {
  pageParams: number[];
  pages: {
    result: string;
    status: string;
  }[][];
};

export function ReadContractsInfinite() {
  const { data, isLoading, isSuccess, fetchNextPage } =
    useInfiniteReadContracts({
      cacheKey: "lootTokenURIs",
      contracts(pageParam: number) {
        return [
          // ...
          {
            ...wagmiContractConfig,
            functionName: "ownerOf",
            args: [BigInt(pageParam)] as const,
          },
          // ...
        ];
      },
      query: {
        initialPageParam: 0,
        getNextPageParam: (_lastPage, _allPages, lastPageParam) => {
          return lastPageParam + 1;
        },
      },
    });

  return (
    <div>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <>
          {(data as unknown as resData)?.pages.map((data) => (
            // eslint-disable-next-line react/jsx-key
            <div>
              {data.flatMap((x) => (
                <pre>{stringify(x)}</pre>
              ))}
            </div>
          ))}
          <button onClick={() => fetchNextPage()}>Fetch more</button>
        </>
      )}
    </div>
  );
}
