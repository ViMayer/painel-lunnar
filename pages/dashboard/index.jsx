import { GetStaticProps } from "next";
import { database, allData, dataTeste } from "../api/database";
import { query as q } from "faunadb";
import { fauna } from "../../services/fauna";
import { sheetName } from "../api/connection";
import { stringify } from "querystring";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.scss";
import { api } from "../../services/api";
import React from "react";
import { useFormik } from "formik";
import { defaultUrl } from "../../services/url";
import { getSession, signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { AcessoNegado } from "../../Components/AcessoNegado";

const Painel = () => {
  // MANAGE SESSION
  const [admin, setAdmin] = useState(false);
  const [access, setAccess] = useState(false);
  const router = useRouter();
  const status = useSession();
  const allowedRequest = async () => {
    if (status.data) {
      // SALVAR EMAIL DA SESSAO E JOGAR PARA VERIFICACAO
      const access = await api.post("users/isallowed", {
        //email: "victor@lunnar.team",
        email: status.data.user.email,
      });
      // console.log("access.data");
      // console.log(access.data.status);
      // console.log(access.data.admin);
      setAdmin(access.data.admin);
      setAccess(access.data.status);
      return access;
    }
  };

  // READ
  const [data, setData] = useState([]);
  let dados = [];
  let dataRead = false;
  const readData = async () => {
    if (dataRead != true) {
      api.get("/allinfo").then((response) => {
        const iterateData = async (response) => {
          response.data.data?.map((resp) => {
            const getId = { id: resp.ref["@ref"].id, ...[resp.data][0] };
            dados.push(getId);
            return getId;
          });
        };

        let allData = { data: dados };
        setData(allData);
        iterateData(response);
        return response.data.JSON;
      });
      dataRead = true;
    }
  };

  // UPDATE
  async function setInput(valor, id) {
    document.getElementsByClassName(`${id}`).value = valor;
  }
  async function updateInfo(e, id) {
    e.preventDefault();
    const dados = {
      shopOwner: document.getElementsByClassName(`${id + "shopOwner"}`)
        .shopOwner.value,
      transfers: document.getElementsByClassName(`${id + "transfers"}`)
        .transfers.value,
      consultSale: document.getElementsByClassName(`${id + "consultSale"}`)
        .consultSale.value,
      automaticValue: document.getElementsByClassName(
        `${id + "automaticValue"}`
      ).automaticValue.value,
      firstName: document.getElementsByClassName(`${id + "firstName"}`)
        .firstName.value,
      grupo: document.getElementsByClassName(`${id + "grupo"}`).grupo.value,
      cota: document.getElementsByClassName(`${id + "cota"}`).cota.value,
      parcelDetails: document.getElementsByClassName(`${id + "parcelDetails"}`)
        .parcelDetails.value,
      history: document.getElementsByClassName(`${id + "history"}`).history
        .value,
      slug: document.getElementsByClassName(`${id + "slug"}`).slug.value,
      slugTenant: document.getElementsByClassName(`${id + "slugTenant"}`)
        .slugTenant.value,
      cd_repres: document.getElementsByClassName(`${id + "cd_repres"}`)
        .cd_repres.value,
      comis: document.getElementsByClassName(`${id + "comis"}`).comis.value,
      consultor: document.getElementsByClassName(`${id + "consultor"}`)
        .consultor.value,
      consorciado: document.getElementsByClassName(`${id + "consorciado"}`)
        .consorciado.value,
      data_venda: document.getElementsByClassName(`${id + "data_venda"}`)
        .data_venda.value,
      equipe: document.getElementsByClassName(`${id + "equipe"}`).equipe.value,
      n_contrato: document.getElementsByClassName(`${id + "n_contrato"}`)
        .n_contrato.value,
      nm_categ_comis: document.getElementsByClassName(
        `${id + "nm_categ_comis"}`
      ).nm_categ_comis.value,
      parcela: document.getElementsByClassName(`${id + "parcela"}`).parcela
        .value,
      vend_cota: document.getElementsByClassName(`${id + "vend_cota"}`)
        .vend_cota.value,
      vlr_base_credito: document.getElementsByClassName(
        `${id + "vlr_base_credito"}`
      ).vlr_base_credito.value,
      vlr_bruto_comissao: document.getElementsByClassName(
        `${id + "vlr_bruto_comissao"}`
      ).vlr_bruto_comissao.value,
    };

    try {
      const response = await api.post("updateInfo", {
        id: id,
        shopOwner: dados.shopOwner,
        transfers: dados.transfers,
        consultSale: dados.consultSale,
        automaticValue: dados.automaticValue,
        firstName: dados.firstName,
        grupo: dados.grupo,
        cota: dados.cota,
        parcelDetails: dados.parcelDetails,
        history: dados.history,
        slug: dados.slug,
        slugTenant: dados.slugTenant,
        cd_repres: dados.cd_repres,
        comis: dados.comis,
        consultor: dados.consultor,
        consorciado: dados.consorciado,
        data_venda: dados.data_venda,
        equipe: dados.equipe,
        n_contrato: dados.n_contrato,
        nm_categ_comis: dados.nm_categ_comis,
        parcela: dados.parcela,
        vend_cota: dados.vend_cota,
        vlr_base_credito: dados.vlr_base_credito,
        vlr_bruto_comissao: dados.vlr_bruto_comissao,
      });

      const res = await response.data;
      alert("Dados atualizados!");
      readData();
    } catch (e) {
      console.log(e);
    }
  }
  // DELETE
  const deleteRequest = async (url) => {
    try {
      const res = await fetch(url, {
        method: "DELETE",
      });
      const deleteResponse = await res.json();
      return deleteResponse;
    } catch (e) {
      console.log(e);
    }
  };
  const deleteContact = async (ref) => {
    await deleteRequest("/api/sheets/" + ref);
    console.log("DELETED");
    readData();
  };
  // CREATE
  const post = async (url, data) => {
    const res = await fetch(url, {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
    });
    const returnedData = await res.json();
    return returnedData;
  };
  const form = useFormik({
    initialValues: {
      shopOwner: "",
      transfers: "",
      consultSale: "",
      automaticValue: "",
      firstName: "",
      grupo: "",
      cota: "",
      parcelDetails: [],
      history: [],
      slug: "",
      slugTenant: "",
      cd_repres: "",
      comis: "",
      consorciado: "",
      consultor: "",
      data_venda: "",
      equipe: "",
      n_contrato: "",
      nm_categ_comis: "",
      parcela: "",
      vend_cota: "",
      vlr_base_credito: "",
      vlr_bruto_comissao: "",
    },
    onSubmit: async (values) => {
      const ret = await post("/api/sheets", values);
      readData();
    },
  });

  useState(() => {
    readData();
  }, []);
  allowedRequest();
  if (status.status == "unauthenticated") {
    return <AcessoNegado sessao={"unauthenticated"} />;
  }

  if (admin == true || access == true) {
    return (
      <>
        <div className={styles.container}>
          <main className={styles.main}>
            <div className={styles.table}>
              <ul className={styles.head}>
                <ul>
                  <li>
                    <h2>ID</h2>
                  </li>
                  <li>
                    <h2>ShopOwner</h2>
                  </li>
                  <li>
                    <h2>Transferencias</h2>
                  </li>
                  <li>
                    <h2>consultSale</h2>
                  </li>
                  <li>
                    <h2>automaticValue</h2>
                  </li>
                  <li>
                    <h2>firstName</h2>
                  </li>
                  <li>
                    <h2>grupo</h2>
                  </li>
                  <li>
                    <h2>cota</h2>
                  </li>
                  <li>
                    <h2>parcelDetails</h2>
                  </li>
                  <li>
                    <h2>history</h2>
                  </li>
                  <li>
                    <h2>slug</h2>
                  </li>
                  <li>
                    <h2>slugTenant</h2>
                  </li>
                  <li>
                    <h2>cd_repres</h2>
                  </li>
                  <li>
                    <h2>comis</h2>
                  </li>
                  <li>
                    <h2>Consorciado</h2>
                  </li>
                  <li>
                    <h2>consultor</h2>
                  </li>
                  <li>
                    <h2>Data Venda</h2>
                  </li>
                  <li>
                    <h2>equipe</h2>
                  </li>
                  <li>
                    <h2>n_contrato</h2>
                  </li>
                  <li>
                    <h2>nm_categ_comis</h2>
                  </li>
                  <li>
                    <h2>parcela</h2>
                  </li>
                  <li>
                    <h2>vend_cota</h2>
                  </li>
                  <li>
                    <h2>vlr_base_credito</h2>
                  </li>
                  <li>
                    <h2>vlr_bruto_comissao</h2>
                  </li>
                  <li></li>
                </ul>
              </ul>
              <ul className={styles.create}>
                <form onSubmit={form.handleSubmit}>
                  <input
                    disabled={true}
                    type="text"
                    onChange={form.handleChange}
                    placeholder="xxxxxxx"
                  />
                  <input
                    type="text"
                    name="shopOwner"
                    onChange={form.handleChange}
                    value={form.values.shopOwner}
                    placeholder="Dono da loja"
                  />
                  <input
                    type="text"
                    name="transfers"
                    onChange={form.handleChange}
                    value={form.values.transfers}
                    placeholder="Transferencias"
                  />
                  <input
                    type="text"
                    name="consultSale"
                    onChange={form.handleChange}
                    value={form.values.consultSale}
                    placeholder="consultSale"
                  />
                  <input
                    type="text"
                    name="automaticValue"
                    onChange={form.handleChange}
                    value={form.values.automaticValue}
                    placeholder="automaticValue"
                  />
                  <input
                    type="text"
                    name="firstName"
                    onChange={form.handleChange}
                    value={form.values.firstName}
                    placeholder="firstName"
                  />

                  <input
                    type="text"
                    name="grupo"
                    onChange={form.handleChange}
                    value={form.values.grupo}
                    placeholder="grupo"
                  />
                  <input
                    type="text"
                    name="cota"
                    onChange={form.handleChange}
                    value={form.values.cota}
                    placeholder="cota"
                  />
                  <input
                    type="text"
                    name="parcelDetails"
                    onChange={form.handleChange}
                    value={form.values.parcelDetails}
                    placeholder="parcelDetails"
                  />
                  <input
                    type="text"
                    name="history"
                    onChange={form.handleChange}
                    value={form.values.history}
                    placeholder="history"
                  />
                  <input
                    type="text"
                    name="slug"
                    onChange={form.handleChange}
                    value={form.values.slug}
                    placeholder="slug"
                  />
                  <input
                    type="text"
                    name="slugTenant"
                    onChange={form.handleChange}
                    value={form.values.slugTenant}
                    placeholder="slugTenant"
                  />
                  <input
                    type="text"
                    name="cd_repres"
                    onChange={form.handleChange}
                    value={form.values.cd_repres}
                    placeholder="cd_repres"
                  />
                  <input
                    type="text"
                    name="comis"
                    onChange={form.handleChange}
                    value={form.values.comis}
                    placeholder="comis"
                  />

                  <input
                    type="text"
                    name="consorciado"
                    onChange={form.handleChange}
                    value={form.values.consorciado}
                    placeholder="00000 0000.00 00 - Nome"
                  />
                  <input
                    type="text"
                    name="consultor"
                    onChange={form.handleChange}
                    value={form.values.consultor}
                    placeholder="consultor"
                  />
                  <input
                    type="text"
                    name="data_venda"
                    onChange={form.handleChange}
                    value={form.values.data_venda}
                    placeholder="dia/mes/ano"
                  />
                  <input
                    type="text"
                    name="equipe"
                    onChange={form.handleChange}
                    value={form.values.equipe}
                    placeholder="equipe"
                  />
                  <input
                    type="text"
                    name="n_contrato"
                    onChange={form.handleChange}
                    value={form.values.n_contrato}
                    placeholder="n_contrato"
                  />
                  <input
                    type="text"
                    name="nm_categ_comis"
                    onChange={form.handleChange}
                    value={form.values.nm_categ_comis}
                    placeholder="nm_categ_comis"
                  />
                  <input
                    type="text"
                    name="parcela"
                    onChange={form.handleChange}
                    value={form.values.parcela}
                    placeholder="parcela"
                  />
                  <input
                    type="text"
                    name="vend_cota"
                    onChange={form.handleChange}
                    value={form.values.vend_cota}
                    placeholder="vend_cota"
                  />
                  <input
                    type="text"
                    name="vlr_base_credito"
                    onChange={form.handleChange}
                    value={form.values.vlr_base_credito}
                    placeholder="vlr_base_credito"
                  />
                  <input
                    type="text"
                    name="vlr_bruto_comissao"
                    onChange={form.handleChange}
                    value={form.values.vlr_bruto_comissao}
                    placeholder="vlr_bruto_comissao"
                  />

                  <button type="submit">
                    <h1>CREATE</h1>
                  </button>
                </form>
              </ul>
              <ul className={styles.info}>
                {data.data?.map((sheet) => {
                  return (
                    <li key={sheet.id}>
                      <form
                        className={styles.dataForm}
                        onSubmit={(e) => {
                          updateInfo(e, sheet.id.toString());
                        }}
                      >
                        <div className={styles.deleteBtn}>
                          <button
                            type="button"
                            onClick={() => {
                              deleteContact(sheet.id);
                            }}
                          >
                            <p>X</p>
                          </button>
                        </div>

                        <a
                          target="_blank"
                          rel="noreferrer"
                          className={styles.inputId}
                          href={`${defaultUrl + "/details/" + sheet.id}`}
                        >
                          {sheet.id}
                        </a>
                        <input
                          type="text"
                          name="shopOwner"
                          className={`${sheet.id + "shopOwner"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "shopOwner");
                          }}
                          placeholder={`${
                            sheet.shopOwner != 0 ? sheet.shopOwner : "=="
                          }`}
                          defaultValue={sheet.shopOwner}
                        />
                        <input
                          type="text"
                          name="transfers"
                          className={`${sheet.id + "transfers"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "transfers");
                          }}
                          placeholder={`${
                            sheet.transfers != 0 ? sheet.transfers : "=="
                          }`}
                          defaultValue={sheet.transfers}
                        />
                        <input
                          type="text"
                          name="consultSale"
                          className={`${sheet.id + "consultSale"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "consultSale");
                          }}
                          placeholder={`${
                            sheet.consultSale != 0 ? sheet.consultSale : "=="
                          }`}
                          defaultValue={sheet.consultSale}
                        />
                        <input
                          type="text"
                          name="automaticValue"
                          className={`${sheet.id + "automaticValue"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "automaticValue");
                          }}
                          placeholder={`${
                            sheet.automaticValue != 0
                              ? sheet.automaticValue
                              : "=="
                          }`}
                          defaultValue={sheet.automaticValue}
                        />
                        <input
                          type="text"
                          name="firstName"
                          className={`${sheet.id + "firstName"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "firstName");
                          }}
                          placeholder={`${
                            sheet.firstName != 0 ? sheet.firstName : "=="
                          }`}
                          defaultValue={sheet.firstName}
                        />
                        <input
                          type="text"
                          name="grupo"
                          className={`${sheet.id + "grupo"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "grupo");
                          }}
                          placeholder={`${
                            sheet.grupo != 0 ? sheet.grupo : "=="
                          }`}
                          defaultValue={sheet.grupo}
                        />
                        <input
                          type="text"
                          name="cota"
                          className={`${sheet.id + "cota"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "cota");
                          }}
                          placeholder={`${sheet.cota != 0 ? sheet.cota : "=="}`}
                          defaultValue={sheet.cota}
                        />
                        <input
                          type="text"
                          name="parcelDetails"
                          className={`${sheet.id + "parcelDetails"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "parcelDetails");
                          }}
                          placeholder={`${
                            sheet.parcelDetails != 0
                              ? sheet.parcelDetails
                              : "=="
                          }`}
                          defaultValue={sheet.parcelDetails}
                        />
                        <input
                          type="text"
                          name="history"
                          className={`${sheet.id + "history"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "history");
                          }}
                          placeholder={`${
                            sheet.history != 0 ? sheet.history : "=="
                          }`}
                          defaultValue={sheet.history}
                        />
                        <input
                          type="text"
                          name="slug"
                          className={`${sheet.id + "slug"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "slug");
                          }}
                          placeholder={`${sheet.slug != 0 ? sheet.slug : "=="}`}
                          defaultValue={sheet.slug}
                        />
                        <input
                          type="text"
                          name="slugTenant"
                          className={`${sheet.id + "slugTenant"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "slugTenant");
                          }}
                          placeholder={`${
                            sheet.slugTenant != 0 ? sheet.slugTenant : "=="
                          }`}
                          defaultValue={sheet.slugTenant}
                        />
                        <input
                          type="text"
                          name="cd_repres"
                          className={`${sheet.id + "cd_repres"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "cd_repres");
                          }}
                          placeholder={`${
                            sheet.cd_repres != 0 ? sheet.cd_repres : "=="
                          }`}
                          defaultValue={sheet.cd_repres}
                        />
                        <input
                          type="text"
                          name="comis"
                          className={`${sheet.id + "comis"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "comis");
                          }}
                          placeholder={`${
                            sheet.comis != 0 ? sheet.comis : "=="
                          }`}
                          defaultValue={sheet.comis}
                        />

                        <input
                          type="text"
                          name="consorciado"
                          className={`${sheet.id + "consorciado"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "consorciado");
                          }}
                          placeholder={`${
                            sheet.consorciado != 0 ? sheet.consorciado : "=="
                          }`}
                          defaultValue={sheet.consorciado}
                        />
                        <input
                          type="text"
                          name="consultor"
                          className={`${sheet.id + "consultor"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "consultor");
                          }}
                          placeholder={`${
                            sheet.consultor != 0 ? sheet.consultor : "=="
                          }`}
                          defaultValue={sheet.consultor}
                        />
                        <input
                          type="text"
                          name="data_venda"
                          className={`${sheet.id + "data_venda"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "data_venda");
                          }}
                          placeholder={`${
                            sheet.data_venda != 0 ? sheet.data_venda : "=="
                          }`}
                          defaultValue={sheet.data_venda}
                        />
                        <input
                          type="text"
                          name="equipe"
                          className={`${sheet.id + "equipe"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "equipe");
                          }}
                          placeholder={`${
                            sheet.equipe != 0 ? sheet.equipe : "=="
                          }`}
                          defaultValue={sheet.equipe}
                        />
                        <input
                          type="text"
                          name="n_contrato"
                          className={`${sheet.id + "n_contrato"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "n_contrato");
                          }}
                          placeholder={`${
                            sheet.n_contrato != 0 ? sheet.n_contrato : "=="
                          }`}
                          defaultValue={sheet.n_contrato}
                        />
                        <input
                          type="text"
                          name="nm_categ_comis"
                          className={`${sheet.id + "nm_categ_comis"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "nm_categ_comis");
                          }}
                          placeholder={`${
                            sheet.nm_categ_comis != 0
                              ? sheet.nm_categ_comis
                              : "=="
                          }`}
                          defaultValue={sheet.nm_categ_comis}
                        />
                        <input
                          type="text"
                          name="parcela"
                          className={`${sheet.id + "parcela"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "parcela");
                          }}
                          placeholder={`${
                            sheet.parcela != 0 ? sheet.parcela : "=="
                          }`}
                          defaultValue={sheet.parcela}
                        />
                        <input
                          type="text"
                          name="vend_cota"
                          className={`${sheet.id + "vend_cota"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "vend_cota");
                          }}
                          placeholder={`${
                            sheet.vend_cota != 0 ? sheet.vend_cota : "=="
                          }`}
                          defaultValue={sheet.vend_cota}
                        />
                        <input
                          type="text"
                          name="vlr_base_credito"
                          className={`${sheet.id + "vlr_base_credito"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "vlr_base_credito");
                          }}
                          placeholder={`${
                            sheet.vlr_base_credito != 0
                              ? sheet.vlr_base_credito
                              : "=="
                          }`}
                          defaultValue={sheet.vlr_base_credito}
                        />
                        <input
                          type="text"
                          name="vlr_bruto_comissao"
                          className={`${sheet.id + "vlr_bruto_comissao"}`}
                          onChange={(e) => {
                            const valor = e.target.value;

                            setInput(valor, sheet.id + "vlr_bruto_comissao");
                          }}
                          placeholder={`${
                            sheet.vlr_bruto_comissao != 0
                              ? sheet.vlr_bruto_comissao
                              : "=="
                          }`}
                          defaultValue={sheet.vlr_bruto_comissao}
                        />

                        <button className={styles.updateBtn} type="submit">
                          <h1>ATUALIZAR</h1>
                        </button>
                      </form>
                    </li>
                  );
                })}
              </ul>
            </div>
          </main>
        </div>
      </>
    );
  }
  if (access == false && status == "authenticated") {
    return <AcessoNegado />;
  }
  if (data == 0 || status == "loading") {
    return <h1>CARREGANDO...</h1>;
  }
};
export default Painel;
