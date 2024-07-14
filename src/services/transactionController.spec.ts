import { app } from '../app'
import request from 'supertest'

jest.mock('../models/in-memory/transactionInMemory.ts')
jest.mock('../services/transacoes.ts')

describe("transaction controller", () => {



    it("criando tarnsacao integracao", async () => {
        const response = await request(app)
                            .post('/transaction')
                            .send({
                                cpf: '99472902049',
                                type:'deposit',
                                amount: 100.00
                            })  

        expect(response.statusCode).toEqual(201)
    })


      



})