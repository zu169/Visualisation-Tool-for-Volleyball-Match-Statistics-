## 1. Clone repository or download volleyscope file

## 2. Ensure you are in Volleyscope Directory

## 3. Setup

## install bun

# [Bun Installation Docs](https://bun.sh/docs/installation)

# install dependencies and initialise project

bun install

# run code

bun run dev

## 4. Docker Setup

# 1. Install Docker Desktop

# 2. Setup PostgreSQL locally [Docker Database Setup Docummentation](https://orm.drizzle.team/docs/guides/postgresql-local-setup)

## Drizzle Database Setup

# generate migration files

bun drizzle-kit generate

# run migrations and push changes to database

bun drizzle-kit migrate
bun drizzle-kit push
