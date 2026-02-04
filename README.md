
# 🌌 Arcturus Stream Frontend

![Angular CI](https://github.com/mariannacrocha/arcturus-front/actions/workflows/angular.yml/badge.svg)
![Angular](https://img.shields.io/badge/Angular-19-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

Interface moderna e responsiva para a plataforma **Arcturus Stream**, desenvolvida com **Angular 19**. Oferece uma experiência fluida para descoberta e reprodução de frequências vibracionais.
---

## 🎨 Funcionalidades

* **Autenticação Segura:** Login e Registro com validação de força de senha e proteção de rotas (Guards).
* **Player de Áudio:** Componente customizado para reprodução de áudio via streaming (S3 ou External).
* **Biblioteca Pessoal:** Gerenciamento de favoritos e uploads do usuário.
* **Busca Híbrida:** Interface unificada que exibe resultados locais e da web.

---

## 🚀 Tecnologias

* **Framework:** Angular 19 (Standalone Components, Signals).
* **Linguagem:** TypeScript.
* **Estilização:** CSS3 Moderno (Flexbox/Grid, Variáveis CSS, Design Responsivo).
* **Qualidade:** Testes unitários com Jasmine e Karma.
* **CI/CD:** Pipeline de testes automatizados no GitHub Actions (ChromeHeadless).
  
---

## 📸 Screenshots

<img width="1496" height="800" alt="image" src="https://github.com/user-attachments/assets/502e6336-5931-4c23-b2e8-731000d5f158" />
<img width="1292" height="751" alt="image" src="https://github.com/user-attachments/assets/53a2e95c-fc74-45a2-8db2-7f29705102d2" />
<img width="1817" height="652" alt="image" src="https://github.com/user-attachments/assets/1ad6ab88-0bff-4461-9212-bfb97846d422" />
<img width="1741" height="666" alt="image" src="https://github.com/user-attachments/assets/626df2c9-9d76-4103-a7c9-6bae053bf2df" />
<img width="1863" height="418" alt="image" src="https://github.com/user-attachments/assets/34ebba17-1a86-4294-bb6c-4588d8102a9f" />

---

## 🔧 Instalação e Execução

1. **Instale as dependências:**
   O projeto requer **Node.js 20+**.
   ```bash
   npm install
   ```

Servidor de Desenvolvimento:
```bash
ng serve
```
Acesse http://localhost:4200.
Rodar Testes:
```bash
ng test
```
---

🌐 Deploy
O projeto está configurado para deploy automático na Vercel, conectando-se ao backend hospedado no Render. As URLs de API são gerenciadas via environment.prod.ts.

---
Desenvolvido por Marianna Rocha
