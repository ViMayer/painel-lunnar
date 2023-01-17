import { getInfo } from './connection'

export default async function infos(req, res) {
  const response = await getInfo(req, res)
  res.json(response)
}
