import type { FullAccountData } from "@trivo/shared/types/account";

import { MOCK_ACCOUNTS } from "../data/mock-accounts";
import type { AccountRepository } from "./account-repository";

export class MockAccountRepository implements AccountRepository {
  async getAccounts(): Promise<FullAccountData[]> {
    return MOCK_ACCOUNTS;
  }
}
