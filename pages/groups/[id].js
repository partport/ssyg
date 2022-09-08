import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import CardArtist from '@/components/card/CardArtist';
import classNames from 'classnames';
import CardTheme from '@/components/card/CardTheme';
import { SONG_TYPE } from 'constants';
import ButtonAdd from '@/components/button/ButtonAdd';
import { Alert, Card, Spinner } from 'flowbite-react';
import {
  currentThemePoint,
  totalThemePoint,
  findIndexMaxLvThemeInGroup,
} from '@/lib/fn';

const fetcher = (...args) => axios(...args).then((res) => res.data);
const API_PATH = '/api/song';

const putEntry = async (payload) => {
  return fetch(API_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
};

const GroupsDetail = () => {
  const router = useRouter();
  const [songs, setSongs] = useState();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `${API_PATH}?groupid=${id}` : null,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setSongs(data.sort((a, b) => b.order - a.order));
    }
  }, [data]);

  if (error) {
    return (
      <Alert color='failure'>
        <span>
          <span className='font-medium'>fail to load</span>
        </span>
      </Alert>
    );
  }
  if (!songs) {
    return (
      <div className='text-center'>
        <Spinner color='purple' size='xl' aria-label='loading...' />
        <span className='pl-3'>Loading...</span>
      </div>
    );
  }

  const ARTIST = data[0].artist.name;

  const handleNewSong = () => {
    setSongs([
      {
        _id: `new${songs.length + 1}`,
        name: '',
        length: songs[0].length,
        card: Array.from(songs[0].card, () => '-'),
        type: SONG_TYPE.NORMAL,
        isNew: true,
        artist: { name: ARTIST },
        order: songs.length + 1,
      },
      ...songs,
    ]);
  };

  const handleOnCancel = () => {
    setSongs(songs.filter((v) => !v._id.startsWith('new')));
  };

  const handleAddNewTheme = async (info, item) => {
    const { status, data } = info;
    const { name, type, card, length, order, isNew } = info.data;
    // local state
    setSongs((prev) => {
      return prev.map((v) => {
        if (v.order === order) {
          return {
            _id: v._id,
            name,
            length,
            card,
            type,
            isNew,
            artist: v.artist,
            order,
          };
        } else {
          return v;
        }
      });
    });

    // upload to fauna
    let songData = {};
    if (status === 'update') {
      songData = {
        id: item._id,
        updateValue: info.data,
      };
    } else if (status === 'create') {
      songData = { name, type, card, length, order, artist: { connect: id } };
    }

    const responseResult = await putEntry(songData);
    console.log(responseResult);
    if (responseResult.response?.errors) {
      console.log(
        responseResult.response.errors.map(({ message }) => message).join('\n')
      );
      await mutate(`${API_PATH}?groupid=${id}`);
    } else {
      console.log(JSON.stringify(responseResult));
    }
  };

  // findIndexMaxLvThemeInGroup(songs)
  return (
    <div className='flex flex-col'>
      <div className='flex gap-4'>
        <div className='w-[24rem]'>
          <CardArtist name={ARTIST} />
        </div>
        <div>
          <Card>
            <p>
              {currentThemePoint(songs)}/{totalThemePoint(songs.length)}
            </p>
          </Card>
        </div>
      </div>
      <div className='flex justify-end gap-2 mb-2'>
        <ButtonAdd onClick={handleNewSong} />
      </div>
      <div className='flex gap-2 flex-col'>
        {songs.map((item) => (
          <CardTheme
            key={item._id}
            order={item.order || 0}
            name={item.name}
            type={item.type}
            grades={item.card}
            isNew={item?.isNew || false}
            onSave={(data) => handleAddNewTheme(data, item)}
            onCancel={handleOnCancel}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupsDetail;
