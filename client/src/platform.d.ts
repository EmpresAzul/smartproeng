export {};

declare global {
  interface Window {
    __SMARTPROENG_CONFIG__?: {
      apiUrl: string;
      apiBrowserKey: string;
    };
  }
}
