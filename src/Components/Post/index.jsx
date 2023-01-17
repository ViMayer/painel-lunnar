import React from "react";
import styles from "./styles.module.scss";
import { defaultUrl } from "../../services/url";
import { useState, Fragment } from "react";
import { api } from "../../services/api";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";

const Post = ({ post, readData }) => {
  // console.log("post");
  // console.log(post);
  const [editing, setEditing] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [user, setUser] = useState(post);
  const [dado, setDado] = useState(post.post);
  const [loaded, setLoaded] = useState(false);
  const sess = useSession();

  // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
  // console.log(user);
  // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

  const toggleEditing = async () => {
    if (editing == false) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };
  // LER
  // const ler = async () => {
  //   const dados = {
  //     email: document.querySelector(".email").value,
  //     name: document.querySelector(".name").value,
  //     admin: Boolean(document.querySelector(".admin").value),
  //     status: Boolean(document.querySelector(".status").value),
  //   };
  // };

  /////////////
  async function updateUser(e) {
    e.preventDefault();
    const dados = {
      email: document.querySelector(".email").value,
      name: document.querySelector(".name").value,
      admin: Boolean(document.querySelector(".admin").value),
      status: Boolean(document.querySelector(".status").value),
    };
    // console.log("dados");
    // console.log(dados);
    // console.log("x");
    try {
      const response = await api.post("users/update", {
        email: dados.email,
        name: dados.name,
        admin: dados.admin,
        status: dados.status,
      });
      const res = await response.data;
      // console.log("user");
      // console.log(user);
      // console.log("response");
      // console.log(res.data.admin);
      setUser(res.data);
      // console.log("user2");
      // console.log(user);

      return res;
    } catch (e) {
      console.log("ERROR");
      console.log(e);
    }
  }
  // FORMIK

  ////////////////////
  // DETAILS MODAL //
  ////////////////////

  ///////////////////
  async function deleteByEmail() {
    try {
      const deleteUser = await api.post("users/delete", {
        //email: "victor@lunnar.team",
        email: user.email,
      });
      deleteUser.status == 200 && setDeleted(true);
      return deleteUser;
    } catch (e) {
      console.log(e);
    }
  }
  //

  useState(() => {
    setDado(post);
    setLoaded(true);
    console.log("DADO222");
    console.log(dado);
  }, []);
  const form = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      admin: user.admin,
      status: user.status,
    },
  });
  return deleted == true ? (
    <div className={styles.deletedUser}>
      <h1>a</h1>
    </div>
  ) : loaded == false ? (
    <h1>LOADING</h1>
  ) : editing == false ? (
    <Fragment key={user.id}>
      <ul
        className={styles.users}
        // className={`${loaded == true ? styles.usersLoaded : styles.users}`}
      >
        <li className={styles.deleteBtn}>
          <button className={styles.deleteBtnInactive}>II</button>
        </li>

        <li>
          <p>{user.email ? user.email : "======="}</p>
        </li>
        <li>
          <p>{user.name ? user.name : "======="}</p>
        </li>
        <li>
          <p>{user.admin ? "Administrador" : "Usuário"}</p>
        </li>

        <li>
          <p>{user.status ? "Ativo" : "Inativo"}</p>
        </li>
        <li className={styles.detalhes}>
          <a href={defaultUrl + "/userinfo/" + user.id} target="_blank">
            DT
          </a>
        </li>
        <li className={styles.editBtn}>
          <button
            onClick={() => {
              toggleEditing();
            }}
          >
            ED
          </button>
        </li>
      </ul>
    </Fragment>
  ) : (
    <>
      <form>
        <ul className={styles.usersEditing}>
          <li className={styles.deleteBtn}>
            <button
              className={
                user.email != sess.data.user.email
                  ? styles.deleteBtnActive
                  : styles.deleteBtnActiveOff
              }
              onClick={(e) => {
                e.preventDefault();
                console.log(user.id);
                deleteByEmail(user.email);
              }}
            >
              X
            </button>
          </li>

          <li>
            <input
              disabled={true}
              type="text"
              name="email"
              className="email"
              onChange={form.handleChange}
              defaultValue={form.values.email}
              placeholder="teuemail"
            />
          </li>
          <li>
            <input
              disabled={false}
              type="text"
              name="name"
              className="name"
              onChange={form.handleChange}
              defaultValue={form.values.name}
              placeholder="name"
            />
          </li>
          {/* <li>
              <h1>{user.admin == true ? "AA" : "BB"}</h1>
            </li> */}
          <li
            className={user.admin ? styles.statusActive : styles.statusInactive}
          >
            {user.admin == true && user.email != sess.data.user.email ? (
              <select className="admin" name="admin">
                <option className={styles.option} value="true">
                  Administrador
                </option>
                <option className={styles.option} value="">
                  Usuário
                </option>
              </select>
            ) : user.admin == false ? (
              <select className="admin" name="admin">
                <option className={styles.option} value="">
                  Usuário
                </option>
                <option className={styles.option} value="true">
                  Administrador
                </option>
              </select>
            ) : (
              <select className="admin" name="admin" disabled>
                <option className={styles.option} value="true">
                  Administrador
                </option>
                <option className={styles.option} value="">
                  Usuário
                </option>
              </select>
            )}
          </li>
          <li
            className={
              user.status ? styles.statusActive : styles.statusInactive
            }
          >
            {user.status == false ? (
              <select className="status" name="status">
                <option className={styles.option} value="">
                  Inativo
                </option>
                <option className={styles.option} value="true">
                  Ativo
                </option>
              </select>
            ) : (
              <select className="status" name="status">
                <option className={styles.option} value="true">
                  Ativo
                </option>
                <option className={styles.option} value="">
                  Inativo
                </option>
              </select>
            )}
          </li>
          <li className={styles.editBtn}>
            <button
              onClick={async (e) => {
                await updateUser(e);
                toggleEditing();
                readData();
              }}
            >
              Salvar
            </button>
          </li>
        </ul>
      </form>
    </>
  );
};

export default Post;
