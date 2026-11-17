import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2, Clock3, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { COMPANY, SERVICES } from "@shared/siteContent";
import Seo from "@/components/Seo";
import SiteLayout, { PrimaryLink } from "@/components/SiteLayout";
import { trpc } from "@/lib/trpc";

export default function Contact() {
  const submit = trpc.contact.submit.useMutation();
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(false);
    setFormError("");
    const form = event.currentTarget;
    const values = new FormData(form);
    if (values.get("consent") !== "on") {
      setFormError("Confirme a ciência da Política de Privacidade para enviar sua solicitação.");
      return;
    }
    const query = new URLSearchParams(window.location.search);
    const attribution = {
      utm_source: query.get("utm_source")?.slice(0, 140) ?? "",
      utm_medium: query.get("utm_medium")?.slice(0, 140) ?? "",
      utm_campaign: query.get("utm_campaign")?.slice(0, 140) ?? "",
      utm_term: query.get("utm_term")?.slice(0, 140) ?? "",
      utm_content: query.get("utm_content")?.slice(0, 140) ?? "",
    };
    try {
      await submit.mutateAsync({
        name: String(values.get("name") ?? ""),
        email: String(values.get("email") ?? ""),
        phone: String(values.get("phone") ?? ""),
        organization: String(values.get("organization") ?? ""),
        city: String(values.get("city") ?? ""),
        service: String(values.get("service") ?? ""),
        message: String(values.get("message") ?? ""),
        consent: true,
        website: String(values.get("website") ?? ""),
        ...attribution,
      });
      form.reset();
      setSent(true);
    } catch {
      setFormError("Não foi possível enviar sua mensagem agora. Tente novamente ou fale conosco pelo WhatsApp.");
    }
  }

  return (
    <SiteLayout>
      <Seo path="/contato" />
      <main>
        <section className="inner-hero inner-hero--light contact-hero">
          <div className="container inner-hero__inner"><span className="eyebrow">Vamos conversar</span><h1>Conte o problema.<br /><span>Vamos entender o cenário.</span></h1><p>Informe o tipo de operação, a cidade e o que precisa resolver. A primeira conversa ajuda a indicar o serviço adequado.</p><div className="contact-hero__note"><ShieldCheck size={17} /><span>Seus dados são usados para responder a esta solicitação. <Link href="/privacidade">Veja como tratamos suas informações.</Link></span></div></div>
        </section>

        <section className="section contact-section">
          <div className="container contact-layout">
            <div className="contact-info contact-info--cinematic">
              <div className="cinematic-media cinematic-media--contact" aria-hidden="true">
                <img src="/manus-storage/async-images/NCDTs6Y8K92XGTw5S633HW/image-3.webp" alt="" loading="lazy" decoding="async" />
                <span className="cinematic-media__veil" />
              </div>
              <div className="contact-info__content">
                <span className="eyebrow eyebrow--mint">Canais de atendimento</span><h2>Uma conversa objetiva é o primeiro passo.</h2><p>Compartilhe o contexto e o que precisa resolver. O escopo, prazo e investimento são apresentados por escrito antes de qualquer compromisso.</p>
                <a className="contact-detail" href={`tel:+${COMPANY.phoneE164}`}><span><Phone size={19} /></span><span><small>Telefone / WhatsApp</small><strong>{COMPANY.phoneDisplay}</strong></span><ArrowUpRight size={16} /></a>
                <a className="contact-detail" href={`mailto:${COMPANY.email}`}><span><Mail size={19} /></span><span><small>E-mail</small><strong>{COMPANY.email}</strong></span><ArrowUpRight size={16} /></a>
                <div className="contact-detail contact-detail--static"><span><MapPin size={19} /></span><span><small>Base</small><strong>{COMPANY.city} · {COMPANY.state}</strong></span></div>
                <div className="contact-detail contact-detail--static"><span><Clock3 size={19} /></span><span><small>Área de atendimento</small><strong>{COMPANY.serviceArea}</strong></span></div>
                <div className="contact-info__notice"><span className="eyebrow eyebrow--mint">Smart ProEng</span><p>Engenharia consultiva para indústria, agro, construção, comércio e prestadores de serviços.</p></div>
              </div>
            </div>

            <div className="contact-form-card">
              {!sent ? <>
                <div className="contact-form-card__heading"><span className="eyebrow">Solicite um diagnóstico</span><h2>O que sua operação precisa resolver?</h2><p>Campos com * são obrigatórios.</p></div>
                <form onSubmit={onSubmit} className="contact-form">
                  <div className="form-row"><label>Nome *<input name="name" type="text" autoComplete="name" minLength={2} maxLength={120} required placeholder="Seu nome" /></label><label>E-mail *<input name="email" type="email" autoComplete="email" maxLength={254} required placeholder="voce@empresa.com.br" /></label></div>
                  <div className="form-row"><label>WhatsApp ou telefone<input name="phone" type="tel" autoComplete="tel" maxLength={32} placeholder="(00) 00000-0000" /></label><label>Empresa / operação<input name="organization" type="text" autoComplete="organization" maxLength={140} placeholder="Nome da empresa (opcional)" /></label></div>
                  <div className="form-row"><label>Cidade *<input name="city" type="text" autoComplete="address-level2" maxLength={120} required placeholder="Cidade e estado" /></label><label>Serviço de interesse *<select name="service" required defaultValue=""><option value="" disabled>Selecione uma frente</option>{SERVICES.map(service => <option key={service.slug} value={service.title}>{service.shortTitle}</option>)}<option value="Ainda não sei">Ainda não sei</option></select></label></div>
                  <label>Conte brevemente o que precisa resolver *<textarea name="message" rows={5} minLength={15} maxLength={3000} required placeholder="Descreva o contexto, a operação e o principal desafio." /></label>
                  <label className="honeypot" aria-hidden="true">Não preencha este campo<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
                  <label className="consent-check"><input type="checkbox" name="consent" required /><span>Li a <Link href="/privacidade">Política de Privacidade</Link> e estou ciente de que meus dados serão usados para responder a esta solicitação. *</span></label>
                  {formError && <p className="form-message form-message--error" role="alert">{formError}</p>}
                  <button className="button button--primary button--submit" type="submit" disabled={submit.isPending}>{submit.isPending ? "Enviando…" : "Enviar solicitação"}<ArrowUpRight size={17} /></button>
                  <p className="form-footnote">Não usamos este formulário para cadastrar você em listas de marketing.</p>
                </form>
              </> : <div className="form-success" role="status"><span><CheckCircle2 size={30} /></span><span className="eyebrow">Mensagem recebida</span><h2>Obrigado por compartilhar o contexto.</h2><p>A Smart ProEng recebeu sua solicitação. Se preferir, você também pode falar diretamente pelo WhatsApp.</p><PrimaryLink href="/">Voltar ao início</PrimaryLink></div>}
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}
