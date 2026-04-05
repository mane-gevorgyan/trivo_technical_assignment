import { toAccountSummary } from "../mappers/account-mapper";
import type { AccountRepository } from "../repositories/account-repository";
import {
  fullAccountDataSchema,
  sidebarAccountsSchema,
  type FullAccountResponse,
  type SidebarAccountsResponse,
} from "../validation/account";

export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async getSidebarAccounts(): Promise<SidebarAccountsResponse> {
    const accounts = await this.accountRepository.getAccounts();

    if (accounts.length === 0) {
      return [];
    }

    return sidebarAccountsSchema.parse(accounts.map(toAccountSummary));
  }

  async getSingleAccount(accountId: string): Promise<FullAccountResponse | null> {
    const accountData = await this.accountRepository.getAccountById(accountId);

    if (!accountData) {
      return null;
    }

    return fullAccountDataSchema.parse(accountData);
  }
}
