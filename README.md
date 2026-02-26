
# 🌌 Arcturus Stream Frontend

![Angular](https://img.shields.io/badge/Angular-19-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue)
![Oracle Cloud](https://img.shields.io/badge/Oracle_Cloud-Deployed-orange)

Interface moderna e responsiva para a plataforma **Arcturus Stream**, desenvolvida com **Angular 19**. O projeto foca em oferecer uma experiência fluida para a descoberta e reprodução de frequências vibracionais para expansão da consciência.

---

## 🎨 Funcionalidades Principais
* **Autenticação Segura:** Sistema de Login e Registro com validação de força de senha e proteção de rotas via JWT.
* **Player de Áudio Customizado:** Desenvolvido para streaming eficiente de arquivos via AWS S3 e APIs externas.
* **Gerenciamento de Biblioteca:** Permite ao usuário salvar frequências descobertas na nuvem em sua coleção pessoal.
* **Interface Híbrida:** Busca unificada que integra resultados locais (PostgreSQL) e conteúdos globais (Jamendo API).

---

## 🚀 Tecnologias e Arquitetura
* **Core:** Angular 19 utilizando Standalone Components e Signals para gerenciamento de estado reativo.
* **Qualidade:** Suíte de testes unitários desenvolvida com Jasmine e Karma.
* **Deploy:** Containerização com Docker e servidor de alta performance Nginx para entrega de arquivos estáticos.
* **CI/CD:** Pipeline automatizado via GitHub Actions para validação de builds.
  
---

## 📸 Screenshots

<img width="1496" height="800" alt="image" src="https://github.com/user-attachments/assets/502e6336-5931-4c23-b2e8-731000d5f158" />
<img width="1292" height="751" alt="image" src="https://github.com/user-attachments/assets/53a2e95c-fc74-45a2-8db2-7f29705102d2" />
<img width="1817" height="652" alt="image" src="https://github.com/user-attachments/assets/1ad6ab88-0bff-4461-9212-bfb97846d422" />
<img width="1863" height="418" alt="image" src="https://github.com/user-attachments/assets/34ebba17-1a86-4294-bb6c-4588d8102a9f" />

---

## 🛠️ Como Executar com Docker

1. **Build da Imagem:**
   ```bash
   docker build -t arcturus-front 
   ```

1. **Execução:**
   ```bash
   docker run -p 80:80 arcturus-front
   ```
O frontend estará disponível na porta 80, configurado para se comunicar com a API via variáveis de ambiente de produção.
   
---
Desenvolvido por Marianna Rocha — Focada em soluções tecnológicas que unem inovação e propósito.
