import type { FullAccountData, IAccount } from "@/types/account";

import { fetchAccountById, fetchAccounts } from "@/lib/api/account-api";

export const loadSidebarAccounts = async (): Promise<IAccount[]> => {
  return fetchAccounts();
};

export const loadDefaultAccount = async (): Promise<IAccount | null> => {
  const accounts = await loadSidebarAccounts();

  return accounts[0] ?? null;
};

export const loadSingleAccount = async (
  accountId: string,
): Promise<FullAccountData> => {
  return fetchAccountById(accountId);
};
