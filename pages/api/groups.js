import { createSong, getAllGroups } from "../../lib/fauna";

export default async function handler(req, res) {
  const handlers = {
    GET: async () => {
      const data = await getAllGroups();
      res.json(data);
    },
  };

  if (!handlers[req.method]) {
    return res.status(405).end();
  }

  await handlers[req.method]();
}
