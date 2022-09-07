import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import CardArtist from '../../components/CardArtist';
import classNames from 'classnames';
import CardTheme from '@/components/theme/CardTheme';
import { SONG_TYPE } from 'constants';
import { Button } from 'flowbite-react';
import ButtonAdd from '@/components/button/ButtonAdd';

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

const CardRow = (props) => {
  const { order, name, type, card, isNew, onSave, onCancel } = props;
  const refCard = useRef([]);
  const ref = useRef([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isNewCard, setIsNewCard] = useState(false);

  const handleOnEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleOnCancel = () => {
    setIsEdit(false);
    onCancel(false);
  };

  const handleOnSave = () => {
    const cardValue = refCard.current.map((input) => input.value);
    const order = parseInt(ref.current.find((v) => v.name === 'order').value);
    const name = ref.current.find((v) => v.name === 'name').value;

    if (isNew) {
      const type = ref.current.find((v) => v.name === 'type').value;
      console.log(type);
      const newSong = {
        kind: 'createSong',
        data: {
          order,
          name,
          type,
          length: cardValue.length,
          card: cardValue,
        },
      };
      onSave(newSong);
    } else {
      const updateCard = {
        kind: 'updateCard',
        data: {
          order,
          name,
          card: cardValue,
        },
      };
      onSave(updateCard);
    }
    setIsEdit(false);
  };

  return (
    <tr>
      <th scope='row' className='col-md-3'>
        {isEdit || isNew ? (
          <div className='row g-1'>
            <div className='col-md-3'>
              <input
                className='form-control '
                type='number'
                name='order'
                placeholder={order}
                defaultValue={order}
                ref={(el) => ref.current.push(el)}
              />
            </div>
            <div className='col-md-9'>
              <input
                className='form-control '
                type='text'
                name='name'
                placeholder={name}
                defaultValue={name}
                ref={(el) => ref.current.push(el)}
              />
            </div>
          </div>
        ) : (
          name
        )}
      </th>
      <td className='text-uppercase'>
        {isNew ? (
          <select
            className='form-select'
            ref={(el) => ref.current.push(el)}
            name='type'
          >
            {Object.keys(SONG_TYPE).map((item) => (
              <option key={item} defaultValue={item}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <span
            className={classNames('badge', {
              'text-bg-light': type === SONG_TYPE.NORMAL,
              'text-bg-warning': type === SONG_TYPE.LIMITED,
              'text-bg-danger': type === SONG_TYPE.EVENT,
            })}
          >
            {type}
          </span>
        )}
      </td>
      {card.map((pos, index) => (
        <td key={index} className='text-uppercase'>
          {isEdit || isNew ? (
            <input
              className='form-control  text-uppercase'
              type='text'
              placeholder={pos}
              defaultValue={pos}
              ref={(el) => (refCard.current[index] = el)}
            />
          ) : (
            pos
          )}
        </td>
      ))}
      <td className='col-md-1'>
        {isEdit || isNew ? (
          <div className='row g-1'>
            <div className='col'>
              <button
                className='btn btn-primary w-100'
                type='button'
                onClick={handleOnSave}
              >
                save
              </button>
            </div>
            <div className='col'>
              <button
                className='btn btn-danger w-100'
                type='button'
                onClick={handleOnCancel}
              >
                cancel
              </button>
            </div>
          </div>
        ) : (
          <button className='btn btn-dark' type='button'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-pencil-square'
              viewBox='0 0 16 16'
              onClick={handleOnEdit}
            >
              <path d='M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z' />
              <path
                fillRule='evenodd'
                d='M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z'
              />
            </svg>
          </button>
        )}
      </td>
    </tr>
  );
};

const GroupsDetail = () => {
  const router = useRouter();
  const [songs, setSongs] = useState();
  const { id } = router.query;
  const { data, error } = useSWR(
    id ? `${API_PATH}?groupid=${id}` : null,
    fetcher,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (data) {
      setSongs(data.sort((a, b) => b.order - a.order));
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!songs) return <div>loading...</div>;

  const ARTIST = data[0].artist.name;

  const handleOnSave = async (data, item) => {
    let songData = {};
    if (data.kind === 'updateCard') {
      songData = {
        id: item._id,
        updateValue: data.data,
      };
    } else if (data.kind === 'createSong') {
      const { name, type, card, length, order } = data.data;
      songData = { name, type, card, length, order, artist: { connect: id } };
    }
    console.log(songData);

    // const responseResult = await putEntry(songData);
    // console.log(responseResult);
    // if (responseResult.response?.errors) {
    //   console.log(
    //     responseResult.response.errors.map(({ message }) => message).join('\n')
    //   );
    //   await mutate(`${API_PATH}?groupid=${id}`);
    // } else {
    //   console.log(JSON.stringify(responseResult));
    // }
  };

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

  return (
    <div>
      <div className='w-25'>
        <CardArtist name={ARTIST} />
      </div>
      {/* <table className='table align-middle'>
        <tbody>
          {songs.map((item, index) => (
            <CardRow
              key={item._id}
              order={item.order || 0}
              name={item.name}
              card={item.card}
              type={item.type}
              isNew={item?.isNew || false}
              onSave={(data) => handleOnSave(data, item)}
              onCancel={handleOnCancel}
            />
          ))}
        </tbody>
      </table> */}
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
