# RxLog - Sistema de Controle de Estoque e Armazenamento de Medicamentos


> Sistema desenvolvido como parte do **Trabalho de Conclusão de Curso (TCC)** do curso de Desenvolvimento de Sistemas. Permite gerenciar o estoque e armazenamento de medicamentos com segurança e eficiência.

---

## 💡 Objetivo

O **RxLog** tem como objetivos:

- Controlar o **estoque de medicamentos** de forma eficiente  
- Permitir **cadastro de fornecedores e produtos**  
- Registrar o **histórico de movimentações** (entradas e saídas)  
- Garantir **acesso seguro** somente para usuários autorizados  
- Disponibilizar dashboards com **estatísticas de estoque**

O sistema está disponível para **web** e **mobile**, com interface intuitiva e responsiva.

---

## 🛠️ Tecnologias Utilizadas

### Back-end
- Java Spring Boot  
- JPA / Hibernate  
- MySQL  
- JWT (autenticação e segurança)  
- Maven (gerenciamento de dependências)  

### Front-end Web
- React.js  
- React Router DOM  
- React Icons  
- CSS Modules  

### Outras Ferramentas
- Git / GitHub  
- Postman  
- Figma  

---

## 🚀 Funcionalidades

- Cadastro e gerenciamento de **medicamentos**  
- Cadastro de **fornecedores**  
- Registro de **movimentações de estoque** (entradas e saídas)  
- Dashboards com **estatísticas de estoque**  
- Autenticação de usuários via **JWT**  
- Interface web responsiva e app mobile funcional

---

## ⚙️ Instalação e Execução

### Back-end
1. Configure o **MySQL** e crie o banco `rxlog`.  
2. Clone o repositório e acesse a pasta `backend`:

```bash
git clone <seu-repo>
cd backend
```

3. Configure as credencias no application.properties
4. Execute a API
```
mvn spring-boot:run
```

### Front-End
1. Acesse a paste frontend
```bash
   cd frontend
```

2. Instale as dependências
```bash
   npm install
```

3. Inicie a aplicação
```bash
   npm run dev
```

## 📑 Documentação da API com Swagger

A documentação da API está disponível por meio do Swagger. 

### Acessando o Swagger

Após subir o back-end com o comando:
```bash
   mvn spring-boot:run
```

A documentação estará disponível no seguinte endereço:
```bash
   http://localhost:8080/swagger-ui.html
```
