import { Card } from 'flowbite-react';
import ListGrades from '../list/ListGrades';

const CardThemeTopFive = (props) => {
  const { themes, topFive } = props;
  return (
    <div className='flex p-4 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col overflow-auto'>
      <div className='flex h-full flex-col justify-center gap-2 p-2'>
        {topFive.map(({ id, point }) => {
          const data = themes.find(({ _id }) => _id === id);
          return (
            <div className='grid grid-cols-2' key={id}>
              <p className='font-normal text-gray-700 dark:text-gray-400'>{data.name}</p>
              <ListGrades grades={data.card} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardThemeTopFive;
