import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { sheetName } from '../connection'
import {
  getAllData,
  createContact,
  deleteContact,
} from '../../../services/sheetdata'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    await deleteContact(req.query.ref)
    res.json({ a: true })
  }
  return
}
