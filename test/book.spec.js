import chai, { expect } from "chai";
import chaiSubset from "chai-subset";
const server = require("./server");

const url = `http://localhost:4000`;

let request = require("supertest")(url);

console.log(request);

describe("Graphql", () => {
  it("creates books", async () => {
    const mutation = `
            mutation{
                createBook(
                    book: {
                        id: "1",
                        title: "War & Peace",
                        author: "Joe Mama"
                    }
                ) {
                    ... on CreateBookSuccess{id},
                    ... on CreateBookError{message}
                }
            }`;
    request
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
            id: 1,
            book: {
                title: "Bible",
                author: "God"
            }
        ){id}
    }`;
    request
      .post("/graphql")
      .send({
        query: mutation,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.updateBook.id).to.not.undefined;
      });
  });

  it("get a book", async () => {
    const mutation = `
    query{
        book(
            id: 1,
            book: {
                title: "Bible",
                author: "God"
            }
        ){id}
    }`;
    request
      .get("/graphql")
      .send({
        query: mutation,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.book.id).to.not.undefined;
      });
  });
});
