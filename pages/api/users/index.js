import { getAllowed, getAdmin } from './getallowed'

export default async function infos(req, res) {
  // console.log('XXXXXXXXXXXXXXX')
  // console.log(req.body)
  try {
    const isdev = await getAdmin(req.body.email, res)
    if (isdev) {
      const response = await getAllowed(req.body.email, res)
      console.log('response')
      console.log(response)
      return res.json(response)
    } else {
      const response = await getAllowed(req.body.email, res)
      console.log('response')
      console.log(response)
      return res.json(response)
    }
  } catch (e) {
    console.log('USERS INDEX ERROR')
    console.log(e)
  }
}
