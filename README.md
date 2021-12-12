This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

- NodeJS `>= v16.13.1`
- Yarn `>=1.22.4`

## Features

- User can search the universities and sort it by name or country
- User can register in `http://localhost:3000/auth/registration` and login via `http://localhost:3000/auth/signin`
- Registered user can add favorites universities. The list can be accessed in `http://localhost:3000/favorites`
- User can subsribe using their email address

## Tech Stacks

- `NextJS` as main framework
- `Typescript` as language
- `sequelize` for database adapter
- `SQLite` as database layer
- `husky` and `lint-staged`
- https://next-auth.js.org/ as auth provider

## Local Setup

- Copy the environements

```bash
cp .env.sample .env
```

Note: we use `http://universities.hipolabs.com/search` by default for the API. If somehow the API is down/can not be accessed please run https://github.com/Hipo/university-domains-list in local and change the `NEXT_PUBLIC_UNIVERSITY_API_URL` env variable.

- Use Node LTS

```bash
nvm use
```

- Install dependencies

```bash
yarn install
```

- Migrate Database

```bash
npx sequelize-cli db:migrate
```

The SQLite is used by default. The DB file will be appeared in `./db/database_development.sqlite`

- Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Available Commands

- `yarn dev` : Run development in local
- `yarn build` : Build app
- `yarn start` : Start app production mode
- `yarn lint` : Lint the code
- `yarn test` : Testing the code
- `yarn test --coverage` : Testing the code with coverage

## Available Routes

- `/` : Home index
- `/auth/signin` : Login page
- `/auth/registration` : Registration page
- `/api/auth/signout` : Logout page
- `/subscription` : Subscription page
- `/favorites` : Favorites page

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
