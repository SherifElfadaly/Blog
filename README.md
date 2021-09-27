# Blog

## Run

Via Docker

Run the following commands:
``` bash
sudo cp ./.env.example ./.env
sudo docker-compose build
sudo docker-compose up -d
docker exec blog npm run migration:run
```

Api doc
[http://localhost:4000/api][link]

[link]: http://localhost:4000/api

## Generate articles and authors test data

will generate 10 each time you run the command

Run the following command:
``` bash
docker exec blog npm run seed:run
```

## Unit testing

Running the test
``` bash
docker exec blog npm run test
```

Test coverage
``` bash
docker exec blog npm run test:cov
```