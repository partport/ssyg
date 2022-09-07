import { Button } from 'flowbite-react';

const ButtonAdd = (props) => {
  return (
    <Button pill={true} gradientMonochrome='info' onClick={props.onClick}>
      <svg
        className='w-5 h-5 mr-2'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
        />
      </svg>
      Add
    </Button>
  );
};

export default ButtonAdd;
