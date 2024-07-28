import request from "supertest";
import { jest } from "@jest/globals";
import { app } from "../../src/app";

describe("Carrier Integration Tests", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('Create new carrier', async () => {
    const response = await request(app).post("/carriers/").send({
      cpf: "88778720044",
      nome: "Teste de Integração",
    });

    expect(response.statusCode).toEqual(201);
    expect(response.body.message).toEqual("Created carrier");
  });

  it('Generate exception CPF', async () => {
    const response = await request(app)
        .post("/carriers/").send({
            cpf: "4711537",
            nome: "Teste de Integração",
        });
    expect(response.statusCode).toEqual(400);
  });

  it('Status change', async () => {
    const response = await request(app)
        .put("/carriers/status-change").send({
            cpf: '88778720044',
            action: 'enable',
        });
    expect(response.statusCode).toEqual(201)
  })


});
