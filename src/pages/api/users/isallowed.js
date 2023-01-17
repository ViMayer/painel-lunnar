import { getAllowed, getAdmin } from './getallowed'

export default async function isAllowed(req, res) {
     const teste2 = process.env.TESTE_KEY2
  console.log(teste2)
  console.log("teste2")
  const teste = process.env.SHEET_KEY
  console.log(teste)
  console.log("SHEET_KEY")
    const teste = process.env.TESTE_KEY
  console.log(teste)
  console.log("teste")

  try {
    const response = await getAllowed(req.body.email, res)
    // console.log('respostaALLOWED')
    // console.log(response)
    return res.json(response)
  } catch (e) {
    console.log('USERS INDEX ERROR')
    console.log(e)
    return res.json(false)
  }
}
