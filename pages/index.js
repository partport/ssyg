import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import CardArtist from '@/components/card/CardArtist';
import { Alert, Spinner } from 'flowbite-react';
import { getAllSong } from '@/lib/fauna';
import { findIndexMaxLvThemeInGroup } from '@/lib/fn';
const fetcher = (...args) => axios(...args).then((res) => res.data);
const API_PATH = '/api/groups';

const GroupsPage = (props) => {
  const router = useRouter();
  const { data: groupList, error } = useSWR(API_PATH, fetcher);
  if (error) {
    return (
      <Alert color='failure'>
        <span>
          <span className='font-medium'>fail to load</span>
        </span>
      </Alert>
    );
  }
  if (!groupList) {
    return (
      <div className='text-center'>
        <Spinner color='purple' size='xl' aria-label='loading...' />
        <span className='pl-3'>Loading...</span>
      </div>
    );
  }

  const handleGroup = ({ _id }) => {
    router.push(`/groups/${_id}`);
  };

  return (
    <>
      <div className='mx-auto grid grid-cols-4 gap-4'>
        {groupList.map((item) => (
          <CardArtist
            name={item.name}
            onClick={() => handleGroup(item)}
            key={item._id}
          />
        ))}
      </div>
    </>
  );
};

export default GroupsPage;

export const getStaticProps = async (ctx) => {
  const data = await getAllSong();

  return {
    props: {
      data,
    },
  };
};
