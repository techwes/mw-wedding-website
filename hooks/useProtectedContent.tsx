import { useEffect, useState } from "react";
import decryptWithSessionKey from "../lib/decryptWithSessionKey";
import encryptedContent from "../lib/encrypted_content.json";

type ProtectedContentName = keyof typeof encryptedContent;

const useProtectedContent = (contentName: ProtectedContentName) => {
  const [loadingOrError, setLoadingOrError] = useState<boolean | Error>(true);
  const [content, setContent] = useState<string | null>(null);
  useEffect(() => {
    setLoadingOrError(true);
    const decryptContent = async () => {
      const protectedContent = encryptedContent[contentName];
      const content = await decryptWithSessionKey(protectedContent);
      if (content) {
        setContent(content);
        setLoadingOrError(false);
      } else {
        setLoadingOrError(new Error("Access Denied"));
      }
    };
    decryptContent();
  }, [contentName]);
  return {
    content,
    ...(typeof loadingOrError === "boolean"
      ? { loading: loadingOrError, error: null }
      : {
          loading: false,
          error: loadingOrError,
        }),
  };
};

export default useProtectedContent;
