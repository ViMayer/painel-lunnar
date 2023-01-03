import { FaGithub } from "react-icons/fa";
//---
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { defaultUrl } from "../../services/url";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import styles from "./styles.module.scss";
import { useFormik } from "formik";

export function UserInfo(props, { readData }) {
  const [deleted, setDeleted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(props.props);
  const [loaded, setLoaded] = useState(false);
  const sess = useSession();

  const toggleEditing = async () => {
    if (editing == false) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  };
  // CREATE FORMIK

  /////////////
  async function updateUser() {
    // e.preventDefault();
    const dados = {
      email: document.querySelector(".email").value,
      name: document.querySelector(".name").value,
      admin: Boolean(document.querySelector(".admin").value),
      status: Boolean(document.querySelector(".status").value),
    };
    console.log("dados");
    console.log(dados);
    // console.log("dados.status");
    // console.log(dados);
    // console.log("x");
    try {
      setSaving(true);

      const response = await api.post("users/update", {
        email: dados.email,
        name: dados.name,
        admin: dados.admin,
        status: dados.status,
      });
      const res = await response.data;

      await setUser(res.data);
      setSaving(false);
      readData();

      return res;
    } catch (e) {
      console.log("ERROR");
      console.log(e);
    }
  }
  ////
  // useState(() => {
  // }, []);
  // FORMIK
  const form = useFormik({
    initialValues: {
      name: user.name,
      email: user.email,
      admin: user.admin,
      status: user.status,
    },
    // onSubmit: async (values) => {
    //   console.log("kkkkkkkkkkkkkkkkkkkkkk");
    // },
  });
  /// DELETE
  async function deleteByEmail() {
    try {
      const deleteUser = await api.post("users/delete", {
        //email: "victor@lunnar.team",
        email: user.email,
      });
      deleteUser.status == 200 && setDeleted(true);
      readData();
      return deleteUser;
    } catch (e) {
      console.log(e);
    }
  }

  return deleted == true ? (
    <div className={styles.deletedUser}>
      <h1>x</h1>
    </div>
  ) : editing == false ? (
    <Fragment key={user.id}>
      <ul className={saving == false ? styles.users : styles.usersSaving}>
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
    <form>
      <ul key={user.id} className={styles.usersEditing}>
        <li className={styles.deleteBtn}>
          {user.email != sess.data.user.email ? (
            <button
              className={styles.deleteBtnActive}
              onClick={(e) => {
                e.preventDefault();
                console.log("user.email");
                console.log(user.email);
                deleteByEmail();
              }}
            >
              X
            </button>
          ) : (
            <button className={styles.deleteBtnActiveOff} type="button">
              X
            </button>
          )}
        </li>
        <li>
          <input
            disabled={true}
            type="text"
            name="email"
            className="email"
            onChange={form.handleChange}
            defaultValue={form.values.email}
            placeholder="email"
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
          className={user.status ? styles.statusActive : styles.statusInactive}
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
            onClick={async () => {
              updateUser();
              toggleEditing();
              readData;
            }}
          >
            Salvar
          </button>
        </li>
      </ul>
    </form>
  );
}
