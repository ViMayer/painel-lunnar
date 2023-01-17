import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";
import { defaultUrl } from "../../services/url";
import { useState } from "react";
import { api } from "../../services/api";

export function Header() {
  const styleSession = useSession();
  // console.log("permLevel");
  // console.log(styleSession);
  const [accessLevel, setAccessLevel] = useState("");
  const allowedRequest = async () => {
    if (styleSession.data) {
      // SALVAR EMAIL DA SESSAO E JOGAR PARA VERIFICACAO
      const access = await api.post("users/isallowed", {
        //email: "victor@lunnar.team",
        email: styleSession.data.user?.email,
      });
      // console.log("access.data.admin");
      // console.log(access.data.admin);
      // console.log(access.data.status);
      // console.log(accessLevel);
      if (access.data.admin == true) {
        setAccessLevel("admin");
      } else if (access.data.status == true) {
        setAccessLevel("status");
      } else {
        setAccessLevel("logged");
      }
      // console.log("accessLevel");
      // console.log(accessLevel);

      return access;
    }
  };
  allowedRequest();
  return accessLevel == "admin" ? (
    <header className={styles.containerAdmin}>
      <a href={defaultUrl}>
        <h1>HOME</h1>
      </a>
      <SignInButton perm={accessLevel} />
    </header>
  ) : accessLevel == "status" ? (
    <header className={styles.containerStatus}>
      <a href={defaultUrl}>
        <h1>HOME</h1>
      </a>
      <SignInButton perm={accessLevel} />
    </header>
  ) : accessLevel == "logged" ? (
    <header className={styles.containerLogged}>
      <a href={defaultUrl}>
        <h1>HOME</h1>
      </a>
      <SignInButton perm={accessLevel} />
    </header>
  ) : (
    <header className={styles.container}>
      <a href={defaultUrl}>
        <h1>HOME</h1>
      </a>
      <SignInButton perm={accessLevel} />
    </header>
  );
}
