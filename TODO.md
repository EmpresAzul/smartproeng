# Smart ProEng — entregáveis do projeto

## Direção visual atual

- A logo continua sendo a referência: azul-marinho profundo, azul-lavanda, branco e verde-água. O amarelo do mockup antigo continua fora da identidade principal.
- Linguagem visual de cinema documental de engenharia: fotografia ampla com profundidade e luz de recorte, fundos em camadas, composição editorial, halos discretos e overlays escuros para manter leitura; Sora em headlines e Montserrat em texto.
- Imagens conceituais são fundos decorativos gerados para o site, não evidência de obras, clientes ou projetos executados pela Smart ProEng.

## Resultados anteriores — já verificados

- [x] **GitHub conectado antes da construção.** Repositório privado canônico `EmpresAzul/smartproeng`; scaffold confirmado no `main` antes da primeira implementação.
- [x] **Conteúdo institucional organizado.** Home, Sobre, Portfólio e Contato preservam os fatos dos PDFs, sem inventar clientes, resultados, cases ou registro profissional. O PDF deixa o registro como `[CREA a preencher]`; o site não atribui responsabilidade técnica nem promete assinatura profissional.
- [x] **Interface responsiva e marca.** Paleta da logo, Sora/Montserrat locais, CTAs em gradiente, transições, foco e redução de movimento já implementados.
- [x] **Formulário de contato.** Solicitações são validadas e armazenadas no banco gerenciado; parâmetros UTM acompanham a jornada e ficam ligados à solicitação.
- [x] **Painel de mensagens.** `/admgerencia` tem autorização no servidor, lista paginada, estados, busca e exclusão confirmada; acesso anônimo à API foi negado.
- [x] **Privacidade/cookies.** Rodapé contém `/privacidade`, `/termos` e `/cookies`; o aviso aceita, recusa ou personaliza categorias opcionais. As páginas legais estão identificadas como minutas para validação; analytics de plataforma e pixels de terceiros não estão conectados.
- [x] **Qualidade técnica anterior.** `pnpm check`, `pnpm test` (8 testes) e `pnpm build` passaram; smoke test verificou as rotas, 404 real, metadados e o painel `noindex`.
- [x] **Checkpoint anterior:** `ea0524f1c4fbdd9fdb8ad6411a8fd6d36a461b3a`. Desde então, o proprietário acrescentou guias de hospedagem e `napoleon.zip`; esses arquivos devem ser preservados.

## Pedido atual — estado da implementação

- [x] **Login visível.** O fluxo OAuth antigo e seus componentes sem uso foram removidos; a área `/admgerencia` mostra e-mail/senha da empresa. As páginas públicas, menu e painel não exibem botão/rótulo de login externo. O badge da plataforma permanece oculto.
- [x] **Proteções próprias do painel.** A implementação valida a senha administrativa no servidor, usa cookie próprio `HttpOnly`, `Secure`, `SameSite=None`, sessão curta vinculada à origem, proteção de origem nas mutações, limitação de tentativas e logout. Testes exercitam login positivo/negativo e tentativas cross-origin sem gravar dados reais.
- [~] **Verificação de credencial em Preview.** A senha consta como configurada no cartão secreto do Webdev para `all`, mas o processo de desenvolvimento atual não recebeu `SMARTPROENG_ADMIN_PASSWORD`; o endpoint falha fechado com HTTP 412. A senha real não foi lida nem copiada. A disponibilidade precisa ser validada no runtime publicado, ou o cartão precisa sincronizar a variável para o desenvolvimento antes de considerar o acesso validado.
- [~] **Redesenho cinematográfico.** Os três fundos originais estão integrados à Home, ao Portfólio e ao painel de Contato, com overlays navy/lavanda/verde-água, comportamento responsivo e animação desativável. Capturas desktop e mobile verificaram a composição; a foto do Portfólio aparece, mas a imagem da Home ainda mostra o marcador de geração do serviço de imagens e não deve ser considerada pronta enquanto não for substituída pelo resultado final.
- [x] **Conversão e responsividade preservadas.** Menu, CTAs, formulário, UTMs, consentimento, tipografia e conteúdo institucional continuam no fluxo; imagens usam prioridades/`loading` e o movimento respeita `prefers-reduced-motion`.
- [x] **Validação de código.** `pnpm check`, `pnpm test` (16 testes) e `pnpm build` passaram. Smoke test verificou manifesto com 8 rotas, páginas 200 e endpoint de configuração do cliente. A compilação emite uma advertência informativa do Vite para o script público de configuração.
- [x] **Checkpoint do código.** O commit `a29f0cc3a014bfa6dc5d8abef90c56d9f81498a2` foi confirmado em `origin/main`; a publicação automática desse código foi submetida. O estado final deve ser consultado no Dashboard, sem presumir que o site já esteja publicado. O pacote de hospedagem `napoleon.zip` e os guias do proprietário foram preservados e não foram reconstruídos.

## Estado de publicação e credenciais

- `publishing.auto_publish` está **ativado** na configuração atual; publicação final acompanha o Dashboard. As instruções próprias do projeto também descrevem hospedagem externa/cPanel em `smartproeng.spweb.digital`; o arquivo `napoleon.zip` existente não foi alterado por este pedido.
- Para concluir o login sem fornecedor externo, o proprietário precisa definir a senha no cartão seguro solicitado; recomenda-se senha longa e exclusiva gerada por gerenciador de senhas. O e-mail de acesso planejado é o endereço institucional já cadastrado para a Smart ProEng.
- Antes de lançar campanhas, permanecem pendentes: confirmação de CREA/UF e atribuições; aprovação final das minutas, retenção e subprocessadores; domínio público, tags opcionais e medição real de PageSpeed (escala máxima 100).
