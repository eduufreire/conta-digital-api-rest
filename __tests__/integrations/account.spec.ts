import request from "supertest";
import { app } from "../../src/app";

describe("# Account Integrations", () => {
  describe("GET /balance", () => {
    it("Get balance account", async () => {
      const result = await request(app).get("/accounts/balance/88778720044");

      expect(result.status).toEqual(200);
      expect(result.body).toEqual({
        balance: 0,
        number: 887,
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
        cpf: "88778720044",
        type: "deposit",
        amount: 10,
      });

      expect(result.statusCode).toEqual(201);
    });

    it("Get extract account", async () => {
      const result = await request(app).get("/accounts/balance/88778720044");

      console.log();
      expect(result.status).toEqual(200);
      expect(result.body.length).toEqual(1);
      expect(result.body.balance).toEqual(10)
    });

  });




});
