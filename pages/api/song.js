import {
  createSong,
  getAllSong,
  listSongByGroup,
  updateSongCard,
} from '../../lib/fauna';

export default async function handler(req, res) {
  const handlers = {
    GET: async () => {
      const { groupid } = req.query;
      if (groupid) {
        const data = await listSongByGroup(groupid);
        res.json(data);
      } else {
        const data = await getAllSong();
        res.json(data);
      }
    },

    POST: async () => {
      const {
        body: { name, type, artist, length, card, order, id, updateValue },
      } = req;
      if (id) {
        const updateCard = await updateSongCard(id,updateValue);
        res.json(updateCard);
      } else {
        const created = await createSong({
          name,
          type,
          artist,
          length,
          card,
          order
        });

        res.json(created);
      }
    },
  };

  if (!handlers[req.method]) {
    return res.status(405).end();
  }

  await handlers[req.method]();
}
