import { GraphQLClient, gql } from 'graphql-request';

const CLIENT_SECRET =
  process.env.FAUNA_ADMIN_KEY || process.env.FAUNA_CLIENT_SECRET;
const FAUNA_GRAPHQL_BASE_URL = 'https://graphql.fauna.com/graphql';

const graphQLClient = new GraphQLClient(FAUNA_GRAPHQL_BASE_URL, {
  headers: {
    authorization: `Bearer ${CLIENT_SECRET}`,
  },
});

export const getAllSong = async () => {
  const query = gql`
    query getAllSong {
      all_song(_size: 9999) {
        data {
          _id
          name
          type
          artist {
            name
          }
          card
        }
      }
    }
  `;

  const {
    all_song: { data },
  } = await graphQLClient.request(query);

  return data;
};

export const createSong = async (newSong) => {
  const SongInput = {
    input: newSong,
  };
  const mutation = gql`
    mutation CreateSong($input: SongInput!) {
      createSong(data: $input) {
        _id
        name
        type
        artist {
          name
          _id
        }
        length
        card
      }
    }
  `;

  try {
    const { createSong } = await graphQLClient.request(mutation, SongInput);
    return createSong;
  } catch (error) {
    const errorResponse = JSON.stringify(error, undefined, 2);
    console.error(errorResponse);

    return error;
  }
};

export const updateSongCard = async (id, data) => {
  const SongInput = {
    id,
    data,
  };
  console.log(SongInput);
  const mutation = gql`
    mutation updateSong($id: ID!, $data: SongInput!) {
      updateSong(id: $id, data: $data) {
        name
        card
        order
      }
    }
  `;

  try {
    const { updateSong } = await graphQLClient.request(mutation, SongInput);
    return updateSong;
  } catch (error) {
    const errorResponse = JSON.stringify(error, undefined, 2);
    console.error(errorResponse);

    return error;
  }
};

export const getAllGroups = async () => {
  const query = gql`
    query getAllGroups {
      all_groups(_size: 100) {
        data {
          _id
          name
          card_position
        }
      }
    }
  `;

  const {
    all_groups: { data },
  } = await graphQLClient.request(query);

  return data;
};

export const listSongByGroup = async (id) => {
  const groupId = {
    input: id,
  };
  const query = gql`
    query listSongByGroup($input: String!) {
      listSongByGroup(id: $input) {
        data {
          _id
          order
          name
          type
          card
          length
          artist {
            name
          }
        }
      }
    }
  `;
  try {
    const {
      listSongByGroup: { data },
    } = await graphQLClient.request(query, groupId);

    return data;
  } catch (error) {
    const errorResponse = JSON.stringify(error, undefined, 2);
    console.error(errorResponse);

    return error;
  }
};
