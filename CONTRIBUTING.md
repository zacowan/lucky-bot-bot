# Contributing

## Getting Started

Use a node version manager like [fnm](https://github.com/Schniz/fnm) to install the correct version of Node.js automatically via the `.nvmrc` file. For example:

```sh
fnm use
```

Next, enable [corepack](https://nodejs.org/api/corepack.html) and install pnpm via corepack:

```sh
corepack enable
corepack install
```

Next, install the dependencies:

```sh
pnpm install
```

Lastly, you can run the development server:

```sh
pnpm dev
```

### Environment Variables

You will notice that when running the development server, you will instantly get an error for not having the required environment variables set. For environment variables, we make use of [dotenv](https://github.com/motdotla/dotenv). Ensure that you have all required environment variables defined in [env.ts](./src/env.ts) inside of a `.env` file in the root of the project.

### Deploying Commands

When developing new commands, you'll need to let the Discord application know that new commands are available on the server. To do this, you can run the `pnpm scripts:deploy-commands` script. Assuming you have defined your new command in [commands.ts](./src/commands.ts), the commands will automatically be updated for the Discord application.

## Guidelines

### Use Conventional Commits

Conventional commits make it easier to generate changelogs and automate releases. While this project does not currently use any form of automated [semantic release](https://github.com/semantic-release/semantic-release), it is recommended to follow the [Conventional Commits specification](https://www.conventionalcommits.org) to ensure consistency and clarity in your commit messages.

### Leave Comments for Weird Decisions

When making decisions that may not be immediately obvious, it's important to leave comments explaining your reasoning. This helps future developers understand the context and rationale behind the decision.

### Write Good Pull Request Descriptions

When submitting a pull request, it's important to provide a clear and concise description of the changes you've made. This helps reviewers understand the purpose and impact of your work, and makes it easier for them to provide feedback and suggestions.

Beyond that though, the pull request serves as a history of a decision made to the codebase. If there's ever a question like "why did we do this?", the pull request can provide context and reasoning.

### Testing

Feel free to write tests as you see fit. For the most part, relying on TypeScript's type system and ESLint can catch many issues before they become problems at runtime. However, it's always a good idea to write unit tests for critical functionality to ensure that it behaves as expected.
