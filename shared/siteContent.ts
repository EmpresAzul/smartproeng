export const COMPANY = {
  brand: "Smart ProEng",
  tagline: "Inteligência em Gerenciamento de Projetos",
  legalName: "Smart ProEng Inteligência em Gerenciamento de Projetos na Engenharia Ltda",
  cnpj: "57.563.335/0001-35",
  city: "Primavera do Leste",
  state: "MT",
  region: "Mato Grosso",
  phoneDisplay: "(19) 98808-4232",
  phoneE164: "5519988084232",
  email: "smartproengbr@gmail.com",
  serviceArea: "Mato Grosso, com visitas técnicas a indústrias e fazendas",
} as const;

export const ENGINEER = {
  name: "Tiago Arré",
  title: "Engenheiro Eletricista",
  qualifications: [
    "Engenharia Elétrica",
    "Pós-graduação em Engenharia de Segurança do Trabalho",
    "Pós-graduação em Engenharia Ferroviária",
    "MBA em Gerenciamento de Projetos na Construção Civil",
  ],
  experience: [
    "Gerência de implantação de grandes obras, da infraestrutura à entrega final",
    "Gerenciamento e fiscalização de obras industriais",
    "Coordenação de equipes técnicas de instalação e manutenção de climatização industrial",
    "Implantação de sistemas e softwares em empresas",
    "Administração de empresas entre 2011 e 2024, nas áreas financeira, contábil e comercial",
  ],
} as const;

export const STATS = [
  { value: "13 anos", label: "administrando empresas, de 2011 a 2024" },
  { value: "4 formações", label: "em engenharia e gestão de projetos" },
  { value: "5 frentes", label: "de serviço que podem ser combinadas" },
  { value: "5 setores", label: "indústria, agro, construção, comércio e serviços" },
] as const;

export const PROBLEMS = [
  { title: "Instalação elétrica irregular", body: "Risco de multa, interdição, recusa da seguradora e acidente com a equipe." },
  { title: "Conta de energia alta", body: "Demanda mal contratada, multa por reativos e consumo sem acompanhamento." },
  { title: "Sinistro sem causa definida", body: "Incêndio ou equipamento queimado sem laudo técnico para apoiar a apuração." },
  { title: "Obra fora de prazo e orçamento", body: "Compras erradas, empreiteiros sem controle e desembolso sem planejamento." },
  { title: "Máquina parada na hora errada", body: "Manutenção só corretiva, custo desconhecido e perda de produção na safra." },
  { title: "Preço formado no olho", body: "Faturamento que não vira lucro e desconto sem conhecer o limite." },
] as const;

export const ELECTRICAL_LINES = [
  {
    title: "Laudos e conformidade elétrica",
    priority: "Prioritária",
    audience: "Indústrias, armazéns, agroindústrias e comércio",
    description: "Prontuário e laudos NR-10; laudos de SPDA e aterramento; adequação elétrica para alvará do Corpo de Bombeiros; regularização de instalações antigas sem projeto; áreas classificadas; plano de bloqueio e análise de riscos.",
  },
  {
    title: "Perícias e vistorias",
    priority: "Prioritária",
    audience: "Seguradoras, advogados, Justiça, fazendas e empresas",
    description: "Perícia de sinistros elétricos — incêndio, choque ou queima de equipamentos —, vistoria de risco para seguradora, laudo de recebimento de imóvel e investigação de falhas recorrentes. Perícias judiciais dependem de cadastro específico no tribunal.",
  },
  {
    title: "Elétrica para o agro",
    priority: "Prioritária",
    audience: "Fazendas, armazéns e cooperativas",
    description: "Instalações para aviários, salas de ordenha, silos, secadores e agroindústria; bombeamento, irrigação, motobombas, partida de motores, geradores e energia solar com baterias para áreas remotas.",
  },
  {
    title: "Redução de custo de energia",
    priority: "Prioritária",
    audience: "Indústrias, fazendas irrigadas e comércio de porte",
    description: "Análise de faturas, demanda contratada e fator de potência; estudo de viabilidade de mercado livre e geração solar; retrofit de iluminação, qualidade de energia e medição da economia obtida. Regras e viabilidade dependem de análise atualizada do caso.",
  },
  {
    title: "Projetos e estudos",
    priority: "Sob demanda",
    audience: "Indústrias, construtoras e fazendas",
    description: "Projetos de baixa e média tensão, painéis e CCM, subestações, estudos de curto-circuito, proteção e seletividade.",
  },
  {
    title: "Automação e redes",
    priority: "Sob demanda",
    audience: "Indústrias, comércio e fazendas",
    description: "Automação, redes industriais, cabeamento estruturado, CFTV e controle de acesso.",
  },
] as const;

export const SERVICES = [
  {
    number: "01",
    slug: "engenharia-eletrica",
    title: "Consultoria em engenharia elétrica",
    shortTitle: "Engenharia elétrica",
    description: "Instalações seguras, regulares e econômicas. Engenharia elétrica e segurança do trabalho em uma visão técnica integrada.",
    objective: "Deixar as instalações elétricas seguras, regulares e econômicas.",
    audience: "Indústrias, fazendas, armazéns, agroindústrias, seguradoras e comércio.",
    problem: "Multas, interdição, sinistros, falhas elétricas e conta de energia alta.",
    formats: ["Laudo ou perícia avulsa", "Estudo ou projeto", "Contrato de acompanhamento"],
    deliverables: ["Laudos e conformidade", "Perícias e vistorias", "Elétrica para o agro", "Redução do custo de energia"],
    note: "Projetos e estudos de baixa e média tensão, painéis/CCM, automação, redes industriais e CFTV também podem ser atendidos sob demanda.",
  },
  {
    number: "02",
    slug: "gerenciamento-de-obras",
    title: "Consultoria e gerenciamento de obras",
    shortTitle: "Gerenciamento de obras",
    description: "Representação técnica do dono da obra, com acompanhamento de prazo, custo e qualidade junto a construtoras e fornecedores.",
    objective: "Apoiar a entrega da obra dentro do prazo e do custo previstos, representando o dono.",
    audience: "Pessoas e empresas construindo ou reformando e operações industriais.",
    problem: "Obra sem planejamento, estouro de orçamento, compras erradas e descontrole de empreiteiros.",
    formats: ["Planejamento inicial antes do início da obra", "Gerenciamento completo do início à entrega", "Diagnóstico e plano de recuperação de obra em andamento"],
    deliverables: ["Cronograma, etapas e marcos de entrega", "Orçamento e planejamento físico-financeiro", "Cotações, mapa comparativo e programação de compras", "Contratação, medição e pagamento de empreiteiros", "Relatórios periódicos com fotos e pendências", "Acompanhamento dos requisitos de segurança do trabalho no canteiro"],
    note: "O cliente continua contratando construtora e fornecedores; o escopo é definido antes do compromisso.",
  },
  {
    number: "03",
    slug: "gestao-de-ativos",
    title: "Gestão de ativos e manutenção",
    shortTitle: "Ativos e manutenção",
    description: "Rotinas preditivas, preventivas e corretivas com custos medidos e indicadores para fazendas e indústrias.",
    objective: "Organizar a manutenção e tornar custos e indicadores mais confiáveis para a gestão.",
    audience: "Fazendas e indústrias.",
    problem: "Máquina parada, perda de produtividade, corretivas recorrentes e custo de manutenção desconhecido.",
    formats: ["Diagnóstico da situação atual e do custo das paradas", "Implantação do planejamento e controle da manutenção", "Acompanhamento mensal de indicadores e plano de ação"],
    deliverables: ["Cadastro de máquinas e equipamentos por criticidade", "Planos de manutenção por equipamento", "Fluxo de ordens de serviço e programação semanal", "Custo por máquina e por hora trabalhada", "Indicadores de disponibilidade, falhas e tempo de reparo"],
    note: "A estrutura é organizada conforme os ativos, a operação e as informações disponíveis no cliente.",
  },
  {
    number: "04",
    slug: "precificacao",
    title: "Precificação e ponto de equilíbrio",
    shortTitle: "Precificação",
    description: "Consultoria com ferramenta online baseada nos números reais do negócio para apoiar decisões de preço e margem.",
    objective: "Ajudar o empresário a entender a margem por produto ou serviço e quanto precisa vender por mês.",
    audience: "Pequenos negócios como lojas, vidraçarias, instaladoras, oficinas e pequenas empreiteiras.",
    problem: "Preço formado no olho, faturamento sem lucro e descontos sem critério.",
    formats: ["Implantação com acesso à plataforma por 12 meses", "Implantação com acompanhamento mensal"],
    deliverables: ["Levantamento de custos fixos e variáveis", "Margem por produto e serviço", "Preço mínimo e recomendado por item", "Ponto de equilíbrio mensal", "Suporte para dúvidas durante o período contratado"],
    note: "A análise parte dos dados fornecidos e validados com o negócio; não substitui a contabilidade da empresa.",
  },
  {
    number: "05",
    slug: "software-sob-medida",
    title: "Software sob medida",
    shortTitle: "Software sob medida",
    description: "Sistemas para engenharia, negócios e indústrias adaptados ao processo do cliente, com consultoria e suporte próximo.",
    objective: "Conectar operação e desenvolvimento para que o sistema se ajuste ao processo da empresa.",
    audience: "Empresas de engenharia, negócios e indústrias.",
    problem: "Sistemas que não se adaptam, controles em planilha e falta de suporte próximo.",
    formats: ["Especificação com escopo e preço fechados", "Desenvolvimento e implantação", "Suporte mensal"],
    deliverables: ["Mapeamento do processo e especificação do sistema", "Gestão do desenvolvimento com entregas parciais", "Carga de dados e treinamento da equipe", "Suporte e evolução contínua"],
    note: "O desenvolvimento é feito com parceiro programador, com escopo e entregas alinhados ao cliente.",
  },
] as const;

export const WORK_STEPS = [
  { number: "01", title: "Diagnóstico", body: "Conversa e, quando necessário, visita técnica para entender a situação e medir o problema." },
  { number: "02", title: "Proposta", body: "Escopo, entregas, prazo e investimento apresentados por escrito." },
  { number: "03", title: "Execução", body: "Trabalho realizado conforme o escopo contratado, com relatórios de andamento." },
  { number: "04", title: "Entrega", body: "Laudo, plano ou sistema entregue e explicado em linguagem de gestor, com acompanhamento quando contratado." },
] as const;

export const PAGE_SEO = {
  "/": {
    title: "Smart ProEng | Engenharia e Gestão em MT",
    description: "Engenharia consultiva para controlar custo, prazo e risco. Laudos elétricos, obras, manutenção, precificação e sistemas sob medida em Mato Grosso.",
    keywords: "Smart ProEng, engenharia consultiva, gerenciamento de projetos, engenharia elétrica, Mato Grosso",
    heading: "Engenharia que controla custo, prazo e risco.",
    intro: "Laudos e perícias elétricas, gerenciamento de obras, gestão de manutenção, precificação e sistemas sob medida para operações que precisam decidir com números.",
    eyebrow: "Engenharia consultiva · Primavera do Leste, MT",
    link: "/portfolio",
    linkLabel: "Conheça as cinco frentes de serviço",
    index: true,
  },
  "/sobre": {
    title: "Sobre Tiago Arré | Smart ProEng",
    description: "Conheça o Engenheiro Tiago Arré, sua formação em engenharia e projetos e a experiência que fundamenta a Smart ProEng em Mato Grosso.",
    keywords: "Tiago Arré, Smart ProEng, engenheiro eletricista, engenharia de segurança, gerenciamento de projetos",
    heading: "Técnica de engenheiro. Visão de quem já administrou empresa.",
    intro: "O Eng. Tiago Arré reúne engenharia elétrica, segurança do trabalho, gestão de projetos e experiência prática em obras e administração empresarial.",
    eyebrow: "Sobre o Eng. Tiago Arré",
    link: "/contato",
    linkLabel: "Converse com a Smart ProEng",
    index: true,
  },
  "/portfolio": {
    title: "Serviços de Engenharia | Smart ProEng",
    description: "Conheça as cinco frentes da Smart ProEng: engenharia elétrica, obras, manutenção, precificação e software sob medida.",
    keywords: "serviços de engenharia, laudos elétricos, gerenciamento de obras, manutenção industrial, precificação",
    heading: "Cinco frentes. Uma gestão integrada.",
    intro: "Conheça os escopos, entregáveis e formas de contratação da Smart ProEng. Cada frente pode ser contratada sozinha ou combinada.",
    eyebrow: "Portfólio de serviços",
    link: "/contato",
    linkLabel: "Solicite um diagnóstico",
    index: true,
  },
  "/contato": {
    title: "Contato e Diagnóstico | Smart ProEng MT",
    description: "Conte à Smart ProEng sobre sua operação e o que precisa resolver. A primeira conversa ajuda a indicar o serviço e o escopo adequados.",
    keywords: "contato Smart ProEng, diagnóstico de engenharia, orçamento de engenharia, Primavera do Leste, Mato Grosso",
    heading: "Conte o problema. Vamos entender o cenário.",
    intro: "Informe o tipo de operação, a cidade e o que precisa resolver. A primeira conversa serve para entender a situação e indicar o serviço adequado.",
    eyebrow: "Fale com a equipe",
    link: "/portfolio",
    linkLabel: "Veja os serviços",
    index: true,
  },
  "/privacidade": {
    title: "Política de Privacidade | Smart ProEng",
    description: "Saiba quais dados a Smart ProEng recebe pelo site, para quais finalidades são tratados e como exercer seus direitos de titular.",
    keywords: "política de privacidade, LGPD, dados pessoais, Smart ProEng, direitos do titular",
    heading: "Política de Privacidade",
    intro: "Esta política explica o tratamento dos dados enviados pelo site e os canais disponíveis para solicitações relacionadas à privacidade.",
    eyebrow: "Privacidade e transparência",
    link: "/contato",
    linkLabel: "Fale conosco sobre seus dados",
    index: true,
  },
  "/termos": {
    title: "Termos de Uso do Site | Smart ProEng",
    description: "Consulte as condições de uso do site Smart ProEng e as informações gerais sobre os serviços e conteúdos publicados.",
    keywords: "termos de uso, Smart ProEng, serviços de engenharia, conteúdo do site, condições de uso",
    heading: "Termos de Uso",
    intro: "Estes termos regulam a navegação no site institucional da Smart ProEng e o uso das informações e canais de contato disponibilizados.",
    eyebrow: "Condições de uso",
    link: "/contato",
    linkLabel: "Entre em contato",
    index: true,
  },
  "/cookies": {
    title: "Política de Cookies | Smart ProEng",
    description: "Entenda os cookies e recursos de armazenamento usados no site Smart ProEng e como ajustar suas preferências.",
    keywords: "política de cookies, consentimento, privacidade, armazenamento local, Smart ProEng",
    heading: "Política de Cookies",
    intro: "Saiba como o site utiliza armazenamento essencial e como suas preferências de cookies opcionais são gerenciadas.",
    eyebrow: "Preferências de navegação",
    link: "/privacidade",
    linkLabel: "Leia a Política de Privacidade",
    index: true,
  },
  "/admgerencia": {
    title: "Área do Engenheiro | Smart ProEng",
    description: "Área administrativa privada da Smart ProEng.",
    keywords: "",
    heading: "Área administrativa da Smart ProEng",
    intro: "Acesso restrito ao responsável autorizado. Faça login para consultar mensagens enviadas pelo formulário do site.",
    eyebrow: "Área restrita",
    link: "/",
    linkLabel: "Voltar ao site",
    index: false,
  },
} as const;

export type PublicPagePath = keyof typeof PAGE_SEO;

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const clean = pathname.replace(/\/+$/, "");
  return clean || "/";
}
