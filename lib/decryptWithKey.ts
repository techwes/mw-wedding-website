// Taken from: https://www.maxlaumeister.com/pagecrypt/
export default async function decryptWithKey(
  key: CryptoKey,
  initializationVector: Uint8Array,
  encryptedData: Uint8Array
) {
  const decryptedArray = new Uint8Array(
    await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: initializationVector },
      key,
      encryptedData
    )
  );

  return new TextDecoder().decode(decryptedArray);
}
