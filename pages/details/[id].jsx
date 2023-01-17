import { getDetails } from "../api/connection";
import { GetStaticProps } from "next";
import { database, allData, dataTeste } from "../api/database";
import { query as q } from "faunadb";
import { fauna } from "../../services/fauna";
import { sheetName } from "../api/connection";
import { stringify } from "querystring";
import React, { Fragment, useEffect, useState } from "react";
import styles from "./details.module.scss";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { useFormik } from "formik";
import { getAllData } from "../../services/sheetdata";
import { defaultUrl } from "../../services/url";
import { Header } from "../../Components/Header";

const Details = (props) => {
  // let kappa = { props };
  console.log("props");
  console.log(props.pageProps.users[0]);
  const users = props.pageProps.users[0];

  // MANAGE SESSION
  const router = useRouter();
  const { status } = useSession();
  if (status != "loading" && status != "authenticated") {
    router.push(defaultUrl);
  } else if (status === "authenticated") {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.title}>
            <h1>Detalhes</h1>
          </div>
          <div className={styles.holder}>
            <div className={styles.left}>
              <ul className={styles.titles}>
                <li>
                  <h3>Id:</h3>
                </li>
                <li>
                  <h3>shopOwner:</h3>
                </li>

                <li>
                  <h3>transfers:</h3>
                </li>
                <li>
                  <h3>consultSale:</h3>
                </li>
                <li>
                  <h3>automaticValue:</h3>
                </li>
                <li>
                  <h3>firstName:</h3>
                </li>
                <li>
                  <h3>grupo:</h3>
                </li>
                <li>
                  <h3>cota:</h3>
                </li>
                <li>
                  <h3>parcelDetails:</h3>
                </li>
                <li>
                  <h3>history:</h3>
                </li>
                <li>
                  <h3>slug:</h3>
                </li>
                <li>
                  <h3>slugTenant:</h3>
                </li>
                <li>
                  <h3>cd_repres:</h3>
                </li>
                <li>
                  <h3>comis:</h3>
                </li>
                <li>
                  <h3>consorciado:</h3>
                </li>
                <li>
                  <h3>consultor:</h3>
                </li>
                <li>
                  <h3>data_venda:</h3>
                </li>
                <li>
                  <h3>equipe:</h3>
                </li>
                <li>
                  <h3>n_contrato:</h3>
                </li>
                <li>
                  <h3>nm_categ_comis:</h3>
                </li>
                <li>
                  <h3>parcela:</h3>
                </li>
                <li>
                  <h3>vend_cota:</h3>
                </li>
                <li>
                  <h3>vlr_base_credito:</h3>
                </li>
                <li>
                  <h3>vlr_bruto_comissao:</h3>
                </li>
              </ul>
            </div>
            <div className={styles.right}>
              <ul className={styles.paragraphs}>
                <li>
                  <p>{users.id != 0 ? users.id : "======="}</p>
                </li>
                <li>
                  <p>{users.shopOwner != 0 ? users.shopOwner : "======="}</p>
                </li>
                <li>
                  <p>{users.transfers != 0 ? users.transfers : "======="}</p>
                </li>
                <li>
                  <p>
                    {users.consultSale != 0 ? users.consultSale : "======="}
                  </p>
                </li>
                <li>
                  <p>
                    {users.automaticValue != 0
                      ? users.automaticValue
                      : "======="}
                  </p>
                </li>
                <li>
                  <p>{users.firstName != 0 ? users.firstName : "======="}</p>
                </li>
                <li>
                  <p>{users.grupo != 0 ? users.grupo : "======="}</p>
                </li>
                <li>
                  <p>{users.cota != 0 ? users.cota : "======="}</p>
                </li>
                <li>
                  <p>
                    {users.parcelDetails != 0 ? users.parcelDetails : "======="}
                  </p>
                </li>
                <li>
                  <p>{users.history != 0 ? users.history : "======="}</p>
                </li>
                <li>
                  <p>{users.slug != 0 ? users.slug : "======="}</p>
                </li>
                <li>
                  <p>{users.slugTenant != 0 ? users.slugTenant : "======="}</p>
                </li>
                <li>
                  <p>{users.cd_repres != 0 ? users.cd_repres : "======="}</p>
                </li>
                <li>
                  <p>{users.comis != 0 ? users.comis : "======="}</p>
                </li>
                <li>
                  <p>
                    {users.consorciado != 0 ? users.consorciado : "======="}
                  </p>
                </li>
                <li>
                  <p>{users.consultor != 0 ? users.consultor : "======="}</p>
                </li>
                <li>
                  <p>{users.data_venda != 0 ? users.data_venda : "======="}</p>
                </li>
                <li>
                  <p>{users.equipe != 0 ? users.equipe : "======="}</p>
                </li>
                <li>
                  <p>{users.n_contrato != 0 ? users.n_contrato : "======="}</p>
                </li>
                <li>
                  <p>
                    {users.nm_categ_comis != 0
                      ? users.nm_categ_comis
                      : "======="}
                  </p>
                </li>
                <li>
                  <p>{users.parcela != 0 ? users.parcela : "======="}</p>
                </li>
                <li>
                  <p>{users.vend_cota != 0 ? users.vend_cota : "======="}</p>
                </li>
                <li>
                  <p>
                    {users.vlr_base_credito != 0
                      ? users.vlr_base_credito
                      : "======="}
                  </p>
                </li>
                <li>
                  <p>
                    {users.vlr_bruto_comissao != 0
                      ? users.vlr_bruto_comissao
                      : "======="}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <h1>Carregando...</h1>;
};

export default Details;

export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`${defaultUrl + "/api/detalhes/" + params.id}`);
  const users = await res.json();
  // console.log("users");
  // console.log(users);
  const temp = [users.ref["@ref"].id];
  const id = { ...temp }[0];
  let infos = [{ ...users.data, id }];
  console.log("infos");
  console.log(infos);
  console.log("infos");

  return {
    props: {
      users: infos,
    },
  };
};
