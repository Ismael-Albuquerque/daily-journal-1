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

## Atualizações desde o último checkpoint

### Recursos aplicados dos módulos anteriores

- Zustand para gerenciamento de estado global:
  Criei um hook chamado useAuthStore para gerenciar o estado de autenticação do usuário de forma global, permitindo acesso às informações do usuário em diferentes partes da aplicação sem precisar passar props. Também uso Zustand com persistência local (emotionStore) para armazenar as entradas emocionais.

- SQLite com Expo:
  Utilizei SQLite para persistência local dos dados de usuários e emoções. Criei a classe userRepository e EmotionsRepository usando o padrão repository para centralizar todas as operações de leitura e escrita no banco.

- Expo Router para navegação:
  Implementei o roteamento avançado com Expo Router, organizando as rotas em arquivos dentro da pasta app, e utilizando router.push() e router.replace() para navegar entre telas.

### Boas práticas para a criação de componentes reutilizáveis

- Isolamento de componentes reutilizáveis:
  Criei os componentes personalizados EmotionCard (para exibir entradas emocionais recentes) e WeekDaySelector (para escolher dias da semana), ambos armazenados na pasta components/. Esses componentes são reutilizados em diferentes telas.

- Parametrização via props:
  Os componentes são parametrizáveis. Por exemplo, WeekDaySelector recebe dates, selectedDate e onSelectDate, o que permite total controle da lógica na tela pai sem acoplamento.

- Componentes que disparam eventos para o pai:
  Componentes como WeekDaySelector e EmotionPicker notificam seus pais sobre mudanças por meio de funções passadas via props (onSelectDate, onSelectEmotion).

### Observações:

- Link para o protótipo de telas: https://www.figma.com/design/6wzTaiYh1DryhVoMwTHkzG/Daily-Journal
- Link para a modelagem do banco de dados: https://drive.google.com/file/d/1sdGYthrQZ5u8cJKbDjT9uybeSIHJOrpZ/view?usp=sharing
- Link para o video de demonstração: https://youtube.com/shorts/Kh94_eTOd_8

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
  - [DONE] Criar telas de Login e Cadastro;
  - [DONE] Validar e salvar novo usuário;
  - [DONE] Implementar login com verificação de email e senha;
  - [DONE] Salvar usuário logado no Zustand;

### Semana 4:

- Tela Home e Navegação
  - [DONE] Criar tela Home;
  - [DONE] Implementar Logout;
  - [DONE] Criar navegação para outras telas;

### Semana 5:

- Tela Nova Entrada + criação de componentes
  - [DONE] Criação de componentes reutilizáveis
  - [DONE] Criar tela de nova entrada;
  - [DONE] Integrar Zustand para salvar rascunho;
  - [DONE] Validar dados e salvar no banco;
  - [DONE] Implementar Cancelar;

### Semana 6:

- Tela Histórico
  - [DONE] Buscar entradas do usuário logado;
  - [DONE] Listar por ordem cronológica;
  - [DONE] Ajustar EmotionCard para funcionar tanto no Home como no Histórico;
  - [DONE] Criar metodo delete no EmotionRepository;
  - [DONE] Adicionar botão editar/excluir;
  - [DONE] Pedir confirmação ao excluir;

### Semana 7:

- Tela Nova Entrada
  - [DONE] Implementar editar entrada existente;
  - [DONE] Criar metodo update no EmotionRepository;
  - [DONE] Preencher formulario com dados da entrada;
  - [DONE] Atualizar registro no SQLite;

### Semana 8:

- Ajustes finais
  - [] Testar fluxo completo: salvar -> listar -> editar -> excluir;
  - [] Verificar e testar as funcionalidades ;
  - [] Verificar Style das telas;
  - [] Organizar a entrega do último checkpoint;

### Semana 9:

- Ajustes finais
  - [] Ajustes de código e estilização;
