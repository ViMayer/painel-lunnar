import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { findPermitted } from '../../../services/sheetdata'

export default async function handler(req, res) {
  console.log('req')
  console.log(req.body.email)
  try {
    console.log('FindingAAA ')
    // pegar email voltar com id
    const response = await fauna.query(
      q.Get(q.Match(q.Index('user_by_email'), req.body.email)),
    )
    console.log('Finding2')
    console.log(response)

    return res.json({ response })
  } catch {
    return res.send(false)
  }
}
