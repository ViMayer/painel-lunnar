import { getAllUsers } from '../connection'

export default async function users(req, res) {
  const response = await getAllUsers(req, res)
  res.json(response)
}
