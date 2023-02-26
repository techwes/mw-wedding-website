import decryptWithKey from "./decryptWithKey";
import splitEncryptedContent from "./splitEncryptedContent";

const SESSION_STORAGE_KEY = "mw-key";
export { SESSION_STORAGE_KEY };

export default async function decryptWithSessionKey(encrypted: string) {
  const base64JWTKey = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (!base64JWTKey) {
    return false;
  }
  try {
    const key = await crypto.subtle.importKey(
      "jwk",
      JSON.parse(window.atob(base64JWTKey)),
      { name: "AES-GCM" },
      false,
      ["decrypt"]
    );
    const { initializationVector, encryptedText } =
      splitEncryptedContent(encrypted);
    return await decryptWithKey(key, initializationVector, encryptedText);
  } catch (e) {
    console.error(e);
  }
  return false;
}
