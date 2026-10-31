# Practical 3 – API Integration and Data Rendering in React

Extends the Practical 2 portfolio with live GitHub repository data.

## Run

```bash
npm install
npm run dev
```

## Routes

- `/` – Home
- `/projects` – GitHub repositories fetched from the public GitHub REST API
- `/contact` – Controlled contact form
- `*` – Custom 404 page

## API

`https://api.github.com/users/Tamanna2605/repos`

No API key is required for this public endpoint. GitHub's unauthenticated API rate limit may apply.

## Concepts demonstrated

- `useEffect` for fetching data when the Projects page mounts
- `useState` for repositories, loading, error, search, and theme
- Loading spinner and error message components
- Retry button and repository search
- Repository name, URL, and star count
- React Router navigation without full page reloads

## Build

```bash
npm run build
```
