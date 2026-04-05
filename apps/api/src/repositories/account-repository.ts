import type { FullAccountData } from "@trivo/shared/types/account";

export interface AccountRepository {
  getAccounts(): Promise<FullAccountData[]>;
}
