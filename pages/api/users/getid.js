import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { findPermitted } from '../../../services/sheetdata'

export default async function handler(req, res) {
  console.log('req')
  console.log(req.body)
  try {
    console.log('FindingAAA ')
    // pegar email voltar com id
    const response = await fauna.query(
      q.Get(q.Match(q.Index('user_by_email'), req.body)),
    )
    console.log('Finding2')
    console.log(response.query)
    const contact = await findPermitted(response)
    console.log('Finding3')

    return res.send(contact)
  } catch {
    return
  }
}
