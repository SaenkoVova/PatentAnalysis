export interface ILoginHistory {
  created: string;
  ip: string;
  deviceBrowser: string;
  deviceOs: string;
  deviceFamily: string;
  countryCode: string | null;
  language: string;
  timeZone: string | null;
  userAgent: string;
}
