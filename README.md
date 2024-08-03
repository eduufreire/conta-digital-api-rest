
# Desafio API Rest

API desenvolvida para aprimorar o meu conhecimento em algumas tecnologias e me desafiar a entregar um bom projeto sozinho.

- [Anunciado completo](https://github.com/cdt-baas/desafio-dev-api-rest)


## O que foi aplicado durante o desenvolvimento

- **Tecnologias usadas:** Typescript, Express, MySQL, Knex, Jest
- **Conceitos aplicados:** Inversão de dependência, middlewares para checagem de dados, manipulação de erros, Query Builder, Testes unitários e de integração

#
## Documentação da API

#### Cadastrar um novo portador:
- Quando um novo portador é criado, automaticamente uma nova conta é criada com o mesmo CPF.
```http
  POST /carriers
```
**Body**
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. CPF válido |
| `cpf` | `string` | **Obrigatório**. CPF válido |

**Response**
| Parâmetro   | Descrição                         |
| :---------- |:---------------------------------- |
| 201 | Created carrier |
| 400 | CPF Invalid or already registered |

# 
#### Desativar/ativar um portador
```http
  PUT /carriers/status-change
```
**Body**
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**. CPF válido |
| `action` | `string` | **Obrigatório**. 'enable' ou 'disable' |

**Response**
| Parâmetro   | Descrição                         |
| :---------- |:---------------------------------- |
| 201 |  |
| 400 | CPF Invalid |
| 404 | CPF not registered |

#
#### Criar uma transação
```http
  POST /accounts/transaction
```
**Body**
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**. CPF válido |
| `type` | `string` | **Obrigatório**. 'withdrawn' ou 'deposit' |
| `amount` | `float` | **Obrigatório**. Valor a ser depositado/retirado |

**Response**
| Parâmetro   | Descrição                         |
| :---------- |:---------------------------------- |
| 201 |  |
| 400 | CPF Invalid. Limite diário atingido. Conta sem saldo. Conta desativada |
| 404 | CPF not registered |

#
#### Consultar saldo de uma conta
```http
  GET /accounts/balance/{cpf}
```
**Params**
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `cpf` | `string` | **Obrigatório**. CPF válido |

**Response**
| Parâmetro   | Descrição                         |
| :---------- | :---------------------------------- |
| 200 | Retorna agência, número da conta e o saldo |
| 400 | CPF Invalid |
| 404 | CPF not registered |


#
#### Consultar extrato de uma conta
```http
  GET /accounts/extract/{cpf}
```
**Query Params**
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `startDate` | `string` | **Obrigatório**. Data de início do itnervalo |
| `endDate` | `string` | **Obrigatório**. Data final do intervalo |

**Response**
| Parâmetro   | Descrição                         |
| :---------- | :---------------------------------- |
| 200 | Retorna um vetor com todas as transações realizadas |
| 204 | Sem transações no período |
| 400 | CPF Invalid. startDate or endDate não é valido |
| 404 | CPF not registered |
