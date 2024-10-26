## Começando

Execute o servidor de desenvolvimento:

```bash
npm run install --save

npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000) com seu navegador para ver o resultado.

Execute em serverless:
OBS: ter a aws cli instalada e configurada 
```bash
npx serverless deploy
```



## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Funcionalidades

- Realiza o cadastro de uma agenda
- Busca todos os médico


## Documentação da API

#### Retorna todos os itens

```http
  GET /agenda
```


#### Retorna um item

```http
  POST /agenda
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `medico_id`      | `string` | **Obrigatório**. O ID do item que você quer |
| `paciente_nome`      | `string` | **Obrigatório**. O ID do item que você quer |
| `data_horario`      | `string` | **Obrigatório**. O ID do item que você quer |




## Autores

- [@nivaldeir](https://www.github.com/nivaldeir)

