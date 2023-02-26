// Taken from: https://www.maxlaumeister.com/pagecrypt/
export default async function deriveEncryptionKey(
  salt: Uint8Array,
  password: string
) {
  const encoder = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["decrypt"]
  );
}
