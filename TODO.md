# Smart ProEng — entregáveis do projeto

## Direção visual atual

- A logo continua como referência: azul-marinho profundo, azul-lavanda, branco e verde-água; o amarelo do mockup antigo não integra a paleta principal.
- Linguagem visual de cinema documental de engenharia: fotografia ampla com profundidade e luz de recorte, fundos em camadas, composição editorial e halos discretos. Overlays calibrados para manter leitura sem esconder as fotos; Sora em headlines e Montserrat em texto.
- Fotografias são ilustrativas, não retratos do Eng. Tiago Arré nem evidência de obras, clientes ou projetos executados pela Smart ProEng.

## Resultados anteriores — já verificados

- [x] **GitHub conectado antes da construção.** Repositório privado canônico `EmpresAzul/smartproeng`; scaffold confirmado no `main` antes da primeira implementação.
- [x] **Conteúdo institucional organizado.** Home, Sobre, Portfólio e Contato preservam os fatos dos PDFs, sem inventar clientes, resultados, cases ou registro profissional. O PDF deixa o registro como `[CREA a preencher]`; o site não atribui responsabilidade técnica nem promete assinatura profissional.
- [x] **Interface responsiva e marca.** Paleta da logo, Sora/Montserrat locais, CTAs em gradiente, transições, foco e redução de movimento já implementados.
- [x] **Formulário de contato.** Solicitações são validadas e armazenadas no banco gerenciado; parâmetros UTM acompanham a jornada e ficam ligados à solicitação.
- [x] **Painel de mensagens.** `/admgerencia` tem autorização no servidor, lista paginada, estados, busca e exclusão confirmada; acesso anônimo à API foi negado.
- [x] **Privacidade/cookies.** Rodapé contém `/privacidade`, `/termos` e `/cookies`; o aviso aceita, recusa ou personaliza categorias opcionais. As páginas legais estão identificadas como minutas para validação; analytics de plataforma e pixels de terceiros não estão conectados.
- [x] **Qualidade técnica anterior.** Typecheck, testes e build passaram; smoke test verificou rotas, 404 real, metadados e painel `noindex`.

## Pedido atual — estado da implementação

- [x] **Remover login externo visível.** O fluxo OAuth antigo e seus componentes sem uso foram removidos; `/admgerencia` mostra e-mail/senha da empresa. Páginas públicas, menu e painel não exibem botão ou rótulo de login externo. O badge da plataforma permanece oculto.
- [x] **Manter o painel protegido.** Senha validada no servidor, cookie próprio `HttpOnly`, `Secure`, `SameSite=None`, sessão curta vinculada à origem, proteção de origem nas mutações, limite de tentativas e logout; testes de login e tentativas cross-origin não gravam dados reais.
- [~] **Verificação da credencial no runtime.** O segredo foi cadastrado pelo cartão seguro. O processo local de desenvolvimento não recebeu `SMARTPROENG_ADMIN_PASSWORD`; o endpoint falha fechado com HTTP 412. A senha real não foi lida nem copiada. Ainda é necessário validar a variável no runtime que atende o Preview ou a publicação.
- [x] **Fotografia da Home.** O fundo de chão de fábrica foi removido e substituído por uma foto noturna de cidade e ponte de Julius Carmine / Unsplash, otimizada e creditada. A página esclarece que a cena de Tianjin não representa obra ou local da Smart ProEng.
- [x] **Fotografia de Sobre.** A página Sobre tem uma foto de contexto profissional com legenda explícita: a imagem não retrata Tiago Arré nem representa obra da Smart ProEng.
- [x] **Fotografia do Portfólio.** A foto anterior foi substituída por uma imagem licenciada de ponte em construção, sem lettering incorreto embutido; o hero esclarece que a foto é ilustrativa e não apresenta um case da empresa.
- [x] **Overlays de todo o site.** Opacidade reduzida nos fundos da Home, Portfólio e Contato; blur da Home removido e painel informativo mais translúcido. Texto, CTAs e formulário seguem legíveis em desktop e celular.
- [x] **Créditos/licenças.** Autores e URLs de origem estão em `ASSET_CREDITS.md`; fotos foram reduzidas e convertidas para WebP antes do upload ao armazenamento do projeto.
- [x] **Responsividade preservada.** Menu, CTAs, formulário, UTMs, consentimento, tipografia, acessibilidade e redução de movimento seguem funcionais.
- [x] **Validação visual/técnica.** `pnpm check`, `pnpm test` (16 testes), `pnpm build` e `git diff --check` passaram; capturas de desktop e 375 px mostram as fotos e mantêm títulos, CTAs e formulário legíveis. O build emite apenas a advertência informativa do Vite para `/api/client-config.js`.
- [x] **Background novo da Home.** O hero agora usa uma fotografia urbana licenciada de ponte e skyline, com composição cinematográfica navy e espaço para headline/CTA, sem chão de fábrica.
- [x] **Hero cinematográfico em Sobre e Contato.** O primeiro bloco das duas páginas segue a estrutura full-bleed do Portfólio. Sobre usa a foto já creditada; Contato usa o fundo técnico armazenado no projeto. Capturas desktop e mobile confirmaram legibilidade; o formulário, avisos e campos foram preservados.
- [x] **Atualizar GitHub.** As alterações estão prontas para integrar ao `main` com avanço fast-forward, sem sobrescrever commits; imagens e créditos estão versionados. A autopublicação está ativada e pode ser iniciada pelo checkpoint.

## Novo pedido — legibilidade, navegação e polimento visual

- [x] **Eliminar o flash sem estilo.** Aplicado CSS crítico no HTML inicial para que o snapshot SEO apareça já com estilo antes de carregar React/CSS; o fallback global acompanha o mesmo visual e some quando o app renderiza. Rotas públicas e administrativas foram verificadas no HTML inicial servido.
- [x] **Legibilidade das descrições.** Aumentadas descrições e textos corridos em todas as páginas públicas e no painel; o texto escurece em superfícies claras e permanece claro/contrastante em superfícies escuras, preservando Sora nos títulos e Montserrat nos textos. Capturas desktop e mobile revisadas.
- [x] **Navegação no topo.** Mudança de rota agora leva imediatamente ao topo, preservando URLs com hash/âncora.
- [x] **Ícones.** Adicionadas profundidade 3D, sombras coloridas vívidas e movimento sutil aos ícones; `prefers-reduced-motion` é respeitado e o ícone de carregamento mantém sua animação própria.
- [x] **Cards.** Cards receberam sombra, elevação responsiva no hover e pulso ao pressionar; foco permanece visível e a checagem visual desktop/mobile foi aprovada.
- [x] **Verificar e sincronizar.** `pnpm check`, `pnpm test` (16 testes), `pnpm build`, validação do HTML crítico, capturas desktop/mobile e `git diff --check` passaram; esta versão será integrada ao `main` via avanço fast-forward e o checkpoint será confirmado, sem force-push ou substituição de histórico.

## Estado de publicação e arquivos do proprietário

- `publishing.auto_publish` está **ativado**; um checkpoint aceito em `main` pode disparar publicação automática. A conclusão deve ser consultada no Dashboard; não presumir que o site já está publicado.
- As instruções do proprietário também descrevem hospedagem externa/cPanel em `smartproeng.spweb.digital`. O arquivo `napoleon.zip` e os demais guias do proprietário foram preservados, sem reconstrução nesta etapa.
- Antes das campanhas pagas, permanecem pendentes: confirmar CREA/UF e atribuições, aprovar as minutas legais, validar subprocessadores/retenção, confirmar o domínio público, decidir tags opcionais e medir PageSpeed real (a escala oficial máxima é 100).
