import { getAllowed, getAdmin } from './getallowed'

export default async function isAllowed(req, res) {
  const teste = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  console.log(teste)
  console.log("teste")
    const teste2 = process.env.TESTE_KEY
  console.log(teste2)
  console.log("teste2")
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
