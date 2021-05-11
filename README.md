# atv2-pweb2

Projeto para a disciplina de Programação para Web 2, IFPB.
Stack: Node e React.

Instalar dependências no front:
- npm install

Instalar dependências no back:
- npm install

Após a criação dos módulos e dowload das dependências, tem que configurar o arquivo .env para conectar com o seu banco de preferência;
Rodar o back e depois o front, executando o seguinte comando em cada pasta:
- npm start

Para fazer login, tem que criar o usuário direto no banco através da requisição /user/register:
{
    "username": "valueName",
    "email": "valueEmail",
    "password": "valuePass"
}
