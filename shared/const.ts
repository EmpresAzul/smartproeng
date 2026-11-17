export const COOKIE_NAME = "webdev_app_session";
export const ONE_YEAR_MS = 1000 * 60 * 60 * 24 * 365;
export const AXIOS_TIMEOUT_MS = 30_000;
export const UNAUTHED_ERR_MSG = "Please login (10001)";
export const NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
export const OAUTH_STATE_COOKIE = "__Host-oauth_state";

export type OAuthState = { redirectUri: string; nonce?: string; returnTo?: string };

export const encodeOAuthState = (state: OAuthState): string => btoa(JSON.stringify(state));

export const decodeOAuthState = (state: string): OAuthState => {
  let decoded: string;
  try {
    decoded = atob(state);
  } catch {
    return { redirectUri: "" };
  }
  try {
    const parsed: unknown = JSON.parse(decoded);
    if (parsed && typeof parsed === "object" && "redirectUri" in parsed && typeof parsed.redirectUri === "string") {
      const value = parsed as OAuthState;
      return { redirectUri: value.redirectUri, nonce: value.nonce, returnTo: value.returnTo };
    }
  } catch {
    // Compatibility with legacy OAuth links that only carried a redirect URI.
  }
  return { redirectUri: decoded };
};
