import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const useIsHydrated = () =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
