import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGithub } from "react-icons/fa";
import { defaultUrl } from "../../services/url";
import styles from "./styles.module.scss";

export function SignInButton(props: any) {
  const router = useRouter();
  const { data: session } = useSession({
    required: false,
  });

  if (session) {
    if (props.perm == "admin") {
      return (
        <div className={styles.container}>
          <button
            type="button"
            className={styles.signInButton}
            onClick={() => {
              signOut();
            }}
          >
            <FaGithub />
            <div className={styles.text}>
              Logado com <span>GitHub</span>
            </div>
          </button>
        </div>
      );
    } else if (props.perm == "status") {
      return (
        <div className={styles.container}>
          <button
            type="button"
            className={styles.signInButton}
            onClick={() => {
              signOut();
            }}
          >
            <FaGithub />
            <div className={styles.text}>
              Logado com <span>GitHub</span>
            </div>
          </button>
        </div>
      );
    } else {
      return (
        <div className={styles.container}>
          <button
            type="button"
            className={styles.signInButton}
            onClick={() => {
              signOut();
            }}
          >
            <FaGithub />
            <div className={styles.text}>
              Logado com <span>GitHub</span>
            </div>
          </button>
        </div>
      );
    }
  } else {
    return (
      <div className={styles.container}>
        <button
          type="button"
          onClick={() => signIn("github")}
          className={styles.signOutButton}
        >
          <FaGithub />
          <div className={styles.text}>
            Logar com <span>GitHub</span>
          </div>
        </button>
      </div>
    );
  }
}
