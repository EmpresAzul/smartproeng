# Smart ProEng — entregáveis do projeto

## Direção visual aplicada

- Identidade inspirada pela logo fornecida: azul-marinho profundo como base, azul-lavanda e branco na marca, verde-água como acento e superfícies claras de apoio. A logo é a referência de cor, não o amarelo do mockup antigo do PDF.
- Linguagem visual de editorial técnico: composição assimétrica, linhas e grid de desenho, hierarquia de dados, respiro e gradientes pontuais em CTAs e destaques.
- Sora em títulos/headlines e Montserrat em descrições, subheadlines e demais textos, servidas localmente.
- Transições suaves e pulsação sutil em CTAs, com suporte a foco por teclado e `prefers-reduced-motion`.

## Resultados implementados e verificados

- [x] **GitHub conectado antes da construção.** Repositório privado canônico `EmpresAzul/smartproeng`; scaffold confirmado no `main` antes da implementação, commit `7e676cd30dbc263e0581a7852010dd401cf65088`.

- [x] **Páginas e conteúdo institucional.** Páginas individuais Home, Sobre, Portfólio e Contato; conteúdo dos PDFs organizado sem casos/clientes/resultados inventados: marca e proposta, base em Primavera do Leste/MT, Eng. Tiago Arré e formação/experiência informadas, atendimento em Mato Grosso, problemas atendidos, fluxo Diagnóstico → Proposta → Execução → Entrega, cinco frentes, escopos e formatos e setores atendidos. Recomendações independentes e orientadas por dados. O PDF deixa o registro profissional como `[CREA a preencher]`: o site não o apresenta como “responsável técnico” nem promete assinatura profissional até a confirmação do proprietário.

- [x] **Identidade visual, navegação e responsividade.** Paleta da logo, Sora/Montserrat, gradientes, CTAs, transições e pulse, layouts responsivos, foco e redução de movimento; revisão estática independente e typecheck/build aprovados. Textos auxiliares foram escurecidos para corrigir os pontos de contraste AA reportados.

- [x] **Formulário e painel privado.** Contato exibe telefone, e-mail, base e área de atendimento; formulário validado grava solicitações e metadados UTM no banco gerenciado autorizado. `/admgerencia` usa OAuth Manus, autorização/papel no servidor, consulta paginada, atualização de status e exclusão confirmada. Teste HTTP sem autorização foi negado com `403`; teste não gravou mensagem real.

- [x] **LGPD, privacidade e cookies.** Páginas `/privacidade`, `/termos` e `/cookies` no rodapé; banner com aceitar, recusar e personalizar, categorias opcionais desligadas por padrão; analytics de plataforma desativado e nenhum pixel carregado. Formulário informa a finalidade, coleta campos mínimos e evita usar ciência como consentimento de marketing. As três páginas estão identificadas publicamente como **minuta para validação**, sem inventar prazos de retenção, encarregado ou detalhes contratuais do provedor. Cookies administrativos foram descritos com duração máxima de um ano e nonce OAuth de até 10 minutos.

- [x] **Base para tráfego pago e desempenho.** UTMs são preservadas entre CTAs e registradas na solicitação; páginas têm metadados específicos, Open Graph/Twitter, manifesto de rotas, conteúdo indexável no HTML inicial, áreas administrativas e 404 com `noindex`, e carregamento por rota. Build atual: JavaScript principal `131,59 kB` comprimido em gzip e CSS `25,51 kB` gzip; isso não é pontuação PSI. A escala Lighthouse/PSI vai até 100, portanto “acima de 100” não é um resultado possível nem prometido. Domínio e IDs de tags não foram fornecidos; canonical, sitemap e verificação final dos documentos do gateway ficam para a publicação no domínio escolhido.

- [x] **Aplicação executável e checkpoint.** Backend e banco habilitados, migração aditiva aplicada, `pnpm check`, `pnpm test` (8 testes) e `pnpm build` aprovados; smoke test de produção confirmou HTML/metadados por rota, status 404 real, `noindex` e asset local; logo no armazenamento gerenciado respondeu por HTTPS. Checkpoint principal em `main` confirmado no GitHub: `ea0524f1c4fbdd9fdb8ad6411a8fd6d36a461b3a`. Publicação automática está desligada e o site não foi publicado.

## Pendências para publicação/entrada em campanha

- [ ] **Confirmar registro profissional.** O proprietário deve informar número/UF do CREA e as atribuições aplicáveis antes de afirmar responsabilidade técnica ou prometer laudos/assinaturas que exijam habilitação específica. Até lá, manter apenas a apresentação “Eng. Tiago Arré” dada pelo proprietário.
- [ ] **Aprovar as minutas legais.** Confirmar prazos de retenção, termos do provedor, subprocessadores, região de armazenamento e eventual transferência internacional; obter revisão e aprovação da Smart ProEng/assessoria jurídica antes de considerar os textos finais.
- [ ] **Definir o domínio público.** Após receber o hostname, configurar canonical e `og:url` absolutos, validar `/sitemap.xml` e `/robots.txt` gerados pelo gateway no domínio final e conferir Search Console.
- [ ] **Tags de campanha opcionais.** Se desejar Google/Meta ou outra plataforma, fornecer os IDs e aprovar a integração; só carregar scripts conforme a preferência/consentimento pertinente. Hoje nenhum pixel/analytics de terceiros está conectado.
- [ ] **Medição de lançamento.** Depois da publicação autorizada, medir Lighthouse/PageSpeed no domínio e aparelho/condições de campanha reais; não antecipar uma pontuação não medida.
