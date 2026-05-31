/**
 * Loads Google service-account credentials from a base64-encoded env var.
 *
 * Locally:  set GOOGLE_CREDENTIALS_JSON in your .env (see below)
 * Render:   paste the same value in the dashboard as an env var
 *
 * To generate the value:
 *   Mac/Linux: base64 -i your-credentials-file.json
 *   Windows:   [Convert]::ToBase64String([IO.File]::ReadAllBytes("your-credentials-file.json"))
 */

const raw = process.env.GOOGLE_CREDENTIALS_JSON;

// Production (Render): parse credentials from the base64 env var.
// Local: undefined → Google SDK falls back to GOOGLE_APPLICATION_CREDENTIALS automatically.
export const googleCredentials = raw
  ? JSON.parse(Buffer.from(raw, "base64").toString("utf8"))
  : undefined;
