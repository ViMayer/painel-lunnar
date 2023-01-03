import { GoogleSpreadsheet } from 'google-spreadsheet'
import {
  createCollection,
  createIndex,
  setInfo,
  makeAllData,
  createConso,
} from './connection'

export default async function Sheets(req, res) {
  const idPrania = '1rrd1uzxQxqElefzs64U03AVvTzUW0kwHp83Tkz0EX54'

  const doc = new GoogleSpreadsheet(idPrania)

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  })

  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]
  const rows = await sheet.getRows()

  // Salvar dados
  const bills = rows.map(
    ({
      cd_repres,
      nm_categ_comis,
      parcela,
      consorciado,
      vend_cota,
      equipe,
      comis,
      n_contrato,
      vlr_base_credito,
      data_venda,
      vlr_bruto_comissao,
      consultor,
    }) => {
      return {
        cd_repres,
        nm_categ_comis,
        parcela,
        consorciado,
        vend_cota,
        equipe,
        comis,
        n_contrato,
        vlr_base_credito,
        data_venda,
        vlr_bruto_comissao,
        consultor,
      }
    },
  )
  const dados = {
    shopOwner: 'SO',
    transfers: [],
    consultSale: [],
    automaticValue: [],
    firstName: 'FN',
    grupo: 'GP',
    cota: 'CT',
    parcelDetails: [],
    history: [],
    slug: 'SL',
    shopOwnerSlug: 'SOL',
    slugTenant: 'STE',
  }

  // Make Index
  const createDataBase = async () => {
    try {
      createCollection().then(
        function () {
          Object.entries(dados).forEach(([key, value]) => {
            createIndex(key, value)
          })
          Object.entries(dados).forEach(([key, value]) => {
            createConso(key, value)
          })
        },
        function (error) {
          console.log('ERRO:' + error)
          return
        },
      )
    } catch (e) {
      console.log('Erro encontrado: ' + e)
    }
  }
  createDataBase()
  // melhorar se possivel
  const createAllData = async () => {
    makeAllData()
  }
  createAllData()
  // Salvando dados
  const salvaDados = async (data) => {
    // Como 'dados' sera criado dentro da funcao da aplicacao nao receberemos ele atraves do bills
    let newData = [{ ...dados, ...data }]
    newData.map(setInfo)
  }
  const mapDados = async (data) => {
    // Para cada tabela do gooogle sheet
    bills.map(salvaDados)
  }
  mapDados(req)
  res.json(bills)
}
