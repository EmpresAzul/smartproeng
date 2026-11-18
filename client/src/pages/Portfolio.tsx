import { ArrowRight, ArrowUpRight, Check, Zap } from "lucide-react";
import { ELECTRICAL_LINES, SERVICES } from "@shared/siteContent";
import Seo from "@/components/Seo";
import SectionHeading from "@/components/SectionHeading";
import SiteLayout, { PrimaryLink } from "@/components/SiteLayout";

export default function Portfolio() {
  return (
    <SiteLayout>
      <Seo path="/portfolio" />
      <main>
        <section className="inner-hero inner-hero--cinematic inner-hero--portfolio">
          <div className="cinematic-media cinematic-media--portfolio" aria-hidden="true">
            <img src="/assets/site/portfolio-bridge.webp" alt="" loading="eager" fetchPriority="high" decoding="async" />
            <span className="cinematic-media__veil" />
          </div>
          <div className="hero-grid" aria-hidden="true" />
          <div className="container inner-hero__inner"><span className="eyebrow">Portfólio de serviços · 05 frentes</span><h1>Cinco frentes.<br /><span>Uma gestão integrada.</span></h1><p>Cada serviço pode ser contratado de forma independente ou combinado com outros, conforme o problema, a operação e o escopo acordado.</p><div className="hero__actions"><PrimaryLink href="/contato">Conversar sobre um escopo</PrimaryLink><a className="button button--line" href="#frentes">Explorar serviços <ArrowRight size={16} /></a></div><small className="hero-photo-note">Imagem ilustrativa; não representa obra executada pela Smart ProEng.</small></div>
        </section>

        <section className="portfolio-intro" id="frentes"><div className="container portfolio-intro__inner"><div><span className="eyebrow">Um portfólio integrado</span><h2>Do diagnóstico à entrega, com o escopo definido antes do compromisso.</h2></div><p>As frentes atendem indústria, agro, construção, comércio e prestadores de serviços. A proposta descreve entregas, prazo e investimento conforme a necessidade identificada.</p></div></section>

        <section className="service-detail-list">
          {SERVICES.map((service, index) => <article className={`service-detail ${index % 2 ? "service-detail--tint" : ""}`} key={service.slug} id={service.slug}>
            <div className="container service-detail__grid">
              <div className="service-detail__number"><span>{service.number}</span><small>FRENTE {service.number}/05</small></div>
              <div className="service-detail__content"><div className="service-detail__heading"><div><span className="eyebrow">Frente {service.number}</span><h2>{service.title}</h2></div>{index === 0 && <span className="service-detail__icon"><Zap size={20} /></span>}</div><p className="service-detail__lead">{service.description}</p><div className="service-detail__facts"><div><h3>Objetivo</h3><p>{service.objective}</p></div><div><h3>Para quem</h3><p>{service.audience}</p></div><div><h3>O que resolve</h3><p>{service.problem}</p></div></div>
                {index === 0 ? <div className="electric-lines"><h3>Linhas de atuação</h3><div className="electric-lines__grid">{ELECTRICAL_LINES.map((line, lineIndex) => <article className="electric-line" key={line.title}><div className="electric-line__top"><span>0{lineIndex + 1}</span><span className={line.priority === "Prioritária" ? "priority priority--primary" : "priority"}>{line.priority}</span></div><h4>{line.title}</h4><p>{line.description}</p><small>Para: {line.audience}</small></article>)}</div></div> : <div className="deliverable-layout"><div><h3>O que você recebe</h3><ul className="check-list">{service.deliverables.map(item => <li key={item}><Check size={15} aria-hidden="true" />{item}</li>)}</ul></div><div><h3>Formas de contratar</h3><ul className="contract-list">{service.formats.map(item => <li key={item}><ArrowUpRight size={15} aria-hidden="true" />{item}</li>)}</ul></div></div>}
                {index === 0 && <div className="deliverable-layout deliverable-layout--electrical"><div><h3>Formatos de contratação</h3><ul className="contract-list">{service.formats.map(item => <li key={item}><ArrowUpRight size={15} aria-hidden="true" />{item}</li>)}</ul></div><div className="service-note"><strong>Também sob demanda</strong><p>{service.note}</p></div></div>}
                {index !== 0 && <p className="service-note service-note--line">{service.note}</p>}
                <PrimaryLink href="/contato" className="button--small">Consultar esta frente</PrimaryLink>
              </div>
            </div>
          </article>)}
        </section>

        <section className="closing-cta"><div className="container closing-cta__inner"><div><span className="eyebrow eyebrow--mint">Próximo passo</span><h2>O escopo começa com a situação real.</h2><p>Conte o que precisa resolver e receba orientação sobre a frente de serviço adequada.</p></div><PrimaryLink href="/contato">Solicitar diagnóstico</PrimaryLink></div></section>
      </main>
    </SiteLayout>
  );
}
