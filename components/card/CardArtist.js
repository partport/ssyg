import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from 'flowbite-react';

const CardArtist = (props) => {
  const { name, onClick } = props;

  return (
    <motion.div
      whileHover={
        onClick && {
          scale: 1.1,
          transition: { duration: 0.2 },
        }
      }
      whileTap={onClick && { scale: 0.9 }}
    >
      <Card
        onClick={onClick}
        imgSrc={`/groups/${name}.png`}
        imgAlt={name}
      >
        <h5 className='text-2xl text-center tracking-tight text-gray-900 dark:text-white font-mono'>
          {name}
        </h5>
      </Card>
    </motion.div>
  );
};

export default CardArtist;
