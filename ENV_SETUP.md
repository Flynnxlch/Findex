# Environment Variables Setup

This project uses environment variables to store sensitive information like API keys and secrets.

## Setup Instructions

1. **Create your `.env` file:**
   ```bash
   cp .env.example .env
   ```

2. **Add your actual API keys and secrets to `.env`:**
   ```env
   VITE_API_KEY=your_actual_api_key_here
   VITE_API_SECRET=your_actual_api_secret_here
   VITE_BACKEND_URL=https://your-backend-url.com
   ```

3. **Important Notes:**
   - The `.env` file is already in `.gitignore` and will NOT be committed to Git
   - Never commit your `.env` file to version control
   - Always use the `.env.example` file as a template
   - In Vite, environment variables must be prefixed with `VITE_` to be accessible in client-side code

## Using Environment Variables in Code

In your React components, access environment variables like this:

```javascript
const apiKey = import.meta.env.VITE_API_KEY;
const backendUrl = import.meta.env.VITE_BACKEND_URL;
```

## Security Best Practices

1. ✅ `.env` is in `.gitignore` - safe to commit
2. ✅ `.env.example` is committed - shows what variables are needed
3. ✅ Never hardcode API keys in your source code
4. ✅ Use environment variables for all sensitive data
5. ✅ Rotate API keys if they are ever exposed

## Current Status

After scanning the codebase, no hardcoded API keys or secrets were found. The application currently uses:
- `localStorage` for user session data (client-side only)
- No external API calls requiring API keys (yet)

If you add API integrations in the future, make sure to:
1. Add the variable name to `.env.example`
2. Add the actual value to your `.env` file
3. Use `import.meta.env.VITE_YOUR_VARIABLE_NAME` in your code

