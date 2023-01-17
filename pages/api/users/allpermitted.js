import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { permIndex } from '../connection'

export const getAllPermitted = async (req, res) => {
  try {
    const info = await fauna.query(
      q.Map(
        q.Paginate(q.Match(permIndex)),
        q.Lambda((x) => q.Get(x)),
      ),
    )
    return info
  } catch (e) {
    return
  }
}

export default async function infos(req, res) {
  console.log('bghghg')
  const response = await getAllPermitted(req, res)
  res.json(response)
}
