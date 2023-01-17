import React, { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { defaultUrl } from "../../services/url";
import { api } from "../../services/api";
import styles from "./userinfo.module.scss";

const UserInfo = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState();

  const [user, setUser] = useState({
    data: {
      email: "",
      name: "",
      status: false,
      admin: false,
    },
  });
  const [id, setId] = useState("000000");

  // console.log("user");
  // console.log(user);

  // MANAGE SESSION
  const router = useRouter();
  const status = useSession();

  async function allowedRequest() {
    if (status.data) {
      // SALVAR EMAIL DA SESSAO E JOGAR PARA VERIFICACAO
      const access = await api.post("users/isallowed", {
        //email: "victor@lunnar.team",
        email: status.data.user.email,
      });

      setAdmin(access.data.admin);
      console.log("admin");
      console.log(admin);
      return access;
    }
  }
  allowedRequest();

  console.log("status");
  console.log(status);
  // LOAD
  useEffect(() => {
    setId(props.pageProps.users.ref["@ref"].id.toString());
    setUser(props.pageProps.users);
    setLoaded(true);
  }, []);

  return loaded == false || admin == undefined ? (
    <h1>Carregando...</h1>
  ) : admin == true ? (
    <div className={styles.container}>
      <div className={styles.holder}>
        <div className={styles.top}>
          <h2>DETALHES</h2>
        </div>
        <div className={styles.bottom}>
          <div className={styles.titles}>
            <h3>Id:</h3>
            <h3>email:</h3>
            <h3>nome:</h3>
            <h3>Acesso:</h3>
            <h3>Permissão:</h3>
          </div>
          <div className={styles.data}>
            <p>{id ? id : "======="}</p>
            <p>{user.data.email ? user.data.email : "======="}</p>
            <p>{user.data.name ? user.data.name : "======="}</p>
            <p>{user.data.status == true ? "Permitido" : "Negado"}</p>
            <p>{user.data.admin == true ? "Admin" : "Usuário"}</p>
          </div>
        </div>
      </div>
    </div>
  ) : admin == false ? (
    <div>
      <h1>Acesso negado.</h1>
      <h1>Somente administradores podem acessar esta página!</h1>
    </div>
  ) : (
    <h1>ERRO 404</h1>
  );
};
export default UserInfo;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`${defaultUrl + "/api/userdetails/" + params.id}`);
  const users = await res.json();
  return { props: { users: users } };
};

// return loaded == false || !admin ? (
//   <h1>Carregando...</h1>
// ) : admin == true ? (
//   <div className={styles.container}>
//     <h1>DETALHES</h1>
//     <h3>Id: {id}</h3>
//     <h3>E-mail: {user.data.email}</h3>
//     <h3>Nome: {user.data.name}</h3>
//     <h3>Acesso: {user.data.status == true ? "Permitido" : "Negado"}</h3>
//     <h3>admin: {user.data.admin == true ? "Admin" : "Usuário"}</h3>
//   </div>
// ) : (
//   <h1>Acesso negado!</h1>
// );
