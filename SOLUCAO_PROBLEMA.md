# 🔧 Solução do Problema - SmartProEng

## ❌ O Problema que Você Está Vendo

Quando você acessa `smartproeng.spweb.digital`, está vendo:

```
Index of /
  - dist/
  - package.json
  - pnpm-lock.yaml
  - start.sh
```

**Por quê?** O servidor Node.js não está rodando! O Apache está apenas mostrando os arquivos.

---

## ✅ A Solução

O servidor Node.js precisa estar **RODANDO** para servir a aplicação React.

### 🎯 Passo a Passo EXATO:

#### 1️⃣ Conectar via SSH ao servidor

```bash
ssh seu_usuario@smartproeng.spweb.digital
```

(Use as credenciais do seu cPanel/Hosting)

#### 2️⃣ Ir até a pasta napoleon

```bash
cd ~/public_html/napoleon
```

#### 3️⃣ INICIAR O SERVIDOR

**Opção Simples:**
```bash
chmod +x start.sh
./start.sh
```

**Opção PM2 (Recomendada):**
```bash
# Instalar PM2 (só precisa uma vez)
npm install -g pm2

# Iniciar a aplicação
cd ~/public_html/napoleon
pm2 start dist/index.js --name smartproeng

# Salvar para iniciar automaticamente
pm2 save
pm2 startup
```

#### 4️⃣ Verificar se funcionou

```bash
curl http://localhost:3000/api/health
```

**Resposta esperada:**
```json
{"status":"ok"}
```

#### 5️⃣ Acessar o site

Agora sim! Acesse: **https://smartproeng.spweb.digital**

---

## 🔍 Como Funciona

### Antes (Problema):
```
Navegador → Apache → Mostra lista de arquivos ❌
```

### Depois (Correto):
```
Navegador → Apache → Proxy → Node.js (porta 3000) → React App ✅
```

---

## 📋 O que o napoleon.zip contém agora:

1. **`index.html`** - Página de fallback que:
   - Verifica se o servidor está rodando
   - Mostra instruções se não estiver
   - Redireciona para a aplicação quando estiver OK

2. **`.htaccess`** - Configuração Apache que:
   - Redireciona HTTP → HTTPS
   - Faz proxy da porta 3000
   - Serve arquivos estáticos
   - Headers de segurança

3. **`start.sh`** - Script que:
   - Verifica Node.js
   - Instala dependências se necessário
   - Inicia o servidor

4. **`INICIO_RAPIDO.txt`** - Guia de comandos rápidos

---

## 🆘 Problemas Comuns

### "Porta 3000 já em uso"

```bash
# Ver o que está usando a porta
lsof -i :3000

# Matar o processo
kill -9 <PID_DO_PROCESSO>
```

### "Não tenho Node.js"

```bash
# Verificar versão
node --version

# Se não tiver, peça ao suporte do hosting para instalar
# Ou use o NVM (Node Version Manager)
```

### "Permission denied"

```bash
# Dar permissões corretas
chmod -R 755 ~/public_html/napoleon
chmod +x ~/public_html/napoleon/start.sh
```

---

## ✅ Checklist Completo

- [ ] SSH conectado
- [ ] Na pasta `~/public_html/napoleon`
- [ ] Executou `./start.sh` ou `pm2 start`
- [ ] `curl http://localhost:3000/api/health` retorna `{"status":"ok"}`
- [ ] Site acessível em `https://smartproeng.spweb.digital`
- [ ] PM2 configurado para reiniciar automaticamente

---

## 🎯 Resumo em 3 comandos

```bash
cd ~/public_html/napoleon
chmod +x start.sh
./start.sh
```

**OU**

```bash
cd ~/public_html/napoleon
npm install -g pm2
pm2 start dist/index.js --name smartproeng
```

---

## 📞 Após Executar

O site vai estar assim:

✅ **https://smartproeng.spweb.digital** → Aplicação React funcionando
✅ **https://smartproeng.spweb.digital/api/health** → `{"status":"ok"}`

---

## 💡 Dica Extra

Use PM2 porque ele:
- Reinicia automaticamente se cair
- Inicia quando o servidor reiniciar
- Gerencia logs
- Permite ver status com `pm2 list`

---

## 🎉 Pronto!

Após executar os comandos acima, seu site estará **100% funcional**!

O problema atual é **APENAS** que o servidor Node.js não está rodando.
É só executar o `start.sh` ou usar PM2 que tudo vai funcionar! 🚀
