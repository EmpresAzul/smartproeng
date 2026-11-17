# 🚀 SmartProEng - Guia Super Simples

## ✅ Agora tem 3 formas FÁCEIS de iniciar!

### 🎯 OPÇÃO 1: Iniciar via Navegador (SEM SSH!)

1. Faça upload do `napoleon.zip` para `public_html`
2. Descompacte o arquivo
3. Acesse no navegador: **https://smartproeng.spweb.digital**
4. O site vai tentar iniciar automaticamente!

**OU acesse diretamente:**
👉 **https://smartproeng.spweb.digital/start_server.php**

---

### 🖥️ OPÇÃO 2: Terminal do cPanel (Sem precisar de SSH externo!)

1. Entre no **cPanel** do seu hosting
2. Procure por **"Terminal"** (geralmente em "Avançado")
3. Clique para abrir
4. Cole estes 3 comandos:

```bash
cd ~/public_html/napoleon
chmod +x start.sh
./start.sh
```

5. Pronto! ✅

---

### ⚡ OPÇÃO 3: Cron Job (Inicia sozinho!)

1. No **cPanel**, vá em **"Cron Jobs"**
2. Adicione este comando:

```bash
cd ~/public_html/napoleon && node dist/index.js > server.log 2>&1 &
```

3. Configure para rodar **@reboot** (quando o servidor ligar)
4. Salve
5. Pronto! O servidor vai iniciar automaticamente sempre! ✅

---

## 📦 O que mudou no napoleon.zip?

### ✨ Novos arquivos incluídos:

1. **`index.php`** 
   - Detecta se o servidor está rodando
   - Tenta iniciar automaticamente
   - Redireciona quando estiver pronto

2. **`start_server.php`**
   - Painel de controle via web
   - Mostra status do servidor
   - Exibe logs em tempo real
   - Botão para iniciar

3. **`INICIAR_PELO_CPANEL.txt`**
   - Guia passo a passo com todas as opções
   - Instruções visuais
   - Comandos prontos para copiar

4. **`.htaccess` atualizado**
   - Prioriza `index.php`
   - Proxy reverso configurado
   - HTTPS automático

---

## 🎯 Qual opção escolher?

| Opção | Dificuldade | Quando usar |
|-------|-------------|-------------|
| 1. Via Navegador | ⭐ Muito Fácil | Se você não quer mexer em terminal |
| 2. Terminal cPanel | ⭐⭐ Fácil | Se o PHP não conseguir iniciar |
| 3. Cron Job | ⭐⭐⭐ Médio | Para que inicie automaticamente sempre |

---

## 🔍 Como saber se funcionou?

Acesse: **https://smartproeng.spweb.digital**

- ✅ **Apareceu o site?** → Funcionou!
- ⏳ **Apareceu "Iniciando..."?** → Aguarde 5 segundos
- ❌ **Listagem de arquivos?** → Use o start_server.php

---

## 🆘 Não conseguiu?

### Teste o start_server.php:

1. Acesse: **https://smartproeng.spweb.digital/start_server.php**
2. Veja as informações na tela
3. Se aparecer que o `shell_exec` está desabilitado, use a **Opção 2** (Terminal do cPanel)

---

## 💡 Dica de Ouro!

**Se o seu hosting desabilita `shell_exec`**, a forma mais confiável é usar o **Terminal do cPanel** (Opção 2) ou **Cron Job** (Opção 3).

Todos os hostings modernos têm Terminal no cPanel. É só procurar! 🔍

---

## 📞 Precisa de ajuda do suporte?

Envie esta mensagem para o suporte do seu hosting:

> Olá! Preciso iniciar uma aplicação Node.js no servidor. 
> 
> **Diretório:** ~/public_html/napoleon
> **Comando:** node dist/index.js
> **Porta:** 3000
> 
> Como posso fazer isso funcionar permanentemente?

Eles vão ajudar! 😊

---

## ✅ Checklist Final

- [ ] Upload do napoleon.zip feito
- [ ] Arquivo descompactado
- [ ] Tentou acessar o site (pode iniciar sozinho!)
- [ ] OU acessou start_server.php
- [ ] OU usou Terminal do cPanel
- [ ] OU configurou Cron Job
- [ ] Site funcionando em https://smartproeng.spweb.digital

---

## 🎉 Pronto!

Com essas 3 opções, você **VAI CONSEGUIR** fazer funcionar!

A opção 1 (navegador) é a mais fácil. Se não funcionar, use a opção 2 (Terminal cPanel)! 🚀
