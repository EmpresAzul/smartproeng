import { ArrowUpRight, BriefcaseBusiness, GraduationCap, MoveUpRight, ShieldCheck } from "lucide-react";
import { ENGINEER, COMPANY } from "@shared/siteContent";
import Seo from "@/components/Seo";
import SiteLayout, { PrimaryLink } from "@/components/SiteLayout";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <SiteLayout>
      <Seo path="/sobre" />
      <main>
        <section className="inner-hero inner-hero--navy">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container inner-hero__inner"><span className="eyebrow eyebrow--mint">Eng. Tiago Arré · {COMPANY.city}, {COMPANY.state}</span><h1>Técnica de engenheiro.<br /><span>Visão de quem já administrou empresa.</span></h1><p>Conheça a trajetória que conecta engenharia elétrica, segurança, projetos e gestão à realidade de quem precisa decidir.</p><div className="inner-hero__meta"><span><ShieldCheck size={16} /> Eng. {ENGINEER.name}</span><span><BriefcaseBusiness size={16} /> Experiência em engenharia e gestão</span></div></div>
        </section>

        <section className="section about-profile">
          <div className="container about-profile__grid">
            <figure className="profile-photo">
              <img src="/manus-storage/about-fieldwork_dd015585.webp" alt="Dois profissionais com capacete analisando o trabalho em uma obra." loading="lazy" decoding="async" />
              <figcaption><strong>Imagem ilustrativa</strong><span>Não retrata o Eng. Tiago Arré nem representa uma obra da Smart ProEng.</span><a href="https://unsplash.com/photos/construction-workers-are-inspecting-plans-on-the-jobsite-tEepjQhromE" target="_blank" rel="noreferrer">Foto: Ronnakorn Triraganon / Unsplash</a></figcaption>
            </figure>
            <div className="about-copy"><span className="eyebrow">Eng. Tiago Arré</span><h2>Engenharia com leitura de operação.</h2><p className="lead">Engenheiro eletricista com pós-graduação em Engenharia de Segurança do Trabalho e em Engenharia Ferroviária, além de MBA em Gerenciamento de Projetos na Construção Civil.</p><p>Ao longo da trajetória, atuou como gerente de implantação de grandes obras, da infraestrutura à entrega final, e no gerenciamento e fiscalização de obras industriais. Também coordenou equipes técnicas de instalação e manutenção de climatização industrial e implantou sistemas e softwares em empresas.</p><p>De 2011 a 2024, administrou empresas nas áreas financeira, contábil e comercial. Essa experiência ajuda a traduzir questões técnicas para a linguagem de quem paga a conta: custo, prazo, risco e retorno.</p><PrimaryLink href="/contato">Fale com o Engenheiro Tiago</PrimaryLink></div>
          </div>
        </section>

        <section className="section section--soft">
          <div className="container"><SectionHeading eyebrow="Formação e experiência" title="Uma base técnica que conversa com a gestão." body="Formação e atuação profissional conforme as informações fornecidas pela Smart ProEng." /><div className="credential-grid"><div className="credential-main"><GraduationCap size={27} aria-hidden="true" /><h3>Formação</h3>{ENGINEER.qualifications.map((item, index) => <div className="credential-row" key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div><div className="credential-main credential-main--experience"><BriefcaseBusiness size={27} aria-hidden="true" /><h3>Experiência aplicada</h3>{ENGINEER.experience.map((item, index) => <div className="credential-row" key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></div></div>
        </section>

        <section className="section about-principles">
          <div className="container"><SectionHeading eyebrow="O que orienta o trabalho" title="Técnica, independência e clareza." /><div className="principle-grid"><article><span>01</span><h3>Segurança como parte do escopo</h3><p>Engenharia elétrica e segurança do trabalho são consideradas em conjunto quando o serviço pede essa leitura.</p></article><article><span>02</span><h3>Recomendação independente</h3><p>A consultoria não vende equipamentos nem executa a obra; a recomendação técnica tem foco no interesse do contratante.</p></article><article><span>03</span><h3>Informação que ajuda a decidir</h3><p>O trabalho busca organizar dados de custo, prazo, risco e desempenho de forma útil para a gestão.</p></article></div></div>
        </section>

        <section className="closing-cta closing-cta--compact"><div className="container closing-cta__inner"><div><span className="eyebrow eyebrow--mint">Smart ProEng · Mato Grosso</span><h2>Vamos conversar sobre a sua operação?</h2><p>O escopo começa com a compreensão do problema e das informações disponíveis.</p></div><PrimaryLink href="/contato">Solicitar diagnóstico <MoveUpRight size={16} /></PrimaryLink></div></section>
      </main>
    </SiteLayout>
  );
}
