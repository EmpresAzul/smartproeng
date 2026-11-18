# Publicação externa — Vercel e Napoleon/cPanel

O repositório agora contém o Express exportado no arquivo raiz `index.ts`, um build que disponibiliza assets estáticos no diretório `public/` exigido pelo Vercel e o HTML compilado que o Express usa para montar snapshots por rota. As páginas usam fotos WebP versionadas em `client/public/assets/site/`; não dependem mais do armazenamento da plataforma.

O `napoleon.zip` anterior não era um pacote de site: continha somente arquivos de `node_modules`, sem `index.html`, bundle da aplicação ou fotografias. Os arquivos que estavam em `client/public/manus-storage/` também eram cópias do mesmo logotipo JPEG, renomeadas como WebP. O novo processo `pnpm package:napoleon` compila o site e cria um pacote cPanel com servidor, frontend, migrações SQL e apenas dependências Node de produção.

## Vercel via GitHub

Conecte o repositório `EmpresAzul/smartproeng` no Vercel e use a raiz do projeto (`/`). O `vercel.json` fixa o preset `express` e o comando `pnpm build`, evitando tratar este repositório Vite + Express como frontend estático. Mantenha a instalação compatível com o lockfile (`pnpm install --frozen-lockfile`). O repositório declara Node.js 22. Não configure `dist/public` como saída estática: o Express precisa processar as rotas da SPA, `/api/trpc`, o login e os snapshots SEO. O `vercel.json` inclui `dist/public/index.html` no bundle da função; o build deixa os demais arquivos públicos em `public/` para entrega pela CDN.

Na configuração do projeto, cadastre estes valores **somente** em Environment Variables do Vercel, nos ambientes desejados:

- `DATABASE_URL`: conexão MySQL de produção. O banco gerenciado do ambiente Manus não é automaticamente compartilhado com a Vercel.
- `SMARTPROENG_ADMIN_PASSWORD`: senha nova, exclusiva e forte para `/admgerencia`, com pelo menos 20 caracteres. Não reutilize a senha administrativa usada em outro serviço e não a envie pelo GitHub.
- `PUBLIC_SITE_URL`: opcional, mas recomendado para que as tags Open Graph usem URL absoluta; informe a origem pública, por exemplo `https://www.seu-dominio.com.br`, sem caminho final.

Antes de aceitar mensagens, crie o schema no MySQL com `pnpm db:migrate` a partir de uma cópia local controlada do repositório e a conexão de produção fornecida à sessão de terminal, ou aplique em ordem os arquivos `drizzle/0000_initial_users.sql` e `drizzle/0001_mute_mantis.sql`. Não rode migrações em cada build do Vercel: variáveis privadas não devem ser necessárias para compilar. Teste `/api/health`, uma rota como `/sobre`, a imagem `/assets/site/home-city-hero.webp`, o envio de contato e o login administrativo.

Depois de conectar o Git, cada push aceito à branch de produção dispara um deployment no Vercel; confirme no próprio painel que o build terminou. A documentação do Vercel descreve o Express como uma única Function exportada e orienta colocar assets em `public/`, não depender de `express.static()` para a CDN. [Express no Vercel](https://vercel.com/docs/frameworks/backend/express) [Configuração do Vercel](https://vercel.com/docs/project-configuration/vercel-json)

## Napoleon pelo Node.js do cPanel

Esta opção exige que o plano contratado tenha o aplicativo **Setup Node.js App/Web Apps** habilitado, suporte Node.js 22 e permita aplicações Passenger. O cPanel documenta a configuração da aplicação, os requisitos do servidor e o arquivo de inicialização `app.js`; a Napoleon também publica orientação sobre Node.js no cPanel. A disponibilidade depende do plano/servidor da conta e deve ser confirmada no painel ou com o suporte da hospedagem. [Instalar uma aplicação Node.js no cPanel](https://docs.cpanel.net/knowledge-base/web-services/how-to-install-a-node.js-application/) [Napoleon: cPanel e Node.js](https://napoleon.com.br/cpanel-e-node-js-criando-aplicacoes-web-modernas/)

1. Gere o pacote no repositório com `pnpm package:napoleon`. O arquivo pronto será `napoleon.zip`; ele não contém `.env`, senhas nem `node_modules`.
2. No cPanel, crie a aplicação Node.js 22, configure a raiz da aplicação fora de `public_html` e, para servir o domínio principal, associe a aplicação à raiz do domínio. Extraia o ZIP diretamente na raiz escolhida; o startup file é `app.js`.
3. Instale as dependências de produção na raiz do pacote com `npm ci --omit=dev`, se o terminal do plano estiver disponível; o ZIP inclui `package-lock.json` para manter as versões usadas no teste. Configure no painel `NODE_ENV=production`, `DATABASE_URL` e `SMARTPROENG_ADMIN_PASSWORD`. `PUBLIC_SITE_URL` é recomendado. Não crie `.env` dentro de `public_html`.
4. Crie um banco MySQL e um usuário no cPanel. Aplique as duas migrações SQL incluídas no pacote, na ordem em que estão nomeadas, ou execute `pnpm db:migrate` de uma máquina que tenha acesso de rede ao banco.
5. Reinicie a aplicação pelo painel. Se o plano usar o fluxo Passenger tradicional, `tmp/` está no ZIP; o cPanel documenta o gatilho de reinício pelo arquivo `tmp/restart.txt`.
6. Verifique o site, o endpoint `/api/health`, as fotos e o formulário. Confirme que uma mensagem de teste aparece em `/admgerencia` e depois remova esse registro.

Não envie o repositório-fonte inteiro para `public_html` nem extraia o antigo ZIP de dependências isoladas. Se o plano não tiver execução Node.js, o cPanel pode servir apenas arquivos estáticos: nesse modo o layout e as fotos podem aparecer, mas envio de mensagens, autenticação e painel dependem do servidor Express e do MySQL e não funcionarão como site completo.

## O que precisa ser provisionado fora do Git

O código e as fotografias seguem no repositório; credenciais e banco de produção não. Esta correção não consegue copiar automaticamente segredos mantidos no ambiente Manus para Vercel/cPanel. A instância externa só poderá gravar mensagens e autenticar o painel depois que o administrador configurar `DATABASE_URL`, criar as tabelas e cadastrar `SMARTPROENG_ADMIN_PASSWORD` no ambiente do host.
