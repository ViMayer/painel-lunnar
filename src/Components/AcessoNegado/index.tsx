import styles from "./styles.module.scss";
import { useRouter } from "next/router";

import { defaultUrl } from "../../services/url";

export function AcessoNegado({ sessao }) {
  const router = useRouter();

  console.log("sessao");
  console.log(sessao);
  if (sessao == "unauthenticated") {
    router.push(defaultUrl);
  }
  return (
    sessao != "unauthenticated" && (
      <div className={styles.container}>
        <div className={styles.holder}>
          <h1>Permissão de usuário insuficiente!</h1>
        </div>
      </div>
    )
  );
}
