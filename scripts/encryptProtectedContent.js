const crypto = require("node:crypto").webcrypto;
const { readdir, readFile, writeFile } = require("node:fs/promises");

const ab2str = (buf) => {
  const arrayBuf = new Uint16Array(buf);
  let out = "";
  for (let i = 0; i < arrayBuf.length; i++) {
    out += String.fromCharCode(arrayBuf[i]);
  }
  return btoa(out);
};
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

const getEncryptKeyParams = async (password) => {
  const encoder = new TextEncoder();
  let salt;
  try {
    // Resuse the salt if we can so that everyone who is
    // logged in stays logged in
    const encryptedJSON = JSON.parse(
      await readFile("lib/encrypted_content.json")
    );
    const encryptedContent = splitEncryptedContent(
      encryptedJSON[Object.keys(encryptedJSON)[0]]
    );
    salt = encryptedContent.salt;
  } catch (e) {
    console.log("No encrypted content found, generating new salt");
    salt = crypto.getRandomValues(new Uint8Array(32));
  }
  const baseKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  const key = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
  return { salt, key };
};

const encryptWithPassword = async ({ content, salt, key, iv }) => {
  const encoder = new TextEncoder();
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(content)
    )
  );
  const totalLength = salt.length + iv.length + ciphertext.length;
  const mergedData = new Uint8Array(totalLength);
  mergedData.set(salt);
  mergedData.set(iv, salt.length);
  mergedData.set(ciphertext, salt.length + iv.length);

  return ab2str(mergedData);
};

const run = async () => {
  const { password, unencryptedDirectory } = JSON.parse(
    await readFile(".private.env.json", "utf-8")
  );
  const contentFiles = await readdir(unencryptedDirectory);
  const encryptionParams = await getEncryptKeyParams(password);
  const encryptedFiles = await Promise.all(
    contentFiles.map(async (file) => {
      const content = await readFile(unencryptedDirectory + file, "utf-8");
      const iv = crypto.getRandomValues(new Uint8Array(16));
      return {
        name: file,
        encryptedContent: await encryptWithPassword({
          content,
          ...encryptionParams,
          iv,
        }),
      };
    })
  );
  const object = encryptedFiles.reduce((result, { name, encryptedContent }) => {
    return {
      ...result,
      [name]: encryptedContent,
    };
  }, {});
  await writeFile("lib/encrypted_content.json", JSON.stringify(object));
};

run();
