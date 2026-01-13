# Projeto Loja Online

Este é um projeto de **loja virtual (e-commerce)** desenvolvido com **HTML, CSS, JavaScript e PHP**, utilizando **MySQL** como banco de dados. O objetivo é simular uma plataforma completa de vendas online, com autenticação de usuários, gerenciamento de produtos e área administrativa.

---

## Funcionalidades

- Página inicial com vitrine de produtos
- Sistema de login e cadastro de usuários
- Área administrativa para gerenciamento de produtos e ordens de serviço
- Integração com banco de dados MySQL (`projeto_loja.sql`)
- Estrutura modular organizada (Home, Store, Admin, Services)

---

## Estrutura do Projeto

```
Projeto_Loja/
│
├── index.html        → Página inicial da loja
├── ADMIN/            → Painel administrativo
├── Login/            → Sistema de autenticação
├── Store/            → Catálogo de produtos
├── services/         → Serviços adicionais
├── php/              → Scripts PHP (conexão e lógica)
├── css/              → Estilos da aplicação
├── JS/               → Scripts JavaScript
├── imgs/             → Imagens utilizadas
└── projeto_loja.sql  → Script do banco de dados
```

---

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- PHP
- MySQL

---

## Passo a Passo para Executar o Projeto

### Requisito recomendado
- **XAMPP** (Apache + MySQL)

---

### 1. Instalar o XAMPP

1. Baixe o XAMPP no site oficial.
2. Instale normalmente.
3. Abra o **Painel de Controle do XAMPP**.
4. Inicie os serviços **Apache** e **MySQL**.

---

### 2. Clonar o Repositório

No terminal ou Git Bash, execute:

```bash
git clone https://github.com/GAMIN6031/Projeto_Loja.git
```

---

### 3. Configurar o Banco de Dados

1. Acesse o **phpMyAdmin**:
   ```
   http://localhost/phpmyadmin
   ```
2. Crie um banco de dados chamado:
   ```
   projeto_loja
   ```
3. Importe o arquivo:
   ```
   projeto_loja.sql
   ```

#### Usuário Administrador Padrão

O banco já inclui um usuário administrador padrão:

```sql
INSERT INTO `admin` (`usuario`, `senha`) VALUES ('Admin', 'admin123');
```

**Credenciais:**
- Usuário: `Admin`
- Senha: `admin123`

---

### 4. Colocar os Arquivos na Pasta Correta

Copie a pasta do projeto para o diretório do XAMPP:

```
C:\xampp\htdocs\
```

Caminho final:

```
C:\xampp\htdocs\Projeto_Loja\
```

---

### 5. Executar o Projeto

No navegador, acesse:

- Página inicial:
  ```
  http://localhost/Projeto_Loja/index.html
  ```

- Painel administrativo:
  ```
  http://localhost/Projeto_Loja/Admin/index.php
  ```

---

### 6. Usar o Sistema

- **Página inicial:** visualização da vitrine de produtos
- **Login:** crie uma conta ou use o administrador padrão
- **Admin:** gerencie produtos e ordens de serviço
- **Store:** navegue pelo catálogo de produtos

---

## Melhorias Futuras

- Implementação de carrinho de compras
- Sistema de pagamento integrado
- Responsividade para dispositivos móveis
- Testes automatizados

---

## Licença

Este projeto é de uso educacional e pode ser adaptado livremente para estudos e melhorias.

---

Desenvolvido como projeto de aprendizado em desenvolvimento web.

