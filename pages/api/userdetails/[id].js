import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { allowedUsers, sheetName } from '../connection'

export default async function userDetails(req, res, params) {
  console.log('req---------------------')
  console.log(req.query.id)
  const userdetails = await fauna.query(
    q.Get(q.Ref(q.Collection(allowedUsers), req.query.id)),
  )

  return res.json(userdetails)
}
