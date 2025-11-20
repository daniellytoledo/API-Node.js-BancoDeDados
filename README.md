# API-Node.js-BancoDeDados

✅Nesse projeto usei funções do JavaScript como o React (useEffect, useState, useRef)
✅Criei um API usando banco de dados pelo MongoDB e Prisma
✅Comandos GET e POST pela extensão Thunder Client para teste 
✅E obviamente, HTML5 + CSS3

🧐 Mas o que significa isso tudo que eu falei?

👉 React:
É uma biblioteca do JavaScript para construir interfaces de usuário. As funções do React que usei neste projeto, ou seja, os Hooks, funcionam da seguinte forma:

useState → é um hooks para armazenar dados que podem mudar. Exemplo: setUsers()

useEffect → é um hooks para executar ações secundárias como chamadas de API. Exemplo: getUsers()

useRef → é um hooks para acessar elementos do DOM diretamente ou manter valores que são causam re-renderização. 

Esses 3 hooks foram essenciais para criar um sistema de cadastro, pois o código funciona de forma fluida. O useState armazena a lista de usuários; useRef acessa os input da tela de cadastro; e o UseEffect busca os usuários e atualiza a lista.

👉 Prisma:
É um ORM (Object-Relational Mapping) moderno para Node.js e TypeScript. É um "tradutor" entre o código JavaScript e o banco de dados. Excelente pela função Type-safe, o que previne erros na digitação do código, gera segurança ao validar os dados antes de enviar para o banco, e simplifica o código do projeto.

👉 MongoDB
É um banco de dados NoSQL de código aberto, que armazena dados em formato de documentos JSON flexíveis, em vez de tabelas e linhas tardicionais.

👉 API
É um intermediário que recebe e envia dados entre o Front-End e o Back-End. É uma ponte segura entre o React e o banco de dados.

👉 Thunder Client
É uma extensão do VS Code para testar APIs. Enquanto o Back-End está sendo desenvolvido, conseguimos rapidamente testar se o banco de dados está listando, criando e deletando dados. E quando há erros, você consegue descobrir de forma mais rápida.

👉 HTML5 + CSS3
E não poderia faltar o desenvolvimento de HTML para editar o conteúdo que aparece na tela, e o CSS para dar aparência.

LINK do deploy:
https://frontend-api-node-js-express-react.onrender.com/
