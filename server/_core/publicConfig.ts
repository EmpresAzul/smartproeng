// Only the values needed by the optional map component are exposed to the browser.
export function publicClientConfig(env: NodeJS.ProcessEnv = process.env) {
  return {
    apiUrl: env.MANUS_API_URL ?? "",
    apiBrowserKey: env.MANUS_API_BROWSER_KEY ?? "",
  };
}

export function publicClientScript(env: NodeJS.ProcessEnv = process.env): string {
  const json = JSON.stringify(publicClientConfig(env)).replaceAll("<", "\\u003c");
  return `window.__SMARTPROENG_CONFIG__=${json};`;
}

export function injectPublicClientConfig(template: string): string {
  const placeholder = '<script id="smartproeng-runtime-config"></script>';
  if (!template.includes(placeholder)) {
    throw new Error("Runtime client configuration placeholder is missing from index.html");
  }
  return template.replace(placeholder, `<script>${publicClientScript()}</script>`);
}
