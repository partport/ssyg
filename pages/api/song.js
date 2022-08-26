import { createSong, getAllSong } from "../../lib/fauna";

export default async function handler(req, res) {
  const handlers = {
    GET: async () => {
      const data = await getAllSong();
      res.json(data);
    },

    POST: async () => {
      const {
        body: { name, type, artist, length, card },
      } = req;
      const created = await createSong({
        name,
        type,
        artist,
        length,
        card,
      });

      res.json(created);
    },
  };

  if (!handlers[req.method]) {
    return res.status(405).end();
  }

  await handlers[req.method]();
}
