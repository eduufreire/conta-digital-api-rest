import request from "supertest";
import { app } from "../../src/app";

describe("# Account Integrations", () => {
  describe("GET /balance", () => {
    it("Get balance account", async () => {
      const result = await request(app).get("/accounts/balance/24783697027");

      expect(result.status).toEqual(200);
      expect(result.body[0]).toEqual({
        balance: 10,
        number: 247,
        agency: "1001",
      });
    });

    it("Account not found", async () => {
      const result = await request(app).get("/accounts/balance/03487763060");

      expect(result.status).toEqual(404);
    });

    it("CPF Invalid parameter", async () => {
      const result = await request(app).get("/accounts/balance/0348776");

      expect(result.status).toEqual(400);
    });
  });

  describe("POST /transaction", () => {
    it("Create transaction", async () => {
      const result = await request(app).post("/accounts/transaction/").send({
        cpf: "24783697027",
        type: "deposit",
        amount: 10,
      });

      expect(result.statusCode).toEqual(201);
    });

    it("Get balance account apos deposito", async () => {
      const result = await request(app).get("/accounts/balance/24783697027");
      expect(result.status).toEqual(200);
      expect(result.body.length).toEqual(1);
      expect(result.body[0].balance).toEqual(10)
    });

  });

  describe('PUT /status-change', () => {
    it('Disable account', async () => {
      const response = await request(app)
        .put('/accounts/status-change/')
        .send({
          action: 'disable',
          cpf: '24783697027'
        })

      expect(response.statusCode).toEqual(201)
    })

    it("Create transaction failure", async () => {
      const result = await request(app).post("/accounts/transaction/").send({
        cpf: "24783697027",
        type: "deposit",
        amount: 10,
      });

      expect(result.statusCode).toEqual(400);
    });

    it('Enable account account', async () => {
      const response = await request(app)
        .put('/accounts/status-change/')
        .send({
          action: 'enable',
          cpf: '24783697027'
        })

      expect(response.statusCode).toEqual(201)
    })

    it("Create transaction apos ativar", async () => {
      const result = await request(app).post("/accounts/transaction/").send({
        cpf: "24783697027",
        type: "deposit",
        amount: 10,
      });

      expect(result.statusCode).toEqual(201);
    });
  })


  describe('GET /extract', () => {

    it('Get extract account', async () => {
      const response = await request(app)
        .get('/accounts/extract/24783697027')
        .query({startDate: '2024-07-27', endDate: '2024-07-28'})
      
      expect(response.statusCode).toEqual(200)
      expect(response.body.length).toBeGreaterThan(1)
    })

    it('Get extract account failure', async () => {
      const response = await request(app)
        .get('/accounts/extract/04714465058')
        .query({startDate: '2024-07-27', endDate: '2024-07-28'})
      expect(response.statusCode).toEqual(404)
    })

  })

});
