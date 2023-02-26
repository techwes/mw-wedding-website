const crypto = require("node:crypto").webcrypto;
const { readFile, writeFile, mkdir } = require("node:fs/promises");

function str2ab(str) {
  var ustr = atob(str);
  var buf = new ArrayBuffer(ustr.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = ustr.length; i < strLen; i++) {
    bufView[i] = ustr.charCodeAt(i);
  }
  return bufView;
}

function splitEncryptedContent(encryptedContent) {
  const unencodedPl = str2ab(encryptedContent);
  return {
    salt: unencodedPl.slice(0, 32),
    initializationVector: unencodedPl.slice(32, 32 + 16),
    encryptedText: unencodedPl.slice(32 + 16),
  };
}

async function deriveEncryptionKey(salt, password) {
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

async function decryptWithKey(key, initializationVector, encryptedData) {
  const decryptedArray = new Uint8Array(
    await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: initializationVector },
      key,
      encryptedData
    )
  );
  return new TextDecoder().decode(decryptedArray);
}

const run = async () => {
  const encryptedJSON = JSON.parse(
    await readFile("lib/encrypted_content.json", "utf-8")
  );
  const { password, unencryptedDirectory } = JSON.parse(
    await readFile(".private.env.json", "utf-8")
  );
  await Promise.all(
    Object.entries(encryptedJSON).map(async ([name, encrypted]) => {
      const { salt, initializationVector, encryptedText } =
        splitEncryptedContent(encrypted);
      const key = await deriveEncryptionKey(salt, password);
      const unencrypted = await decryptWithKey(
        key,
        initializationVector,
        encryptedText
      );
      await mkdir(unencryptedDirectory, { recursive: true });
      await writeFile(unencryptedDirectory + name, unencrypted);
    })
  );
};

run();
