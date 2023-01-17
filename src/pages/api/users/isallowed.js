import { getAllowed, getAdmin } from './getallowed'

export default async function isAllowed(req, res) {
  const teste = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
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
