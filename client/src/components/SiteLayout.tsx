import { useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { COMPANY } from "@shared/siteContent";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/sobre", label: "Sobre" },
  { href: "/portfolio", label: "Portfólio" },
  { href: "/contato", label: "Contato" },
] as const;

const CAMPAIGN_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export function campaignHref(path: string): string {
  if (typeof window === "undefined") return path;
  const current = new URLSearchParams(window.location.search);
  const preserved = new URLSearchParams();
  for (const key of CAMPAIGN_KEYS) {
    const value = current.get(key);
    if (value) preserved.set(key, value.slice(0, 140));
  }
  const suffix = preserved.toString();
  return suffix ? `${path}${path.includes("?") ? "&" : "?"}${suffix}` : path;
}

export function PrimaryLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={campaignHref(href)} className={`button button--primary ${className}`}>
      <span>{children}</span><ArrowUpRight size={17} aria-hidden="true" />
    </Link>
  );
}

export default function SiteLayout({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const phoneLink = `https://wa.me/${COMPANY.phoneE164}`;

  return (
    <div className="site-shell">
      <header className={`site-header ${dark ? "site-header--dark" : ""}`}>
        <div className="site-header__inner container">
          <Link href={campaignHref("/")} className="brand-lockup" aria-label="Smart ProEng — página inicial">
            <img src="/brand/smartproeng-lockup-dark.jpg" alt="Smart ProEng — Inteligência em Gerenciamento de Projetos" width="435" height="85" fetchPriority="high" />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="site-navigation"
            onClick={() => setMenuOpen(open => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav id="site-navigation" className={`site-nav ${menuOpen ? "site-nav--open" : ""}`} aria-label="Navegação principal">
            {NAV.map(item => (
              <Link key={item.href} href={campaignHref(item.href)} className="site-nav__link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <PrimaryLink href="/contato" className="site-nav__cta" >Solicitar diagnóstico</PrimaryLink>
          </nav>
        </div>
      </header>

      {children}

      <footer className="site-footer">
        <div className="container">
          <div className="site-footer__top">
            <div className="site-footer__brand">
              <Link href="/" className="brand-lockup" aria-label="Smart ProEng — página inicial">
                <img src="/brand/smartproeng-lockup-dark.jpg" alt="Smart ProEng" width="435" height="85" loading="lazy" />
              </Link>
              <p>Engenharia consultiva para decisões com mais clareza sobre custo, prazo e risco.</p>
            </div>
            <div className="site-footer__column">
              <h2>Explore</h2>
              <Link href="/sobre">Sobre a Smart ProEng</Link>
              <Link href="/portfolio">Frentes de serviço</Link>
              <Link href="/contato">Fale com a equipe</Link>
            </div>
            <div className="site-footer__column">
              <h2>Contato</h2>
              <a href={`tel:+${COMPANY.phoneE164}`}>{COMPANY.phoneDisplay}</a>
              <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              <span>{COMPANY.city} · {COMPANY.state}</span>
            </div>
          </div>
          <div className="site-footer__legal">
            <p>{COMPANY.legalName}<br />CNPJ {COMPANY.cnpj}</p>
            <div className="site-footer__legal-links">
              <Link href="/privacidade">Privacidade</Link>
              <Link href="/termos">Termos de uso</Link>
              <Link href="/cookies">Cookies</Link>
              <button type="button" className="text-button" onClick={() => window.dispatchEvent(new Event("smartproeng:cookie-settings"))}>Preferências de cookies</button>
              <Link href="/admgerencia">Área do engenheiro</Link>
            </div>
          </div>
          <div className="site-footer__bottom">
            <span>© {new Date().getFullYear()} Smart ProEng. Todos os direitos reservados.</span>
            <a className="footer-whatsapp" href={phoneLink} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
