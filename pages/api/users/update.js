import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { updatePermitted } from '../../../services/sheetdata'
import { user_by_email } from '../connection'

export default async function handler(req, res) {
  console.log('=========================')
  console.log('req update user:')
  console.log(req.body)
  try {
    const response = await fauna.query(
      q.Get(q.Match(q.Index(user_by_email), req.body.email)),
    )
    const contact = await updatePermitted(
      response.ref.id,
      req.body.email,
      req.body.name,
      req.body.admin,
      req.body.status,
    )
    return res.send(contact)
    return
  } catch {
    return
  }
}
