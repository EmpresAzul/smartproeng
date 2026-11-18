import { COMPANY, normalizePath, PAGE_SEO } from "../../shared/siteContent";

const SHARE_IMAGE_PATH = "/brand/smartproeng-lockup-dark.jpg";

function getShareImageUrl(): string {
  const configuredOrigin = process.env.PUBLIC_SITE_URL?.trim();
  const vercelHost = process.env.VERCEL_URL?.trim();
  const origin = configuredOrigin || (vercelHost ? `https://${vercelHost}` : "");
  if (!origin) return SHARE_IMAGE_PATH;
  try {
    return new URL(SHARE_IMAGE_PATH, origin).toString();
  } catch {
    return SHARE_IMAGE_PATH;
  }
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] ?? character);
}

function setMeta(html: string, key: string, value: string, attribute: "name" | "property" = "name"): string {
  const safeKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tag = `<meta ${attribute}="${escapeHtml(key)}" content="${escapeHtml(value)}" />`;
  const pattern = new RegExp(`<meta\\s+${attribute}=["']${safeKey}["'][^>]*>`, "i");
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `  ${tag}\n</head>`);
}

export function createRouteDocument(template: string, rawPath: string): { html: string; status: number } {
  const pathname = normalizePath(rawPath);
  const page = PAGE_SEO[pathname as keyof typeof PAGE_SEO];
  const isKnown = Boolean(page);
  const isAdmin = pathname === "/admgerencia";
  const seo = page ?? {
    title: "Página não encontrada | Smart ProEng",
    description: "A página solicitada não foi encontrada. Volte ao site Smart ProEng para conhecer os serviços de engenharia.",
    keywords: "",
    heading: "Esta página não foi encontrada.",
    intro: "O endereço pode ter sido alterado. Use a navegação para voltar às páginas do site.",
    eyebrow: "Erro 404",
    link: "/",
    linkLabel: "Ir para a página inicial",
    index: false,
  };
  let html = template;
  const shareImage = getShareImageUrl();
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(seo.title)}</title>`);
  html = setMeta(html, "description", seo.description);
  html = setMeta(html, "keywords", seo.keywords);
  html = setMeta(html, "robots", isKnown && seo.index && !isAdmin ? "index,follow" : "noindex,nofollow");
  html = setMeta(html, "og:type", "website", "property");
  html = setMeta(html, "og:title", seo.title, "property");
  html = setMeta(html, "og:description", seo.description, "property");
  html = setMeta(html, "og:site_name", COMPANY.brand, "property");
  html = setMeta(html, "og:image", shareImage, "property");
  html = setMeta(html, "og:image:alt", `${COMPANY.brand} — ${COMPANY.tagline}`, "property");
  html = setMeta(html, "twitter:card", "summary_large_image");
  html = setMeta(html, "twitter:title", seo.title);
  html = setMeta(html, "twitter:description", seo.description);
  html = setMeta(html, "twitter:image", shareImage);

  const snapshot = `<main class="seo-snapshot"><div class="seo-snapshot__inner"><p class="seo-snapshot__eyebrow">${escapeHtml(seo.eyebrow)}</p><h1>${escapeHtml(seo.heading)}</h1><p>${escapeHtml(seo.intro)}</p><a href="${escapeHtml(seo.link)}">${escapeHtml(seo.linkLabel)}</a></div></main>`;
  html = html.replace('<div id="root"></div>', `<div id="root">${snapshot}</div>`);
  return { html, status: isKnown ? 200 : 404 };
}
