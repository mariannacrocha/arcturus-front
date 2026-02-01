# 🌌 Arcturus Stream
> **Conexão e Expansão de Consciência através de Frequências Sonoras.**

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 💻 Sobre o Projeto

O **Arcturus Stream** é uma aplicação Full Stack desenvolvida para agregar, reproduzir e gerenciar áudios de meditação e frequências sonoras (432Hz, 528Hz, etc.). O sistema permite buscar faixas em APIs externas, reproduzi-las em um player integrado e salvar as favoritas em uma biblioteca pessoal na nuvem.

O projeto foi construído com foco em **Arquitetura Distribuída**, **Clean Code** e **Cloud Deployment**.

### 🎥 Live Demo
👉 **Acesse o projeto online:** [https://arcturus-front.vercel.app/]

---

## 📸 Screenshots

<div align="center">
  <img width="1035" height="241" alt="Tela de Busca" src="https://github.com/user-attachments/assets/a5011ff3-1071-4c0f-b4fa-d66585b63a21" />
 <img width="1680" height="891" alt="image" src="https://github.com/user-attachments/assets/3f4271bf-f03a-41a9-a239-4c3b0d2c1f79" />

</div>


---

## 🛠 Tecnologias Utilizadas

### **Frontend (Client-Side)**
* **Framework:** Angular 17+ (Standalone Components)
* **Linguagem:** TypeScript
* **Estilização:** CSS3 Moderno (Grid & Flexbox), Design System com Dark Mode
* **Hospedagem:** Vercel

### **Backend (Server-Side)**
* **Linguagem:** Java 21
* **Framework:** Spring Boot 3
* **Arquitetura:** REST API, DTO Pattern
* **Containerização:** Docker (Dockerfile otimizado)
* **Hospedagem:** Render

### **Dados & Infraestrutura**
* **Banco de Dados:** PostgreSQL (Hospedado no Neon Tech)
* **Armazenamento de Arquivos:** AWS S3 (Amazon Web Services)
* **Integrações:** Jamendo API (Busca de faixas externas)

---

## ✨ Funcionalidades

- [x] **Busca Inteligente:** Pesquisa de músicas e frequências integrada à API do Jamendo.
- [x] **Player de Áudio:** Reprodução contínua com controles nativos.
- [x] **Biblioteca Pessoal:** Capacidade de importar músicas externas e salvar permanentemente no banco de dados.
- [x] **Upload Cloud:** Integração com AWS S3 para persistência de arquivos de mídia.
- [x] **Design Responsivo:** Interface adaptável para Desktop, Tablet e Mobile.
- [x] **Feedback Visual:** Sistema de notificações (Toasts) e tratamentos de erro amigáveis.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
* Node.js e Angular CLI
* Java JDK 21
* Docker (Opcional, mas recomendado)
* PostgreSQL

### 1. Backend (API)

# Clone o repositório da API
git clone https://github.com/mariannacrocha/arcturus-api.git

# Entre na pasta
cd arcturus-api

# Configure as variáveis de ambiente (application.yml)
# (Necessário chaves da AWS e Banco de Dados)

# Rode a aplicação
./mvnw spring-boot:run

# Clone o repositório do Front
git clone https://github.com/mariannacrocha/arcturus-front.git

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
ng serve

---

☁️ Arquitetura de Deploy
O sistema opera em um ambiente 100% Cloud (Serverless/PaaS):

graph LR
    A[Usuário / Browser] -- HTTPS --> B[Vercel (Angular)]
    B -- REST API --> C[Render (Spring Boot)]
    C -- SQL --> D[(Neon PostgreSQL)]
    C -- Upload/Stream --> E[AWS S3 Bucket]
    C -- External API --> F[Jamendo API]
    
---

👩‍💻 Autora
Desenvolvido por Marianna.


    
