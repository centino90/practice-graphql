import chai, { expect } from "chai";
import chaiSubset from "chai-subset";
import Koa from "koa";
const server = require("./server");

// const uri = `http://localhost:4000`;

let request = require("supertest");

console.log(request.Test);

describe("Graphql", () => {
  it("creates books", async () => {
    const mutation = `
            mutation{
                createBook(
                    book: {
                        title: "War & Peace",
                        author: "Joe Mama"
                    }
                ) {
                    ... on CreateBookSuccess{id},
                    ... on CreateBookError{message}
                }
            }`;
    request(server)
      .post("/graphql")
      .send({
        query: mutation,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.createBook.id).to.not.undefined;
        document();
      });
  });

  it("updates books", async () => {
    const mutation = `
    mutation{
        updateBook(
            id: 2,
            book: {
                title: "Bible",
                author: "God"
            }
        ){id}
    }`;
    request(server)
      .post("/graphql")
      .send({
        query: mutation,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.updateBook.id).to.not.undefined;
      });
  });
});
