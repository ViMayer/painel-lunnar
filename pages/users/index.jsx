import { useRouter } from "next/router";
import { api } from "../../services/api";
import { defaultUrl } from "../../services/url";
import { useSession } from "next-auth/react";
import { Fragment, useState, useEffect } from "react";
import styles from "./users.module.scss";
import { useFormik } from "formik";
import { UserInfo } from "../../Components/UserInfo";
import { SearchBar } from "../../Components/SearchBar";
import { ListPage } from "../../Components/ListPage";
import { AcessoNegado } from "../../Components/AcessoNegado";

export default function Users() {
  // MANAGE SESSION
  const [allowedResponse, setAllowedResponse] = useState(false);
  const [admin, setAdmin] = useState();
  const [access, setAccess] = useState(false);
  const [quantia, setQuantia] = useState(2);
  const [valor, setValor] = useState(false);
  const [newUserModal, setNewUserModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  //
  const [searchTerm, setSearchTerm] = useState(" ");
  const [searchValue, setSearchValue] = useState(" ");

  const router = useRouter();
  const status = useSession();
  const allowedRequest = async () => {
    if (status.data) {
      // SALVAR EMAIL DA SESSAO E JOGAR PARA VERIFICACAO
      const access = await api.post("users/isallowed", {
        //email: "victor@lunnar.team",
        email: status.data.user.email,
      });
      console.log("access");
      console.log(access.data);
      setAllowedResponse(access.data);
      setAdmin(access.data.admin);
      setAccess(access.data.status);
      return access;
    }
  };
  // CREATE
  async function newUser(e) {
    e.preventDefault();
    const dados = {
      email: document.querySelector(".newemail").value,
      name: document.querySelector(".newname").value,
      status: Boolean(document.querySelector(".newstatus").value),
      admin: Boolean(document.querySelector(".newadmin").value),
    };
    const checkEmail = await api.post("users/checkemail", {
      email: dados.email,
    });
    // console.log("checkEmail");
    // console.log(checkEmail.data);

    if (dados.email.length > 0) {
      if (checkEmail.data == false) {
        try {
          const response = await api.post("users/new", {
            email: dados.email,
            name: dados.name,
            status: dados.status,
            admin: dados.admin,
          });
          const res = await response.data;
          toggleModal();
          readData();
          lerTodos();
          console.log("response.data");
          console.log(response.data.dados.email);
          const getres = await api.post("users/getidbyemail", {
            email: response.data.dados.email,
          });
          // console.log("getres");
          // console.log(getres);
          console.log("-----------------------");

          // RETORNAR EMAIL + ID  DEPOIS
          // const este = [dados];
          // console.log("esteesteesteesteeste");
          // PEGAR EMAIL AQUI
          // console.log(este[0].data.response.data.email);
          // console.log(getres.data.response.data.email);
          // PEGAR ID AQUI
          // console.log(getres.data.response.ref["@ref"].id);

          const doo = {};
          Object.assign(doo, getres.data.response.data);
          Object.assign(doo, { id: getres.data.response.ref["@ref"].id });
          // const doo = { ...abba, ...dabba };
          console.log("doo");
          console.log(doo);

          // console.log(este[0].data.response.ref["@ref"].id);
          return res;
        } catch (e) {
          alert("ERROR");
          console.log(e);
        }
      } else {
        alert("E-mail ja cadastrado!");
      }
    } else {
      alert("Insira um e-mail!");
    }
  }
  // // DELETE
  // async function deleteUser(e) {
  //   e.preventDefault();
  //   const dados = {
  //     email: document.querySelector(".email").value,
  //   };
  //   try {
  //     const response = await api.post("users/delete", {
  //       email: dados.email,
  //     });
  //     const res = await response.data;
  //     console.log("dados.email");
  //     console.log(dados.email);
  //     return res;
  //   } catch (e) {
  //     console.log("ERROR");
  //     console.log(e);
  //   }
  // }
  // UPDATE
  // async function updateUser(e) {
  //   console.log("sdsd");
  //   e.preventDefault();
  //   const dados = {
  //     email: document.querySelector(".email").value,
  //     status: Boolean(document.querySelector(".status").value),
  //     admin: Boolean(document.querySelector(".admin").value),
  //   };
  //   console.log("dados.status");
  //   console.log(dados.status);
  //   try {
  //     const response = await api.post("users/update", {
  //       email: dados.email,
  //       status: dados.status,
  //       admin: dados.admin,
  //     });
  //     const res = await response.data;

  //     return res;
  //   } catch (e) {
  //     console.log("ERROR");
  //     console.log(e);
  //   }
  // }
  // FIND
  // async function findUser(e) {
  //   e.preventDefault();
  //   const dados = {
  //     email: document.querySelector(".email").value,
  //   };

  //   try {
  //     const response = await api.post("users/find", {
  //       email: dados.email,
  //     });
  //     const res = await response.data;
  //     console.log(res.ref["@ref"].id);
  //     router.push(`${defaultUrl + "/userinfo/" + res.ref["@ref"].id}`);
  //     return res;
  //   } catch {
  //     console.log("ERROR");
  //   }
  // }
  // READ USERS
  const [data, setData] = useState([]);
  let dados = [];
  const readData = async () => {
    api.get("/users/allusers").then((response) => {
      const iterateData = async (response) => {
        response.data.data?.map((resp) => {
          const getId = {
            id: resp.ref["@ref"].id,
            ...[resp.data][0],
            editing: false,
          };
          dados.push(getId);

          return getId;
        });
      };
      let allData = { data: dados };

      setData(allData);
      iterateData(response);

      return response.data.JSON;
    });
  };

  // CHECK PERMISSION
  allowedRequest();
  // CREATE FORMIK
  const form = useFormik({
    initialValues: {
      name: "nome",
      email: "seuemail@email.com",
      admin: "false",
      status: "false",
    },
    onSubmit: async (values) => {
      readData();
    },
  });
  // NEW USER MODAL

  async function toggleModal() {
    if (newUserModal == false) {
      setNewUserModal(true);
    } else {
      setNewUserModal(false);
    }
  }
  // READ MORE BUTTON
  async function lerMais() {
    let novaQuantia = quantia + 2;
    setQuantia(novaQuantia);
  }
  async function lerTodos() {
    let novaQuantia = quantia + data.data.length;
    setQuantia(novaQuantia);
  }
  async function resetLerTodos() {
    // let novaQuantia = 0;
    // await setQuantia(novaQuantia);
    // let novaQuantiaUpdate = quantia + data.data.length;
    // await setQuantia(novaQuantiaUpdate);
  }

  useState(() => {
    readData();
  }, []);

  if (status.status == "unauthenticated") {
    return <AcessoNegado sessao={"unauthenticated"} />;
  }
  if (
    status.status == "loading" ||
    (admin != true && admin != false && allowedResponse != false)
  ) {
    return (
      <Fragment>
        <h1>CARREGANDO...</h1>
      </Fragment>
    );
  }
  if (admin == true) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Controle de Usuários</h2>
        </div>
        <div className={styles.top}>
          <SearchBar
            className={styles.searchBar}
            posts={data.data}
            setSearchResults={setSearchResults}
            setValor={setValor}
            readData={readData}
            resetLerTodos={resetLerTodos}
          />
          <div className={styles.newUserBtn}>
            <button
              onClick={() => {
                toggleModal();
              }}
            >
              + NOVO USUARIO
            </button>
          </div>
          <div
            className={
              newUserModal == true
                ? styles.newUserFormActive
                : styles.newUserFormInactive
            }
          >
            <form>
              <div className={styles.holder}>
                <div className={styles.closeBtn}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault;
                      toggleModal();
                    }}
                  >
                    X
                  </button>
                </div>
                <div className={styles.input}>
                  <h3>Email</h3>
                  <input
                    className="newemail"
                    type="email"
                    name="email"
                    placeholder="seuemail@email.com"
                    required
                  />
                </div>
                <div className={styles.input}>
                  <h3>Nome</h3>
                  <input
                    className="newname"
                    type="name"
                    name="name"
                    placeholder="seu nome"
                    required
                  />
                </div>
                <div className={styles.select}>
                  <h3>Acesso</h3>
                  <select className="newstatus" name="newstatus">
                    <option value="true">Permitido</option>
                    <option value="">Negado</option>
                  </select>
                </div>
                <div className={styles.select}>
                  <h3>Permissao</h3>
                  <select className="newadmin" name="newadmin">
                    <option value="">USUARIO</option>
                    <option value="true">ADMIN</option>
                  </select>
                </div>

                <button
                  className={styles.cadastrarBtn}
                  onClick={newUser}
                  type="submit"
                >
                  CADASTRAR
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.formulario}>
            <div className={styles.holder}>
              <ul className={styles.formHead}>
                <li>
                  <h3>Email</h3>
                </li>
                <li>
                  <h3>Name</h3>
                </li>
                <li>
                  <h3>Permissão</h3>
                </li>
                <li>
                  <h3>Status</h3>
                </li>
              </ul>
              <div className={styles.searchResults}>
                {searchResults.length == 0 && valor == false ? (
                  <>
                    {data.data?.map(
                      (user, index) =>
                        index < quantia && ( // <= somente "quantia"x itens
                          <Fragment key={user.id}>
                            <UserInfo props={user} readData={readData} />
                          </Fragment>
                        )
                    )}
                  </>
                ) : (
                  <ListPage
                    searchResults={searchResults}
                    readData={readData}
                    resetLerTodos={resetLerTodos}
                  />
                )}
              </div>
              <div
                className={
                  data.data?.length > 0 &&
                  data.data.length > quantia &&
                  valor == false
                    ? styles.carregarMaisOn
                    : styles.carregarMaisOff
                }
              >
                <button
                  onClick={() => {
                    lerMais();
                  }}
                >
                  CARREGAR MAIS
                </button>
                <button
                  onClick={() => {
                    lerTodos();
                  }}
                >
                  CARREGAR TODOS
                </button>
                {data.data?.length > 0 && data.data.length > quantia && <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (admin != true) {
    return <AcessoNegado />;
  }
  return <h1>ERRO</h1>;
}
