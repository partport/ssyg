import { GraphQLClient, gql } from "graphql-request";

const CLIENT_SECRET =
  process.env.FAUNA_ADMIN_KEY || process.env.FAUNA_CLIENT_SECRET;
const FAUNA_GRAPHQL_BASE_URL = "https://graphql.fauna.com/graphql";

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
