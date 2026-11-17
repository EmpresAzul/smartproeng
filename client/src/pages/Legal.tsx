import { Link } from "wouter";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { COMPANY } from "@shared/siteContent";
import Seo from "@/components/Seo";
import SiteLayout from "@/components/SiteLayout";

const UPDATED = "17 de novembro de 2026";

function LegalFrame({ path, title, intro, children }: { path: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <SiteLayout>
      <Seo path={path} />
      <main className="legal-page">
        <header className="legal-hero">
          <div className="container">
            <span className="eyebrow"><ShieldCheck size={15} /> Transparência e confiança</span>
            <h1>{title}</h1>
            <p>{intro}</p>
            <span className="legal-updated">Última atualização: {UPDATED}</span>
          </div>
        </header>
        <article className="container legal-content">
          <aside className="legal-review-note" role="note">
            <strong>Minuta para validação.</strong> Antes da publicação, a Smart ProEng deve confirmar os prazos de retenção, os subprocessadores e a região de armazenamento ou eventuais transferências internacionais aplicáveis, e aprovar a redação final.
          </aside>
          {children}
          <div className="legal-back"><Link href="/contato"><ArrowLeft size={15} /> Fale com a Smart ProEng sobre seus dados</Link></div>
        </article>
      </main>
    </SiteLayout>
  );
}

export function PrivacyPage() {
  return <LegalFrame path="/privacidade" title="Política de Privacidade" intro="Esta política explica como a Smart ProEng trata os dados pessoais enviados pelos canais deste site e como você pode exercer seus direitos.">
    <section><h2>1. Quem trata os dados</h2><p>O controlador informado para este site é <strong>{COMPANY.legalName}</strong>, CNPJ {COMPANY.cnpj}, com base em {COMPANY.city}, {COMPANY.state}. Para assuntos de privacidade, escreva para <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p></section>
    <section><h2>2. Dados que podem ser recebidos</h2><p>Quando você preenche o formulário, recebemos os campos que você envia: nome, e-mail, telefone (se informado), empresa/operação (se informada), cidade, serviço de interesse e mensagem. Se a URL de entrada contiver parâmetros de campanha (UTM), eles podem acompanhar o link até o formulário e ser associados à solicitação para identificar a origem comercial.</p><p>O servidor também pode processar temporariamente dados técnicos de conexão, como o endereço IP, para limitar abuso do formulário; esse dado não é gravado pelo aplicativo no registro da mensagem. Os fornecedores de hospedagem podem processar informações técnicas necessárias à entrega e à segurança do serviço.</p><p>Não solicitamos documentos pessoais, dados sensíveis ou informações que não sejam necessárias para entender e responder ao contato.</p></section>
    <section><h2>3. Finalidades e fundamento do tratamento</h2><ul><li>Responder ao seu contato e compreender a necessidade apresentada;</li><li>Preparar, quando solicitado, o escopo de uma conversa ou proposta de serviço;</li><li>Proteger o formulário contra envios automatizados e abusos;</li><li>Manter o funcionamento e a segurança da área administrativa.</li></ul><p>Os dados do formulário são tratados para atender à solicitação do titular e, quando aplicável, para procedimentos preliminares relacionados a contrato, além de outras hipóteses legais pertinentes previstas na Lei nº 13.709/2018 (LGPD). O aceite de ciência no formulário não é usado como autorização para marketing.</p></section>
    <section><h2>4. Compartilhamento e publicidade</h2><p>Os dados enviados não são vendidos nem usados para criar listas de publicidade. Para operar o site e armazenar mensagens, a Smart ProEng utiliza fornecedores de hospedagem, armazenamento e serviços técnicos. A empresa deve confirmar nos termos vigentes desses fornecedores os subprocessadores, a região de armazenamento e eventual transferência internacional aplicável. No estado atual do site, analytics de plataforma e tags/pixels de publicidade não são carregados.</p><p>Se forem adicionadas ferramentas de medição ou publicidade no futuro, esta política e as preferências de cookies deverão ser atualizadas antes de ativar os recursos pertinentes.</p></section>
    <section><h2>5. Armazenamento e segurança</h2><p>As mensagens são armazenadas em banco de dados da aplicação e ficam acessíveis pelo painel privado somente a usuários autorizados. São adotadas medidas técnicas compatíveis com o risco, incluindo autenticação por senha, controle de acesso no servidor e tráfego protegido por HTTPS na publicação. Nenhum sistema conectado à internet pode ser descrito como absolutamente livre de risco.</p><p>Os dados são mantidos pelo período necessário para responder à solicitação e cumprir obrigações aplicáveis; depois, devem ser excluídos ou anonimizados, salvo hipótese legal que justifique conservação. A política operacional de prazos específicos pode ser detalhada pela empresa conforme os tipos de contratação e obrigações efetivamente aplicáveis.</p></section>
    <section><h2>6. Seus direitos</h2><p>Nos termos da LGPD, você pode solicitar confirmação do tratamento, acesso, correção, anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade, informações sobre compartilhamento, portabilidade quando aplicável, revogação de consentimento e revisão de decisões automatizadas quando cabível. Envie seu pedido para <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>; a Smart ProEng poderá solicitar informações razoáveis para confirmar sua identidade e proteger terceiros.</p></section>
    <section><h2>7. Atualizações e contato</h2><p>Esta política pode ser atualizada para refletir mudanças no site, nos serviços ou na legislação. Consulte a data no início da página. Para dúvidas ou solicitações relacionadas aos dados pessoais, use o e-mail informado nesta página.</p></section>
  </LegalFrame>;
}

export function TermsPage() {
  return <LegalFrame path="/termos" title="Termos de Uso" intro="Estes termos descrevem as condições de navegação no site institucional e o caráter informativo dos conteúdos disponibilizados pela Smart ProEng.">
    <section><h2>1. Sobre o site</h2><p>Este site apresenta a Smart ProEng, suas áreas de atuação e canais para solicitar contato. A empresa informada é {COMPANY.legalName}, CNPJ {COMPANY.cnpj}, com base em {COMPANY.city}, {COMPANY.state}.</p></section>
    <section><h2>2. Conteúdo informativo e serviços</h2><p>As informações do site são gerais e não constituem, por si só, laudo, projeto, perícia, parecer técnico, proposta comercial ou garantia de resultado. A adequação de um serviço depende da análise do caso, dos dados disponibilizados e do escopo acordado por escrito.</p><p>O envio de formulário ou mensagem não firma contrato nem substitui a formalização de escopo, entregas, prazos e condições. Resultados, economia ou desempenho não são garantidos sem análise específica e sem instrumento contratual aplicável.</p></section>
    <section><h2>3. Uso permitido</h2><p>Você se compromete a usar o site de forma lícita, não tentar acessar áreas restritas sem autorização, não interferir em sua disponibilidade e não enviar conteúdo ilegal, enganoso ou que viole direitos de terceiros.</p></section>
    <section><h2>4. Propriedade intelectual e links externos</h2><p>Os textos, identidade visual e elementos próprios do site pertencem à Smart ProEng ou são usados com autorização. Marcas e serviços de terceiros permanecem de seus respectivos titulares. Links para serviços externos, como e-mail e WhatsApp, estão sujeitos às condições desses serviços; a Smart ProEng não controla suas políticas ou disponibilidade.</p></section>
    <section><h2>5. Disponibilidade e mudanças</h2><p>O conteúdo pode ser corrigido ou atualizado. A Smart ProEng busca manter o site disponível e correto, mas não garante acesso ininterrupto nem ausência de falhas técnicas. Na máxima extensão permitida pela legislação, o uso das informações deve considerar o contexto e a análise profissional adequada ao caso concreto.</p></section>
    <section><h2>6. Privacidade e contato</h2><p>O tratamento de dados pessoais é explicado na <Link href="/privacidade">Política de Privacidade</Link>. Para dúvidas sobre estes termos, entre em contato pelo e-mail <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.</p></section>
    <section><h2>7. Alterações destes termos</h2><p>Estes termos podem ser atualizados quando houver mudanças relevantes no site ou nos serviços. A versão em vigor é a publicada nesta página, identificada pela data de atualização.</p></section>
  </LegalFrame>;
}

export function CookiesPage() {
  return <LegalFrame path="/cookies" title="Política de Cookies" intro="Veja quais recursos de armazenamento são necessários e como controlar categorias opcionais neste site.">
    <section><h2>1. O que são cookies e armazenamento local</h2><p>Cookies são pequenos arquivos guardados pelo navegador. O navegador também oferece armazenamento local, que pode manter preferências no próprio dispositivo sem criar um cookie de servidor. Este site distingue recursos estritamente necessários de analytics e marketing opcionais.</p></section>
    <section><h2>2. Recursos necessários</h2><p>Para manter o login no painel administrativo, o site usa um cookie próprio de autenticação com validade máxima de até oito horas, encerrado no logout. O cookie é HttpOnly, Secure e usado somente para manter a sessão protegida; não é usado para publicidade.</p><p>As preferências de cookies escolhidas neste aviso são guardadas no armazenamento local do navegador. O formulário público de contato não exige login nem cria um cookie de publicidade.</p></section>
    <section><h2>3. Analytics e marketing</h2><p>Analytics e marketing são categorias opcionais e ficam desligados por padrão. Na configuração atual, o analytics de plataforma foi desativado e não há pixels ou tags de publicidade conectados. Escolher uma categoria não ativa uma ferramenta que ainda não tenha sido instalada; se forem adicionadas no futuro, só deverão ser carregadas de acordo com a preferência registrada e após atualização desta política.</p></section>
    <section><h2>4. Como alterar sua escolha</h2><p>Use o link “Preferências de cookies” no rodapé para reabrir o painel e salvar outra escolha. Você também pode apagar os dados do site nas configurações do navegador. Desativar recursos estritamente necessários pode impedir o funcionamento seguro do painel administrativo.</p><p>O aviso permite aceitar categorias opcionais, recusá-las ou personalizá-las. A recusa não impede a navegação pelas páginas públicas nem o envio de uma solicitação de contato.</p></section>
    <section><h2>5. Contato</h2><p>Para dúvidas sobre cookies ou dados pessoais, escreva para <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Consulte também a <Link href="/privacidade">Política de Privacidade</Link>.</p></section>
  </LegalFrame>;
}
