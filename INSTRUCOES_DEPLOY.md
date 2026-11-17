# 🚀 Instruções de Deploy - SmartProEng

## Arquivo Pronto para Deploy

O arquivo **`napoleon.zip`** está pronto para ser enviado ao servidor!

### 📦 O que está incluído no napoleon.zip:

- ✅ Código compilado (pasta `dist/`)
- ✅ Dependências de produção (`node_modules/`)
- ✅ Configuração de ambiente (`.env`)
- ✅ Script de inicialização (`start.sh`)
- ✅ Configuração Apache (`.htaccess`)
- ✅ Documentação completa (`README_DEPLOY.md`)

---

## 🎯 Passo a Passo Rápido

### 1️⃣ Fazer Upload

1. Acesse o painel de controle do seu hosting (cPanel, Plesk, etc.)
2. Vá até o gerenciador de arquivos
3. Navegue até a pasta `public_html`
4. Faça upload do arquivo `napoleon.zip`
5. Descompacte o arquivo (extrair aqui)

### 2️⃣ Conectar via SSH

```bash
ssh seu_usuario@smartproeng.spweb.digital
cd ~/public_html/napoleon
```

### 3️⃣ Verificar Node.js

```bash
node --version  # Deve ser v18 ou superior
```

Se não tiver Node.js instalado, peça ao suporte do hosting para instalar.

### 4️⃣ Iniciar o Servidor

**Opção Simples (recomendada):**

```bash
chmod +x start.sh
./start.sh
```

**Opção com PM2 (mais robusto):**

```bash
npm install -g pm2
pm2 start dist/index.js --name smartproeng
pm2 save
pm2 startup
```

### 5️⃣ Verificar Status

```bash
curl http://localhost:3000/api/health
```

Deve retornar: `{"status":"ok"}`

---

## 🌐 Configuração do Domínio

O arquivo `.htaccess` já está configurado para:
- ✅ Redirecionar HTTP → HTTPS
- ✅ Fazer proxy reverso da porta 3000
- ✅ Headers de segurança
- ✅ Cache de arquivos estáticos
- ✅ Compressão Gzip

---

## 🔍 Verificar se Funcionou

Acesse no navegador:
- **Produção**: https://smartproeng.spweb.digital
- **Health Check**: https://smartproeng.spweb.digital/api/health

---

## 📂 Estrutura de Arquivos

```
public_html/
└── napoleon/
    ├── dist/              # Código compilado
    │   ├── index.js      # Servidor
    │   └── public/       # Arquivos estáticos
    ├── node_modules/     # Dependências
    ├── .env              # Variáveis de ambiente
    ├── .htaccess         # Configuração Apache
    ├── start.sh          # Script de start
    ├── package.json
    └── README_DEPLOY.md  # Documentação completa
```

---

## 🆘 Problemas Comuns

### Porta 3000 já em uso
```bash
lsof -i :3000
kill -9 <PID>
```

### Erro de permissões
```bash
chmod -R 755 napoleon/
chmod +x start.sh
```

### Ver logs (se usando PM2)
```bash
pm2 logs smartproeng
```

---

## 📝 Notas Importantes

1. **Porta**: O servidor roda na porta 3000 internamente
2. **Apache**: O `.htaccess` faz proxy reverso da porta 3000 para o domínio público
3. **SSL**: O hosting deve ter SSL configurado (Let's Encrypt)
4. **Node.js**: Versão mínima 18
5. **Memória**: Recomendado pelo menos 512MB RAM

---

## ✅ Checklist Final

- [ ] Upload do napoleon.zip feito
- [ ] Arquivo descompactado no public_html
- [ ] Node.js instalado (v18+)
- [ ] Servidor iniciado (./start.sh ou pm2)
- [ ] Health check respondendo OK
- [ ] Site acessível pelo domínio
- [ ] HTTPS funcionando
- [ ] PM2 configurado para reiniciar automático

---

## 🎉 Pronto!

Seu projeto SmartProEng está no ar em:
**https://smartproeng.spweb.digital**

Para dúvidas, consulte o arquivo `README_DEPLOY.md` dentro da pasta napoleon.
