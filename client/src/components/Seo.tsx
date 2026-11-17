import { useEffect } from "react";
import { PAGE_SEO, normalizePath } from "@shared/siteContent";

function setMeta(selector: string, attribute: "name" | "property", key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.content = value;
}

export default function Seo({ path }: { path: string }) {
  useEffect(() => {
    const pathname = normalizePath(path);
    const page = PAGE_SEO[pathname as keyof typeof PAGE_SEO];
    if (!page) {
      document.title = "Página não encontrada | Smart ProEng";
      setMeta('meta[name="robots"]', "name", "robots", "noindex,nofollow");
      return;
    }
    document.title = page.title;
    setMeta('meta[name="description"]', "name", "description", page.description);
    setMeta('meta[name="keywords"]', "name", "keywords", page.keywords);
    setMeta('meta[name="robots"]', "name", "robots", page.index ? "index,follow" : "noindex,nofollow");
    setMeta('meta[property="og:title"]', "property", "og:title", page.title);
    setMeta('meta[property="og:description"]', "property", "og:description", page.description);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", page.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", page.description);
  }, [path]);
  return null;
}
