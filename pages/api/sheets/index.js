import { query as q } from 'faunadb'
import { fauna } from '../../../services/fauna'
import { sheetName } from '../connection'
import {
  getAllData,
  createContact,
  deleteContact,
  updateContact,
} from '../../../services/sheetdata'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const contact = await createContact(req.body)
    res.send(contact)
  } else {
    const contacts = await getAllData()
    res.json(contacts)
  }
}
