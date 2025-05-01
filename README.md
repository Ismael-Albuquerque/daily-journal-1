# Daily Journal App

O Daily Journal é um app simples onde o usuário pode registrar como está se sentindo ao longo dos dias.

App desenvolvido para a disciplina de Desenvolvimento de Projetos para Dispositivos Móveis - UTFPR 2025.1

## Ambiente de desenvolvimento e ferramentas

Esse repositório foi desenvolvido com as seguintes ferramentas:

- React Native
- Expo
- Expo Router
- SQLite
- Zustand

## Funcionalidades a serem implementadas

- Cadastro de usuário; (PRIORITÁRIA)
- Validação de usuário e senha para login; (PRIORITÁRIA)
- CRUD para as entradas (data, emoção e descrição); (PRIORITÁRIA)
- Persistir as entradas com Zustand; (PRIORITÁRIA)
- Listar entradas em ordem cronológica; (PRIORITÁRIA)
- Apresentar as estatísticas das entradas realizadas; (TRABALHOS FUTUROS)

### Observações:

- Link para o protótipo de telas: https://www.figma.com/design/6wzTaiYh1DryhVoMwTHkzG/Daily-Journal
- Link para a modelagem do banco de dados: https://drive.google.com/file/d/1sdGYthrQZ5u8cJKbDjT9uybeSIHJOrpZ/view?usp=sharing

## Planejamento de sprints:

### Semana 1:

- Setup do projeto
  - [DONE] Criar o projeto;
  - [DONE] Instalar bibliotecas básicas (Zustand, Expo-SQLite, Expo-router, etc);
  - [DONE] Criação do README;
  - [DONE] Estruturar pastas (components, screens, store, db);
  - [DONE] Criar arquivos base para o banco de dados

### Semana 2:

- Banco de dados e Zustand
  - [DONE] Criar tabelas do db;
  - [DONE] testar inserção e leitura com SQLite;
  - [DONE] Criar store do Zustand;
  - [DONE] Testar persistencia temporária;

### Semana 3:

- Telas de Login e Cadastro
  - [] Criar telas de Login e Cadastro;
  - [] Validar e salvar novo usuário;
  - [] Implementar login com verificação de email e senha;
  - [] Salvar usuário logado no Zustand;

### Semana 4:

- Tela Home e Navegação
  - [] Criar tela Home;
  - [] Implementar Logout;
  - [] Criar navegação para outras telas;

### Semana 5:

- Tela Nova Entrada 1
  - [] Criar formulário de nova entrada;
  - [] Integrar Zustand para salvar rascunho;
  - [] Validar dados e salvar no banco;

### Semana 6:

- Tela Nova Entrada 2
  - [] Implementar editar entrada existente;
  - [] Preencher formulario com dados da entrada;
  - [] Atualizar registro no SQLite;
  - [] Tratar casos de cancelamento/salvamento automático;

### Semana 7:

- Tela Histórico 1
  - [] Buscar entradas do usuário logado;
  - [] Listar por ordem cronológica;
  - [] Criar componente card/lista para exibir;

### Semana 8:

- Tela Histórico 2
  - [] Adicionar botão editar e excluir;
  - [] Testar fluxo completo: salvar -> listar -> editar -> excluir;
  - [] Confirmação ao excluir;

### Semana 9:

- Ajustes finais
  - [] Verificar e testar as funcionalidades ;
  - [] Verificar Style das telas;
  - [] Organizar a entrega do último checkpoint;

### Semana 10:

- Ajustes finais
  - [] Verificar e testar as funcionalidades ;
  - [] Verificar Style das telas;
