
<img src="./SowingFuture.png" width="600px" >

## 1. Descrição do Projeto
O sistema tem como objetivo fornecer uma **plataforma de gestão financeira pessoal**, permitindo que os usuários:

- Cadastrem e gerenciem contas de usuário de forma segura.  
- Registrem receitas e despesas, classificadas por tipo e categoria.  
- Criem cofres virtuais com metas financeiras e acompanhem o progresso.  
- Visualizem relatórios financeiros mensais em gráficos e tabelas.  
- Exportem relatórios em PDF ou Excel .  


## 2. Documentação
<a href="https://www.figma.com/design/rysLklzzhbRfqDpdR32Ook/BeauMoney?node-id=5-118&t=ZTjS6GvGGGzxTfYL-0" target="_blank">
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma Design">
</a>
<a href="https://github.com/Jhonatan-Andrade/SowingFutureAPI/blob/main/softwareRequirements.md" target="_blank">
  <img src="https://img.shields.io/badge/BackEnd_Docs-22C45E?style=for-the-badge&logo=github&logoColor=white" alt="Back End Documentation">
</a>
<a href="https://github.com/Jhonatan-Andrade/SowingFuture/blob/main/softwareRequirements.md" target="_blank">
  <img src="https://img.shields.io/badge/FrontEnd_Docs-48BF99?style=for-the-badge&logo=github&logoColor=white" alt="Back End Documentation">
</a>

## 3. Tecnologias Utilizadas

### Frontend
<a href="https://pt-br.react.dev/" target="_blank">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Documentation">
</a>
<a href="https://axios-http.com/ptbr/docs/intro" target="_blank">
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios Documentation">
</a>

### Backend
<a href="https://nodejs.org/" target="_blank">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js Documentation">
</a>
<a href="https://docs.netlify.com/" target="_blank">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" alt="Netlify Documentation">
</a>
<a href="https://www.postgresql.org/docs/" target="_blank">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Documentation">
</a>
<a href="https://jwt.io/introduction" target="_blank">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white" alt="JWT Documentation">
</a>
<a href="https://nodemailer.com/about/" target="_blank">
  <img src="https://img.shields.io/badge/Nodemailer-DD3A00?style=for-the-badge&logo=nodemailer&logoColor=white" alt="Nodemailer Documentation">
</a>

### Outros
<a href="https://github.com/exceljs/exceljs" target="_blank">
  <img src="https://img.shields.io/badge/ExcelJS-207245?style=for-the-badge&logo=excel&logoColor=white" alt="ExcelJS Documentation">
</a>
<a href="https://pdfkit.org/" target="_blank">
  <img src="https://img.shields.io/badge/PDFKit-FF6600?style=for-the-badge&logo=adobe&logoColor=white" alt="PDFKit Documentation">
</a>
<a href="https://github.com/" target="_blank">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</a>

## 4. Implementação
##### Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
  PORT=3000
  SECRET_KEY=development_secret_key
  DATABASE_URL="postgresql://dev:code@localhost:5432/sowing_future_db?schema=public"
```

##### Instalação e Execução
```bash
  # Instale as dependecias
  npm install
  # Utilize o docker compose para iniciar o container do postgres 
  docker compose up -d
  # Faça build e inicie a aplicação
  npm run build && npm run start
```

