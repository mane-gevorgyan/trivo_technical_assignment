import type { IAccount } from "@trivo/shared/types/account";

import { toAccountSummary } from "../mappers/account-mapper";
import { sidebarAccountsSchema } from "../validation/account";
import type { AccountRepository } from "../repositories/account-repository";

export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async getSidebarAccounts(): Promise<IAccount[]> {
    const accounts = await this.accountRepository.getAccounts();

    if (accounts.length === 0) {
      return [];
    }

    return sidebarAccountsSchema.parse(accounts.map(toAccountSummary));
  }
}
