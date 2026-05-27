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

if (!raw) {
  throw new Error(
    "Missing env var GOOGLE_CREDENTIALS_JSON. " +
    "Base64-encode your Google service-account JSON and set it as this variable."
  );
}

export const googleCredentials = JSON.parse(
  Buffer.from(raw, "base64").toString("utf8")
);
