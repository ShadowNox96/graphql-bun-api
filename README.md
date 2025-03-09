# bun-graphql-api

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

How to create a new migration:

```bash
 bunx drizzle-kit generate --dialect sqlite --schema ./{directory_to_db_schema}.ts
 ```

 To run migrations:

```bash
bun run migrations
```

To connect to the database: 
- Create a docker container with the database or use an local database. 
- Update the connection details in the `db.ts` file.
- Run the migrations using `bun run migrations`.

## License

MIT

## About bun

## Project debveloped with bun by [shadownox97](https://github.com/shadownox97)

This project was created using `bun init` in bun v1.2.4. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
