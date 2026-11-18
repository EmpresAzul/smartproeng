# Smart ProEng — Engenharia e Gerenciamento de Projetos

Site React/Vite com servidor Express, API tRPC e banco MySQL via Drizzle.

## Desenvolvimento e verificação

- `pnpm dev`: Preview local com Vite/HMR em `PORT` (padrão 3000).
- `pnpm check`: valida os tipos TypeScript do cliente, servidor e entrypoint de produção.
- `pnpm test`: executa os testes automatizados.
- `pnpm build`: compila o frontend, prepara os arquivos estáticos Vercel e gera `dist/index.js` para Docker/cPanel.
- `pnpm start`: inicia o servidor compilado.
- `pnpm db:migrate`: aplica as migrações MySQL existentes; requer `DATABASE_URL`.
- `pnpm package:napoleon`: compila e gera `napoleon.zip` pronto para a aplicação Node.js do cPanel; requer o utilitário `zip` e acesso ao registro npm no computador de build.

As fotos do site são ativos WebP versionados em `client/public/assets/site/`; o logo está em `client/public/brand/`. O build não usa URLs `/manus-storage/` para conteúdo das páginas.

## Publicação

Leia [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) para conectar o GitHub ao Vercel, configurar MySQL e credenciais de runtime, ou preparar a aplicação Node.js no Napoleon/cPanel. O pacote cPanel tem um [guia curto próprio](docs/NAPOLEON.md). Nunca grave senhas ou DSNs no Git. A compilação pode ter êxito sem banco, mas o formulário e o painel dependem de `DATABASE_URL` e das migrações aplicadas.
