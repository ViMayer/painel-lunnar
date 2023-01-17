// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { query as q } from 'faunadb'
import { fauna } from '../../services/fauna'
import getConso from './conso'
export const devNumber = []
export const sheetName = 'sheet' + devNumber
export const permIndex = 'allPermitted' + devNumber
export const allowedUsers = 'allowedUsers' + devNumber
export const user_by_email = 'user_by_email' + devNumber
export const allData = 'allData' + devNumber
export const user_by_consorciado = 'user_by_consorciado' + devNumber

export const getAllUsers = async (req, res) => {
  try {
    const info = await fauna.query(
      q.Map(
        q.Paginate(q.Match('allPermitted')),
        q.Lambda((x) => q.Get(x)),
      ),
    )
    // console.log('info')
    // console.log(info)
    return info
  } catch (e) {
    return
  }
}
export const getInfo = async (req, res) => {
  try {
    const info = await fauna.query(
      q.Map(
        q.Paginate(q.Match(allData)),
        q.Lambda((x) => q.Get(x)),
      ),
    )
    return info
  } catch (e) {
    return
  }
}

export const getDetails = async (req, res) => {
  try {
    const details = await fauna.query(
      q.Get(q.Ref(q.Collection(sheetName), req)),
    )
    return details
  } catch (e) {
    return
  }
}
export const createCollection = async () => {
  try {
    const collection = await fauna.query(
      q.CreateCollection({ name: sheetName }),
    )
    return collection
  } catch (e) {
    return e
  }
}

export const createIndex = async (req, res) => {
  try {
    const indexes = await fauna.query(
      q.CreateIndex({
        name: allData,
        source: q.Collection(sheetName),
      }),
    )
    return indexes
  } catch (e) {
    return
  }
}
export const createConso = async (req, res) => {
  try {
    const consos = await fauna.query(
      q.CreateIndex({
        name: user_by_consorciado,
        source: q.Collection(sheetName),
        terms: [{ field: ['data', 'consorciado'] }],
      }),
    )
    return consos
  } catch (e) {
    return
  }
}

export const makeAllData = async () => {
  try {
    const allData = await fauna.query(
      q.CreateIndex({
        name: allData,
        source: q.Collection(sheetName),
      }),
    )
    return allData
  } catch (e) {
    return
  }
}

export const setInfo = async (req, res) => {
  // Pega req.consorciado e verifica com cada consorciado presente no BD
  const consoUsed = Boolean(await getConso(req.consorciado))

  if (consoUsed != true) {
    const info = await fauna.query(
      q.Create(q.Collection(sheetName), {
        data: {
          // Dados indisponiveis
          shopOwner: req.shopOwner,
          transfers: req.transfers,
          consultSale: req.consultSale,
          automaticValue: req.automaticValue,
          firstName: req.firstName,
          grupo: req.grupo,
          cota: req.cota,
          parcelDetails: req.parcelDetails,
          history: req.history,
          slug: req.slug,
          slugTenant: req.slugTenant,
          // Dados disponiveis
          cd_repres: req.cd_repres,
          comis: req.comis,
          consorciado: req.consorciado,
          consultor: req.consultor,
          data_venda: req.data_venda,
          equipe: req.equipe,
          n_contrato: req.n_contrato,
          nm_categ_comis: req.nm_categ_comis,
          parcela: req.parcela,
          vend_cota: req.vend_cota,
          vlr_base_credito: req.vlr_base_credito,
          vlr_bruto_comissao: req.vlr_bruto_comissao,
        },
      }),
    )
    return info
  } else {
    return
  }
}
