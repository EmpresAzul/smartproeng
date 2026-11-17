import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, ArrowUpRight, Inbox, LogOut, RefreshCw, Search, ShieldCheck, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { COMPANY } from "@shared/siteContent";
import Seo from "@/components/Seo";
import SiteLayout from "@/components/SiteLayout";
import { trpc } from "@/lib/trpc";

type MessageStatus = "new" | "in_progress" | "responded";
const STATUS_LABEL: Record<MessageStatus, string> = { new: "Nova", in_progress: "Em atendimento", responded: "Respondida" };

function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? "Data indisponível" : new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default function Admin() {
  const me = trpc.auth.me.useQuery();
  const isAdmin = me.data?.role === "admin";
  const utils = trpc.useUtils();
  const [email, setEmail] = useState<string>(COMPANY.email);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: () => {
      setPassword("");
      setLoginError("");
      window.location.assign("/admgerencia");
    },
    onError: error => {
      const code = error.data?.code;
      setLoginError(code === "TOO_MANY_REQUESTS"
        ? "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente."
        : code === "PRECONDITION_FAILED"
          ? error.message
          : "E-mail ou senha inválidos. Confira os dados e tente novamente.");
      setPassword("");
    },
  });
  const messages = trpc.admin.listMessages.useInfiniteQuery({ cursor: null }, {
    enabled: isAdmin,
    getNextPageParam: lastPage => lastPage.nextCursor,
  });
  const statusMutation = trpc.admin.updateStatus.useMutation({ onSuccess: () => utils.admin.listMessages.invalidate() });
  const deleteMutation = trpc.admin.deleteMessage.useMutation({ onSuccess: () => utils.admin.listMessages.invalidate() });
  const logoutMutation = trpc.auth.logout.useMutation({ onSuccess: () => { void utils.auth.me.invalidate(); window.location.reload(); } });
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const loadedMessages = useMemo(() => messages.data?.pages.flatMap(page => page.items) ?? [], [messages.data]);
  const visibleMessages = useMemo(() => loadedMessages.filter(message => {
    const term = filter.trim().toLocaleLowerCase("pt-BR");
    const searchMatch = !term || [message.name, message.email, message.organization ?? "", message.city, message.service, message.message].some(value => value.toLocaleLowerCase("pt-BR").includes(term));
    return searchMatch && (statusFilter === "all" || message.status === statusFilter);
  }), [loadedMessages, filter, statusFilter]);

  function onLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError("");
    loginMutation.mutate({ email, password });
  }

  return <SiteLayout><Seo path="/admgerencia" /><main className="admin-page"><div className="container">
    <div className="admin-topline"><Link href="/" className="admin-back"><ArrowLeft size={15} /> Voltar ao site</Link><span className="admin-secure"><ShieldCheck size={15} /> Área privada</span></div>
    {me.isLoading ? <div className="admin-state"><span className="eyebrow">Smart ProEng</span><h1>Verificando acesso…</h1><p>Aguarde enquanto confirmamos sua sessão.</p></div> : !isAdmin ? <section className="admin-login-card"><span className="admin-login-card__icon"><ShieldCheck size={25} /></span><span className="eyebrow">Acesso restrito</span><h1>Mensagens do site, em um só lugar.</h1><p>Entre com o e-mail e a senha autorizados para consultar os contatos recebidos pela Smart ProEng. O acesso está vinculado a <strong>{COMPANY.email}</strong>.</p>
      <form className="admin-login-form" onSubmit={onLogin}>
        <label className="admin-login-field">E-mail de acesso<input type="email" name="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} maxLength={254} required /></label>
        <label className="admin-login-field">Senha<input type="password" name="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} maxLength={1024} required /></label>
        {loginError && <p className="admin-login-error" role="alert">{loginError}</p>}
        <button className="button button--primary admin-login-submit" type="submit" disabled={loginMutation.isPending}>{loginMutation.isPending ? "Verificando…" : "Entrar no painel"}<ArrowUpRight size={16} /></button>
      </form>
      <small>Autenticação e autorização são verificadas no servidor em cada solicitação. A sessão expira automaticamente.</small>
    </section> : <>
      <div className="admin-heading"><div><span className="eyebrow">Painel do Engenheiro</span><h1>Mensagens recebidas</h1><p>Consultas enviadas pelo formulário de contato da Smart ProEng.</p></div><button className="button button--line" onClick={() => void messages.refetch()} disabled={messages.isFetching}><RefreshCw size={15} className={messages.isFetching ? "spin" : ""} /> Atualizar</button></div>
      <div className="admin-summary"><div><span className="admin-summary__icon"><Inbox size={18} /></span><span><strong>{loadedMessages.length}</strong><small>mensagens carregadas</small></span></div><div><span className="admin-summary__icon admin-summary__icon--mint"><span className="status-dot" /></span><span><strong>{loadedMessages.filter(item => item.status === "new").length}</strong><small>novas</small></span></div><button className="admin-logout" onClick={() => logoutMutation.mutate()} disabled={logoutMutation.isPending}><LogOut size={15} /> Sair</button></div>
      <div className="admin-filters"><label className="admin-search"><Search size={17} /><input aria-label="Buscar mensagens" value={filter} onChange={event => setFilter(event.target.value)} placeholder="Buscar por nome, serviço ou cidade…" /></label><select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} aria-label="Filtrar por status"><option value="all">Todos os status</option><option value="new">Novas</option><option value="in_progress">Em atendimento</option><option value="responded">Respondidas</option></select></div>
      {messages.isLoading ? <div className="admin-state"><p>Carregando mensagens…</p></div> : messages.error ? <div className="admin-state admin-state--error"><h2>Não foi possível carregar as mensagens.</h2><p>Tente novamente em instantes.</p><button className="button button--line" onClick={() => void messages.refetch()}>Tentar novamente</button></div> : visibleMessages.length === 0 ? <div className="admin-empty"><Inbox size={28} /><h2>{loadedMessages.length ? "Nenhum resultado para este filtro." : "Ainda não há mensagens."}</h2><p>{loadedMessages.length ? "Altere o filtro ou a busca." : "As solicitações enviadas pela página Contato aparecerão aqui."}</p></div> : <div className="admin-message-list">{visibleMessages.map(message => <article className="admin-message" key={message.id}><div className="admin-message__head"><div><span className={`message-status message-status--${message.status}`}>{STATUS_LABEL[message.status as MessageStatus] ?? "Nova"}</span><time>{formatDate(message.createdAt)}</time></div><button className="admin-delete" aria-label={`Excluir mensagem de ${message.name}`} title="Excluir mensagem" onClick={() => { if (window.confirm(`Excluir permanentemente a mensagem enviada por ${message.name}?`)) deleteMutation.mutate({ id: message.id }); }} disabled={deleteMutation.isPending}><Trash2 size={16} /></button></div><div className="admin-message__person"><h2>{message.name}</h2><span>{message.city}{message.organization ? ` · ${message.organization}` : ""}</span></div><p className="admin-message__service">Interesse: <strong>{message.service}</strong></p><p className="admin-message__body">{message.message}</p><div className="admin-message__contact"><a href={`mailto:${message.email}`}>{message.email}</a>{message.phone && <a href={`tel:${message.phone.replace(/[^\d+]/g, "")}`}>{message.phone}</a>}</div><div className="admin-message__bottom"><div className="admin-attribution">{message.utmSource && <span>Origem: {message.utmSource}</span>}{message.utmCampaign && <span>Campanha: {message.utmCampaign}</span>}</div><label className="status-select"><span>Status</span><select value={message.status} onChange={event => statusMutation.mutate({ id: message.id, status: event.target.value as MessageStatus })} aria-label={`Status da mensagem de ${message.name}`}><option value="new">Nova</option><option value="in_progress">Em atendimento</option><option value="responded">Respondida</option></select></label></div></article>)}</div>}
      {messages.hasNextPage && <div style={{ display: "flex", justifyContent: "center", margin: "24px 0" }}><button className="button button--line" onClick={() => void messages.fetchNextPage()} disabled={messages.isFetchingNextPage}>{messages.isFetchingNextPage ? "Carregando…" : "Carregar mensagens anteriores"}</button></div>}
      <p className="admin-data-note">As mensagens são dados pessoais. Acesse apenas quando necessário, evite compartilhá-las fora da equipe autorizada e remova registros quando já não forem necessários.</p>
    </>}
  </div></main></SiteLayout>;
}
