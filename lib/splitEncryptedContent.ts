// Taken from: https://www.maxlaumeister.com/pagecrypt/
function str2ab(str: string) {
  var ustr = window.atob(str);
  var buf = new ArrayBuffer(ustr.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = ustr.length; i < strLen; i++) {
    bufView[i] = ustr.charCodeAt(i);
  }
  return bufView;
}

export default function splitEncryptedContent(encryptedContent: string) {
  const unencodedPl = str2ab(encryptedContent);
  return {
    salt: unencodedPl.slice(0, 32),
    initializationVector: unencodedPl.slice(32, 32 + 16),
    encryptedText: unencodedPl.slice(32 + 16),
  };
}
