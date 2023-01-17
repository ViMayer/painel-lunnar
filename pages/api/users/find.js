import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { findPermitted } from '../../../services/sheetdata'

export default async function handler(req, res) {
  console.log('req.body.email')
  console.log(req.body.email)
  try {
    console.log('Finding')
    // pegar email voltar com id
    const response = await fauna.query(
      q.Get(q.Match(q.Index('user_by_email'), req.body.email)),
    )
    console.log('Finding2')
    console.log(response.ref.id)
    const contact = await findPermitted(response.ref.id)
    console.log('Finding3')

    return res.send(contact)
  } catch {
    return
  }
}
