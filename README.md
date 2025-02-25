# Lucky Bot Bot

A tailor-made bot for various commands.

## Usage

There are 3 primary steps to setting up a Discord bot:

1. Setting up your Discord Application in the developer portal.
2. Deploying a server to act as the bridge between the Discord bot and the commands you want to execute.

For step 1, try following the instructions here: https://discord.com/developers/docs/quick-start/getting-started.

For step 2, this bot server is deployed to DockerHub. You can reference the deployed image using Docker or docker-compose.

Example using Docker:

```sh
docker pull zacowan/lucky-bot-bot-server:latest
docker run -d --name lucky-bot-bot-server -p 5432:5432 zacowan/lucky-bot-bot-server:latest
```

Example using docker-compose:

```yaml
version: "3"
services:
  lucky-bot-bot-server:
    image: zacowan/lucky-bot-bot-server:latest
    ports:
      - "5432:5432"
```

Then, you can start docker-compose:

```sh
docker-compose up -d
```

### Environment Variables

For configuration, a series of environment variables are required. These will be documented in more detail in the future. For now, see [env.ts](./src/env.ts).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
