export type ChannelValue = "email" | "sms" | "push" | "in_app" | "whatsapp";

export type TimezoneValue =
  | "Asia/Tokyo"
  | "Europe/Warsaw"
  | "Asia/Chongqing"
  | "America/Sao_Paulo"
  | "America/Montreal"
  | "Europe/Oslo"
  | "Europe/Moscow"
  | "Asia/Jakarta"
  | "Europe/Lisbon"
  | "Indian/Mauritius";

export interface IAccountSettings {
  notifications: boolean;
  dailyEmailLimit: number;
  supportEmail: string;
  timezone: TimezoneValue;
  allowedChannels: ChannelValue[];
}

export interface IAccount {
  id: string;
  name: string;
}

export type FullAccountData = IAccount & IAccountSettings;
