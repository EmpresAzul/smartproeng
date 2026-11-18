# Smart ProEng — pacote Node.js para cPanel

Este ZIP é o pacote de runtime da aplicação; não o extraia em `public_html`. Ele inclui `app.js`, o servidor Express compilado em `dist/index.js`, o site e as imagens em `dist/public/`, as migrações MySQL, dependências de produção fixadas e `package-lock.json`.

## Configuração necessária

1. No cPanel, crie uma aplicação Node.js com Node.js 22 e raiz fora de `public_html`. Use `app.js` como startup file e associe o domínio ou subdomínio à raiz da aplicação.
2. Extraia o ZIP diretamente nessa pasta e instale as dependências de produção com `npm ci --omit=dev`, se o plano permitir acesso ao Terminal.
3. Cadastre `NODE_ENV=production`, `DATABASE_URL` e `SMARTPROENG_ADMIN_PASSWORD` nas variáveis protegidas da aplicação. Gere uma senha administrativa exclusiva com pelo menos 20 caracteres. `PUBLIC_SITE_URL` é opcional e recomendado para metadados sociais.
4. Crie um banco MySQL e aplique `drizzle/0000_initial_users.sql` e depois `drizzle/0001_mute_mantis.sql`, ou execute `pnpm db:migrate` de uma máquina autorizada a conectar ao banco.
5. Reinicie a aplicação no cPanel. Se o plano usa Passenger tradicional, o arquivo `tmp/restart.txt` pode solicitar o reinício após a troca de arquivos.
6. Verifique `/api/health`, as rotas públicas, a imagem `/assets/site/home-city-hero.webp`, o envio de contato e o acesso a `/admgerencia`.

Sem MySQL configurado e as tabelas criadas, a página carrega, mas o formulário não grava mensagens e o painel não consegue consultá-las. Este ZIP não contém credenciais. Consulte `DEPLOYMENT.md` no repositório para o fluxo Vercel e detalhes do deploy.
