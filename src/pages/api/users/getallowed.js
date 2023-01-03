import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { user_by_email } from '../connection'

export const getAllowed = async (req) => {
  try {
    const checkAllowed = await fauna.query(
      q.Get(q.Match(q.Index(user_by_email), req)),
    )
    // console.log('checkAllowed.data')
    // console.log(checkAllowed.data)
    return checkAllowed.data
  } catch (e) {
    console.log('GET ALLOWED ERROR')
    return
  }
}

// export const getAdmin = async (req, res) => {
//   try {
//     const checkAllowed = await fauna.query(
//       q.Get(q.Match(q.Index(user_by_email), req)),
//     )
//     // console.log(' Is admin? :')
//     // console.log(checkAllowed.data.admin)
//     const isAllowed = Boolean(checkAllowed.data.admin)
//     // console.log('checkAllowed')
//     // console.log(checkAllowed)
//     return res.json(checkAllowed)
//   } catch (e) {
//     console.log('get admin error')
//     return
//   }
// }
