# OctoFit Tracker frontend

The presentation tier uses React 19, Vite, Bootstrap, and `react-router-dom`.

## API configuration

Define `VITE_CODESPACE_NAME` in `.env.local` when running the frontend in Codespaces:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

The app calls `https://$VITE_CODESPACE_NAME-8000.app.github.dev/api/[component]/`. When the variable is unset, it safely falls back to `http://localhost:8000/api`.

You can also set `VITE_API_URL` to override the fallback API URL.
