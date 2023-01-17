import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { stringify } from 'querystring'
import { sheetName } from '../connection'

export default async function updateInfo(req, res) {
  const dados = {
    id: req.body.id,
    shopOwner: req.body.shopOwner,
    transfers: req.body.transfers,
    consultSale: req.body.consultSale,
    automaticValue: req.body.automaticValue,
    firstName: req.body.firstName,
    grupo: req.body.grupo,
    cota: req.body.cota,
    parcelDetails: req.body.parcelDetails,
    history: req.body.history,
    slug: req.body.slug,
    slugTenant: req.body.slugTenant,
    cd_repres: req.body.cd_repres,
    comis: req.body.comis,
    consorciado: req.body.consorciado,
    consultor: req.body.consultor,
    data_venda: req.body.data_venda,
    equipe: req.body.equipe,
    n_contrato: req.body.n_contrato,
    nm_categ_comis: req.body.nm_categ_comis,
    parcela: req.body.parcela,
    vend_cota: req.body.vend_cota,
    vlr_base_credito: req.body.data_venda,
    vlr_bruto_comissao: req.body.vlr_bruto_comissao,
  }

  try {
    const updated = await fauna.query(
      q.Update(q.Ref(q.Collection(sheetName), dados.id), {
        data: {
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
          consorciado: dados.consorciado,
          consultor: dados.consultor,
          data_venda: dados.data_venda,
          equipe: dados.equipe,
          n_contrato: dados.n_contrato,
          nm_categ_comis: dados.nm_categ_comis,
          parcela: dados.parcela,
          vend_cota: dados.vend_cota,
          vlr_base_credito: dados.data_venda,
          vlr_bruto_comissao: dados.vlr_bruto_comissao,
        },
      }),
    )
    return res.status(200).json(updated)
  } catch (e) {
    return res.status(400).json(e)
  }
}
