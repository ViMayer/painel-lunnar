import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { allowedUsers } from '../connection'

export default async function checkEmail(req, res) {
  try {
    const dados = {
      email: req.body.email,
    }

    try {
      const response = await fauna.query(
        q.Get(q.Match(q.Index('user_by_email'), dados.email)),
      )
      let teste = Boolean(response)
      console.log('teste')
      console.log(teste)
      return res.json(teste)
    } catch (e) {
      const banana = false
      console.log('banana')
      console.log(banana)
      return res.json(false)
    }
  } catch (e) {
    console.log('ERRO CHECKEMAIL')
    console.log(e)
    return res.json({ status: 300 })
  }
}
