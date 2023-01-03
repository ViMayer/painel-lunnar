import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { deletePermitted } from '../../../services/sheetdata'

export default async function handler(req, res) {
  console.log('Deletando: req.body.email')
  console.log(req.body.email)
  try {
    console.log('DELETING')
    // pegar email voltar com id
    const response = await fauna.query(
      q.Get(q.Match(q.Index('user_by_email'), req.body.email)),
    )
    console.log('response.ref')
    console.log(response.ref.id)
    const contact = await deletePermitted(response.ref.id)
    console.log('EEEEE')

    return res.send(contact)
  } catch {
    return res.json({ status: 400 })
  }
}
