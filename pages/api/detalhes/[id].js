import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { sheetName } from '../connection'

export default async function getDetails(req, res, params) {
  // console.log('req')
  // console.log(req.query.id)
  const detalhes = await fauna.query(
    q.Get(q.Ref(q.Collection(sheetName), req.query.id)),
  )
  // console.log('detalhes')
  // console.log(detalhes)
  return res.json(detalhes)
}
