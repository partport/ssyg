import axios from 'axios';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import CardArtist from '@/components/card/CardArtist';
import { Alert, Spinner } from 'flowbite-react';
import { getAllSong } from '@/lib/fauna';
import { findTopFiveTheme } from '@/lib/fn';
import CardGrade from '@/components/card/CardGrade';
import ListGrades from '@/components/list/ListGrades';
import CardThemeTopFive from '@/components/card/CardThemeTopFive';
const fetcher = (...args) => axios(...args).then((res) => res.data);
const API_PATH = '/api/groups';

const GroupsPage = (props) => {
  const { themes } = props;

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

  const TOP_FIVE_THEME = findTopFiveTheme(themes);

  return (
    <>
      <CardThemeTopFive themes={themes} topFive={TOP_FIVE_THEME}/>
      <div className='mx-auto grid grid-cols-4 gap-4 mt-4'>
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
      themes: data,
    },
  };
};
