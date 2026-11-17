import { Activity, ArrowDown, ArrowUpRight, ClipboardCheck, Cog, DraftingCompass, Gauge, ShieldCheck, Zap } from "lucide-react";
import { Link } from "wouter";
import { COMPANY, PROBLEMS, SERVICES, STATS, WORK_STEPS } from "@shared/siteContent";
import Seo from "@/components/Seo";
import SectionHeading from "@/components/SectionHeading";
import SiteLayout, { PrimaryLink, campaignHref } from "@/components/SiteLayout";

const SERVICE_ICONS = [Zap, DraftingCompass, Activity, Gauge, Cog];

export default function Home() {
  return (
    <SiteLayout dark>
      <Seo path="/" />
      <main>
        <section className="hero hero--home">
          <div className="cinematic-media cinematic-media--home" aria-hidden="true">
            <img src="/manus-storage/home-city-hero_abea5a93.webp" alt="" fetchPriority="high" decoding="async" />
            <span className="cinematic-media__veil" />
          </div>
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero__inner">
            <div className="hero__copy">
              <span className="eyebrow eyebrow--mint"><span className="eyebrow-dot" /> Engenharia consultiva · {COMPANY.city}, {COMPANY.state}</span>
              <h1>Engenharia que controla <span>custo, prazo e risco.</span></h1>
              <p>Laudos e perícias elétricas, gerenciamento de obras, gestão de manutenção, precificação e sistemas sob medida — para operações que precisam decidir com números.</p>
              <div className="hero__actions">
                <PrimaryLink href="/contato">Solicitar diagnóstico</PrimaryLink>
                <Link href={campaignHref("/portfolio")} className="button button--ghost">Ver os serviços <ArrowUpRight size={17} aria-hidden="true" /></Link>
              </div>
              <div className="hero__trust"><ShieldCheck size={17} aria-hidden="true" /><span>Do diagnóstico à entrega, com escopo claro e contato direto com o engenheiro.</span></div>
              <small className="hero-photo-note hero-photo-note--home">Imagem ilustrativa de Tianjin, China; foto de <a href="https://unsplash.com/photos/a-view-of-a-city-at-night-with-a-bridge-in-the-foreground-o_fSNj4IAMI" target="_blank" rel="noreferrer">Julius Carmine / Unsplash</a>. Não representa obra ou localização da Smart ProEng.</small>
            </div>
            <div className="hero-board-wrap" aria-label="Abordagem Smart ProEng: custo, prazo e risco conectados">
              <div className="hero-board__corner hero-board__corner--top" aria-hidden="true" />
              <div className="hero-board">
                <div className="hero-board__top"><span className="board-kicker">INTELIGÊNCIA DE PROJETOS</span><span className="board-live"><i /> VISÃO INTEGRADA</span></div>
                <div className="hero-board__title"><span>Três variáveis.</span><strong>Uma decisão melhor.</strong></div>
                <div className="decision-lines" aria-hidden="true"><span /><span /><span /></div>
                <div className="decision-cards">
                  <div className="decision-card"><span className="decision-card__icon"><Gauge size={17} /></span><span className="decision-card__label">CUSTO</span><small>previsto · medido</small></div>
                  <div className="decision-card decision-card--accent"><span className="decision-card__icon"><Activity size={17} /></span><span className="decision-card__label">PRAZO</span><small>etapas · marcos</small></div>
                  <div className="decision-card"><span className="decision-card__icon"><ShieldCheck size={17} /></span><span className="decision-card__label">RISCO</span><small>técnico · operacional</small></div>
                </div>
                <div className="hero-board__foot"><span>ENGENHARIA + GESTÃO</span><span className="board-mark"><b /><b /><b /></span></div>
              </div>
              <div className="hero-board__corner hero-board__corner--bottom" aria-hidden="true" />
              <div className="hero-float"><span className="hero-float__icon"><ClipboardCheck size={18} /></span><span><strong>Escopo claro</strong><small>antes de qualquer compromisso</small></span></div>
            </div>
          </div>
          <a className="hero-scroll" href="#indicadores"><span>Role para explorar</span><ArrowDown size={15} aria-hidden="true" /></a>
        </section>

        <section className="stats-strip" id="indicadores" aria-label="Dados da Smart ProEng">
          <div className="container stats-strip__grid">
            {STATS.map((stat, index) => <div className="stat-item" key={stat.value}><span className="stat-item__index">0{index + 1}</span><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </section>

        <section className="section section--soft">
          <div className="container">
            <SectionHeading eyebrow="O que resolvemos" title="Onde a operação perde dinheiro sem aparecer no relatório." body="Cada frente da Smart ProEng nasce de um problema que custa caro e costuma ficar sem dono dentro da empresa." />
            <div className="problem-grid">
              {PROBLEMS.map((problem, index) => <article className="problem-card" key={problem.title}><span className="problem-card__index">0{index + 1}</span><h3>{problem.title}</h3><p>{problem.body}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section section--services">
          <div className="container">
            <div className="section-heading-row"><SectionHeading eyebrow="Frentes de serviço" title="Cinco caminhos para uma operação mais previsível." body="Escopo e acompanhamento do diagnóstico à entrega. Cada frente pode ser contratada sozinha ou combinada." /><Link className="text-link" href={campaignHref("/portfolio")}>Ver escopos e entregáveis <ArrowUpRight size={16} /></Link></div>
            <div className="service-preview-grid">
              {SERVICES.map((service, index) => { const Icon = SERVICE_ICONS[index]; return <article className="service-preview" key={service.slug}><div className="service-preview__top"><span>{service.number} / 05</span><Icon size={22} aria-hidden="true" /></div><h3>{service.shortTitle}</h3><p>{service.description}</p><Link href={campaignHref("/portfolio")} className="service-preview__link" aria-label={`Conheça ${service.title}`}>Conheça a frente <ArrowUpRight size={15} /></Link></article>; })}
            </div>
          </div>
        </section>

        <section className="process-band">
          <div className="container process-band__head"><SectionHeading eyebrow="Como trabalhamos" title="Escopo claro antes de qualquer compromisso." body="Você sabe o que vai receber, em que prazo e com qual investimento." dark /></div>
          <div className="container process-grid">
            {WORK_STEPS.map((step, index) => <article className="process-step" key={step.number}><span className="process-step__number">ETAPA {index + 1}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}
          </div>
        </section>

        <section className="section section--why">
          <div className="container why-grid">
            <div><span className="eyebrow">Por que a Smart ProEng</span><h2>Técnica de engenheiro. <span>Visão de quem já administrou empresa.</span></h2><p>O trabalho conecta instalação, segurança e gestão. A recomendação é independente e considera o cenário de quem precisa decidir.</p><PrimaryLink href="/sobre">Conheça Tiago Arré</PrimaryLink></div>
            <div className="why-points"><article><span>01</span><div><h3>Elétrica, segurança e gestão juntas</h3><p>Uma visão técnica integrada para compreender riscos, operação e impacto no custo.</p></div></article><article><span>02</span><div><h3>Consultoria independente</h3><p>Recomendações técnicas orientadas ao interesse do contratante.</p></div></article><article><span>03</span><div><h3>Decisão com números</h3><p>Informações organizadas para apoiar escolhas sobre custo, prazo e retorno.</p></div></article></div>
          </div>
        </section>

        <section className="closing-cta">
          <div className="container closing-cta__inner"><div><span className="eyebrow eyebrow--mint">Primeira conversa</span><h2>Conte o problema.<br /><span>Vamos entender o cenário.</span></h2><p>Informe o tipo de operação, a cidade e o que precisa resolver. A conversa inicial ajuda a indicar o serviço adequado.</p></div><div className="closing-cta__actions"><PrimaryLink href="/contato">Conversar com a Smart ProEng</PrimaryLink><Link href={`https://wa.me/${COMPANY.phoneE164}`} className="button button--ghost" target="_blank" rel="noreferrer">Chamar no WhatsApp <ArrowUpRight size={17} /></Link></div></div>
        </section>
      </main>
    </SiteLayout>
  );
}
