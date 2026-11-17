import { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import CookieConsent from "@/components/CookieConsent";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { normalizePath, PAGE_SEO } from "@shared/siteContent";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const Contact = lazy(() => import("@/pages/Contact"));
const PrivacyPage = lazy(() => import("@/pages/Legal").then(module => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import("@/pages/Legal").then(module => ({ default: module.TermsPage })));
const CookiesPage = lazy(() => import("@/pages/Legal").then(module => ({ default: module.CookiesPage })));
const Admin = lazy(() => import("@/pages/Admin"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function RouteFallback() {
  const [location] = useLocation();
  const page = PAGE_SEO[normalizePath(location) as keyof typeof PAGE_SEO];
  return <main className="route-fallback"><div className="route-fallback__inner"><span>{page?.eyebrow ?? "Smart ProEng"}</span><h1>{page?.heading ?? "Página não encontrada."}</h1><p>{page?.intro ?? "Use a navegação para explorar os serviços da Smart ProEng."}</p></div></main>;
}

function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    if (typeof window === "undefined" || location.includes("#") || window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location]);

  return null;
}

function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sobre" component={About} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/contato" component={Contact} />
        <Route path="/privacidade" component={PrivacyPage} />
        <Route path="/termos" component={TermsPage} />
        <Route path="/cookies" component={CookiesPage} />
        <Route path="/admgerencia" component={Admin} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.dataset.appReady = "true";
    return () => { delete document.documentElement.dataset.appReady; };
  }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <ScrollToTop />
          <Router />
          <CookieConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
