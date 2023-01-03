import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { allowedUsers } from '../connection'

export default async function newUser(req, res) {
  try {
    const dados = {
      email: req.body.email,
      name: req.body.name,
      status: req.body.status,
      admin: req.body.admin,
    }
    const info = await fauna.query(
      q.Create(q.Collection(allowedUsers), {
        data: {
          email: dados.email,
          name: dados.name,
          status: dados.status,
          admin: dados.admin,
        },
      }),
    )
    res.json({ dados })
  } catch (e) {
    console.log(e)
  }
}
