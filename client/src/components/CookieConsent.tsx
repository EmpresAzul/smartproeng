import { useEffect, useState } from "react";

const STORAGE_KEY = "smartproeng-cookie-preferences-v1";
type Preferences = { necessary: true; analytics: boolean; marketing: boolean; savedAt: string };

function readPreferences(): Preferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as Partial<Preferences>;
    if (typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean") return null;
    return { necessary: true, analytics: value.analytics, marketing: value.marketing, savedAt: String(value.savedAt ?? "") };
  } catch {
    return null;
  }
}

function storePreferences(analytics: boolean, marketing: boolean): Preferences {
  const preferences: Preferences = { necessary: true, analytics, marketing, savedAt: new Date().toISOString() };
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); } catch { /* storage may be unavailable */ }
  return preferences;
}

export default function CookieConsent() {
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const current = readPreferences();
    setPreferences(current);
    setAnalytics(current?.analytics ?? false);
    setMarketing(current?.marketing ?? false);
    const open = () => {
      const saved = readPreferences();
      setCustomizing(true);
      setPreferences(saved);
      setAnalytics(saved?.analytics ?? false);
      setMarketing(saved?.marketing ?? false);
    };
    window.addEventListener("smartproeng:cookie-settings", open);
    return () => window.removeEventListener("smartproeng:cookie-settings", open);
  }, []);

  if (preferences && !customizing) return null;

  const save = (analyticsAllowed: boolean, marketingAllowed: boolean) => {
    setPreferences(storePreferences(analyticsAllowed, marketingAllowed));
    setCustomizing(false);
  };

  return (
    <aside className="cookie-panel" aria-label="Preferências de cookies" aria-live="polite">
      <div className="cookie-panel__copy">
        <span className="eyebrow">Sua privacidade importa</span>
        <h2>{customizing ? "Escolha suas preferências" : "Como este site usa cookies"}</h2>
        <p>Usamos apenas o armazenamento essencial para funções solicitadas. Analytics e marketing ficam desligados até sua escolha. Saiba mais na <a href="/cookies">Política de Cookies</a>.</p>
      </div>
      {customizing ? (
        <div className="cookie-panel__options">
          <label className="cookie-option"><span><strong>Necessários</strong><small>Login seguro e funcionamento básico — sempre ativos.</small></span><input type="checkbox" checked disabled aria-label="Cookies necessários sempre ativos" /></label>
          <label className="cookie-option"><span><strong>Analytics</strong><small>Medição de uso para melhorar o site.</small></span><input type="checkbox" checked={analytics} onChange={event => setAnalytics(event.target.checked)} /></label>
          <label className="cookie-option"><span><strong>Marketing</strong><small>Mensuração de campanhas e anúncios.</small></span><input type="checkbox" checked={marketing} onChange={event => setMarketing(event.target.checked)} /></label>
          <div className="cookie-panel__actions"><button className="button button--quiet" onClick={() => save(false, false)}>Somente necessários</button><button className="button button--primary" onClick={() => save(analytics, marketing)}>Salvar escolhas</button></div>
        </div>
      ) : (
        <div className="cookie-panel__actions">
          <button className="button button--quiet" onClick={() => save(false, false)}>Somente necessários</button>
          <button className="button button--outline" onClick={() => setCustomizing(true)}>Personalizar</button>
          <button className="button button--primary" onClick={() => save(true, true)}>Aceitar todos</button>
        </div>
      )}
    </aside>
  );
}
