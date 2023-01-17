import { signIn } from "next-auth/react";
import { defaultUrl } from "../services/url";
import { useSession } from "next-auth/react";
import styles from "../styles/home.module.scss";

export default function Home(req, res) {
  async function Testar() {
    alert("a");
  }
  const { status } = useSession();
  if (status == "loading") {
    return <h1>CARREGANDO...</h1>;
  }
  if (status == "authenticated") {
    return (
      <div className={styles.container}>
        <button
          onClick={() => {
            Testar();
          }}
        >
          TESTAR
        </button>
        <div className={styles.holder}>
          <a href={`${defaultUrl + "/users"}`}>
            <h3>USUÁRIOS</h3>
          </a>
          <a href={`${defaultUrl + "/dashboard"}`}>
            <h3>PAINEL</h3>
          </a>
        </div>
      </div>
    );
  }
  if (status != "authenticated") {
    return (
      <div className={styles.container}>
        <div className={styles.holder}>
          <button
            onClick={() => {
              signIn("github");
            }}
          >
            <h3>LOGIN</h3>
          </button>
        </div>
      </div>
    );
  }
}
