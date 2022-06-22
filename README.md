# Description
Practice the following:
- graphql, Apollo, graphql-tools
- graphql auth, jwt, scopes
- graphql migrations, node-pg-migrate
- graphql test, chai, mocha, supertest

# COMMANDS
- Main terminal: docker compose up
    run the servers (Development)
- Second terminal: docker exec -it 3895ee092874 npm run migrate
    run the migrations
- Third terminal: docker exec -it 3895ee092874 npm run test
    run default tests
- Fourth terminal: docker exec -it 3895ee092874 npm run test:ci
    run tests with nyan reporter
# TODO
- migrate to node 16, knex

# DONE
- show graphql client in localhost:8080/graphql and send requests
- make tests successful
- make authentication/authorization work
- make migrations work in containeriazed database


# OLD CAMMANDS
./node_modules/.bin/node-pg-migrate up