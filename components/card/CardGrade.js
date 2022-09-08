import classNames from 'classnames';
import { CARD_GRADE } from 'constants';
import { TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';

const CardGrade = (props) => {
  const { grade, isEdit, onCardEdit } = props;
  const [cardGrade, setCardGrade] = useState(grade.toUpperCase());
  const ref = useRef();

  const handleOnBlurInput = (value) => {
    setCardGrade(value.toUpperCase());
    onCardEdit(value);
  };

  return (
    <>
      <div
        className={classNames(
          'w-16 rounded-lg flex items-center justify-center shadow-lg uppercase text-center',
          {
            'p-4': !isEdit,
            'p-2': isEdit,
            'bg-pink-500': cardGrade.startsWith(CARD_GRADE.R),
            'bg-yellow-300': cardGrade.startsWith(CARD_GRADE.S),
            'bg-purple-800': cardGrade.startsWith(CARD_GRADE.A),
            'bg-red-600': cardGrade.startsWith(CARD_GRADE.B),
            'bg-gray-400': cardGrade.startsWith(CARD_GRADE.C),
            'bg-gray-300':
              cardGrade.startsWith(CARD_GRADE.NONE) || cardGrade === '',
          }
        )}
      >
        {isEdit ? (
          <TextInput
            id='small'
            type='text'
            sizing='sm'
            defaultValue={cardGrade}
            onKeyUp={(el) => handleOnBlurInput(el.target.value)}
            maxLength={3}
            className='uppercase'
          />
        ) : (
          cardGrade
        )}
      </div>
    </>
  );
};

export default CardGrade;
