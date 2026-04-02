type ChannelLabel =
  | "Email"
  | "SMS"
  | "Push Notifications"
  | "In-App Messages"
  | "Whatsapp";

type ChannelValue = "email" | "sms" | "push" | "in_app" | "whatsapp";

interface IChannelOption {
  label: ChannelLabel;
  value: ChannelValue;
}

interface IAccountSettings {
  notifications: boolean;
  daily_email_limit: number;
  support_email: string;
  timezone: string;
  allowed_channels: IChannelOption[];
}

export interface IAccount {
  id: string;
  name: string;
}

export type FullAccountData = IAccount & IAccountSettings;
