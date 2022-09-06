import Image from 'next/image';
import { motion } from 'framer-motion';

const CardArtist = (props) => {
  const { name, onClick } = props;

  return (
    <motion.div
      className='card shadow-sm'
      onClick={onClick}
      style={onClick && { cursor: 'pointer' }}
      whileHover={
        onClick && {
          scale: 1.2,
          transition: { duration: 0.2 },
        }
      }
      whileTap={onClick && { scale: 0.9 }}
    >
      <div className='card-img-top'>
        <Image
          src={`/groups/${name}.png`}
          alt={name}
          layout='responsive'
          width={292}
          height={212}
          objectFit='cover'
          objectPosition={'top'}
        />
      </div>
      <div className='card-body py-1'>
        <p className='card-text text-center lead'>{name}</p>
      </div>
    </motion.div>
  );
};

export default CardArtist;
