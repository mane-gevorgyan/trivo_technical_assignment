import type { FullAccountData } from "@trivo/shared/types/account";
import type { AccountSettingsPatchInput } from "../validation/account";

import { MOCK_ACCOUNTS } from "../data/mock-accounts";
import { mergeAccountSettingsPatch } from "./helpers/account-repository-helpers";
import type { AccountRepository } from "./account-repository";

export class MockAccountRepository implements AccountRepository {
  async getAccounts(): Promise<FullAccountData[]> {
    return MOCK_ACCOUNTS;
  }

  async getAccountById(accountId: string): Promise<FullAccountData | null> {
    const account = MOCK_ACCOUNTS.find((acc) => acc.id === accountId);
    return account || null;
  }

  async updateAccountSettings(
    accountId: string,
    settingsData: AccountSettingsPatchInput,
  ): Promise<FullAccountData | null> {
    const accountIndex = MOCK_ACCOUNTS.findIndex((acc) => acc.id === accountId);

    if (accountIndex === -1) {
      return null;
    }

    const account = MOCK_ACCOUNTS[accountIndex];

    if (!account) {
      return null;
    }

    const updatedAccount = mergeAccountSettingsPatch(account, settingsData);

    MOCK_ACCOUNTS[accountIndex] = updatedAccount;

    return updatedAccount;
  }
}
