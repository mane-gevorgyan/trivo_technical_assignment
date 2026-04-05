import type { FullAccountData } from "@trivo/shared/types/account";
import type { AccountSettingsPatchInput } from "../validation/account";

export interface AccountRepository {
  getAccounts(): Promise<FullAccountData[]>;
  getAccountById(accountId: string): Promise<FullAccountData | null>;
  updateAccountSettings(
    accountId: string,
    settingsData: AccountSettingsPatchInput,
  ): Promise<FullAccountData | null>;
}
