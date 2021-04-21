## Configurações
  - Na raiz do projeto instale as dependências:

  ```
    $ yarn install
  ```

  - Instale o json-server

  ```
    $ yarn add -g json-server
  ```

  - No arquivo `api.ts` na pasta `./src/services`, você deve alterar a `BASE_URL` para o IP da sua máquina.

  <br />

## Iniciando a aplicação:

  - inicializando o servidor

  ```
    json-server ./src/services/server.json --host [SEU-IP-AQUI] -p 3333
  ```

  - inicializando o projeto

  ```
    $ yarn start
  ```
