import { FormEvent, PropsWithChildren, useEffect, useState } from "react";
import decryptWithKey from "../lib/decryptWithKey";
import deriveEncryptionKey from "../lib/deriveEncryptionKey";
import splitEncryptedContent from "../lib/splitEncryptedContent";
import encryptedContent from "../lib/encrypted_content.json";
import decryptWithSessionKey, {
  SESSION_STORAGE_KEY,
} from "../lib/decryptWithSessionKey";
import styles from "../styles/password.module.scss";
import Layout from "./layout";

const getEncryptedTest = () => {
  const encryptedContentKeys = Object.keys(encryptedContent) as Array<
    keyof typeof encryptedContent
  >;
  return encryptedContent[encryptedContentKeys[0]];
};

enum AccessLevel {
  unknown,
  allowed,
  noSessionKey,
  invalidPassword,
}

const PasswordProtect: React.FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [onBrowser, setOnBrowser] = useState(false);
  const [accessLevel, setAccessLevel] = useState<AccessLevel>(
    AccessLevel.unknown
  );
  useEffect(() => {
    setOnBrowser(true);
    const checkKey = async () => {
      const unencrypted = await decryptWithSessionKey(getEncryptedTest());
      setAccessLevel(
        unencrypted ? AccessLevel.allowed : AccessLevel.noSessionKey
      );
    };
    checkKey();
  }, []);
  if (!onBrowser || accessLevel === AccessLevel.unknown) {
    return <span />;
  }
  if (accessLevel === AccessLevel.allowed) {
    return <Layout>{children}</Layout>;
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAccessLevel(AccessLevel.noSessionKey);
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    if (!password) {
      return;
    }
    let isPasswordCorrect = false;
    try {
      const { salt, initializationVector, encryptedText } =
        splitEncryptedContent(getEncryptedTest());
      const key = await deriveEncryptionKey(salt, password);
      await decryptWithKey(key, initializationVector, encryptedText);
      isPasswordCorrect = true;
      const exportedKey = await crypto.subtle.exportKey("jwk", key);
      window.sessionStorage.setItem(
        SESSION_STORAGE_KEY,
        window.btoa(JSON.stringify(exportedKey))
      );
    } catch (e) {
      console.error(e);
    }
    if (isPasswordCorrect) {
      setAccessLevel(AccessLevel.allowed);
    } else {
      setAccessLevel(AccessLevel.invalidPassword);
    }
  };

  const baseClass = styles.PasswordForm;
  return (
    <form className={baseClass} onSubmit={handleSubmit}>
      <p>
        Welcome to Wesley & Madalyn's Wedding Website! <br />
        {accessLevel === AccessLevel.invalidPassword ? (
          <span className="text-danger">
            Incorrect password, please try again.
          </span>
        ) : (
          "Please enter the password found on our Save The Date:"
        )}
      </p>
      <label>Password:</label>
      <input type="password" name="password" required />
      <button type="submit" className="btn btn-outline-success">
        Submit
      </button>
    </form>
  );
};

export default PasswordProtect;
