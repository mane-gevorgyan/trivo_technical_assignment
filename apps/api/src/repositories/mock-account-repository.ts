import type { FullAccountData } from "@trivo/shared/types/account";

import { MOCK_ACCOUNTS } from "../data/mock-accounts";
import type { AccountRepository } from "./account-repository";

export class MockAccountRepository implements AccountRepository {
  async getAccounts(): Promise<FullAccountData[]> {
    return MOCK_ACCOUNTS;
  }

  async getAccountById(accountId: string): Promise<FullAccountData | null> {
    const account = MOCK_ACCOUNTS.find((acc) => acc.id === accountId);
    return account || null;
  }
}
