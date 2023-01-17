import { getAllPermitted } from "./allpermitted";

export default async function infos(req, res) {
  const response = await getAllPermitted(req, res);
  res.json(response);
}
