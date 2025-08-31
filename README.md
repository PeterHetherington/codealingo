# Codealingo

## Overview

Codealingo is a fullstack web application built with Next.js that allows users to learn programming languages through structured lessons and units. The platform is designed for flexibility and future expansion to include more programming languages​.

### Current features:

- User authentication and profile management (via Clerk)
- Join and track progress in programming language courses
- Lessons organized into units for structured learning
- Support for multiple languages (CSS, HTML, JS, and more planned)
- Responsive UI with modern design

### Future features:

- Expansion into more programming languages
- support for multiple question types (multiple-choice, fill-in-the-blank, matching-pairs, code-output)
- XP based reward system
- Earn badges
- Coding challenges
- Daily streaks
- Review/Recap lessons
- Adding friend
- News feed(friend achievements feed)
- Leaderboards

### Tech Stack

Frontend: ![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white),![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB), ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?logo=tailwindcss&logoColor=white)

Authentication: ![Clerk](https://img.shields.io/badge/Clerk-3A3A3A?logo=clerk&logoColor=white)

Database: ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)

UI Components:![Radix UI](https://img.shields.io/badge/Radix%20UI-000?logo=radixui&logoColor=white), ![React Icons](https://img.shields.io/badge/React%20Icons-20232A?logo=react&logoColor=white)

Deployment: ![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white)

## Set-up

### Pre-requisites

- Node.js
- npm

### Installation

1. Clone the repo

```
git clone https://github.com/PeterHetherington/codealingo.git
cd codealingo
```

2. Install dependencies

```
npm install
```

3. Run development server

```
npm run dev
```

4. Add environment variables

This project requires the following environment variable:

- `DB_CONN`: The connection string for your database.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key for authentication (public).
- `CLERK_SECRET_KEY`: Clerk secret key for authentication (private).
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: URL for the sign-in page.
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL`: URL for the sign-up page.
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL`: Fallback redirect after sign-in.
- `NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL`: Fallback redirect after sign-up.
- `NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL`: Force redirect after sign-up.
- `NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL`: Force redirect after sign-in.

Create a `.env` file in the root of the project and add:

```
DB_CONN=your_database_connection_string_here
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/profile
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/profile
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/profile
```

Schema for the database can be found in schema.sql

##

This was a collaboration project between

PeterHetherington

ebenezet

dammysa

egg24245
