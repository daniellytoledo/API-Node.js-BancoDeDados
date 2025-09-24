import express from 'express' /* importando o express para o código */

const app = express () /* criando uma função para o express, pois é o que os criados do express recomendam */

/* 
Agora vamos criar uma rota, ou seja, uma conversa entre o front-end e o back-end, usando HTTP. 
Podemos usar alguns comandos como:
Get = listar
Post = criar
Put = editar vários
Patch = editar um
Delete = deletar

E as rotas precisam de:
1- tipo de rota / método HTTP
2- endereço (www.qualquersite.com/usuarios) o usuario é o endereço, neste caso

Então, vamos iniciar com uma rota chamda get para listar os usuarios e o endereço que será 'usuarios'.
E junto com essa rota vamos utilizar request e response para dizer ao código que iremos fazer uma requisição e que também queremos uma resposta desta requisição.
*/

app.get('/usuarios', (req, res) => {
    res.send('Ok, deu bom!')
})

/* informando a porta que iremos usar e para testar o que escrevemos em cima, podemos ir no navegador e digitar o caminho para verificarmos se está tudo funcionando: localhost:3000/usuarios */

app.listen(3000) 

