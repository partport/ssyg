import {
  Card,
  Badge,
  TextInput,
  Select,
} from 'flowbite-react';
import CardGrade from '@/components/card/CardGrade';
import { SONG_TYPE } from 'constants';
import { useRef, useState } from 'react';
import ButtonEdit from '../button/ButtonEdit';
import ButtonDelete from '../button/ButtonDelete';
import ButtonSave from '../button/ButtonSave';

const CardTheme = (props) => {
  const { name, order, type, grades, isNew, onSave, onCancel } = props;
  const [isEdit, setIsEdit] = useState(false);
  const [themeName, setThemeName] = useState(name);
  const [card, setCard] = useState(grades);
  const refName = useRef();
  const refOrder = useRef();
  const refType = useRef([]);

  const handleOnEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleOnSave = () => {
    const name = refName.current.value;
    const order = parseInt(refOrder.current.value);
    setIsEdit(false);
    setThemeName(name);
    if (!isNew) {
      const data = {
        status: 'update',
        data: {
          order,
          name,
          card,
        },
      };
      onSave(data)
    } else {
      const type = refType.current.value;
      const data = {
        status: 'create',
        data: {
          order,
          name,
          type,
          length: card.length,
          card,
          isNew:!isNew
        },
      };
      onSave(data)
    }
  };
  const handleOnCancel = () => {
    setIsEdit(false);
    onCancel();
  };

  const handleCardChange = (data, index) => {
    setCard((prev) => {
      prev.splice(index, 1, data);
      return [...prev];
    });
  };

  return (
    <Card>
      <div className='grid gap-4 grid-cols-2'>
        <div className='flex flex-col'>
          <div className='flex items-center gap-2 mb-2'>
            {isEdit || isNew ? (
              <>
                <div className='w-14'>
                  <TextInput id='order' defaultValue={order} type='number' ref={refOrder}/>
                </div>
                <TextInput
                  id='name'
                  type='text'
                  defaultValue={themeName}
                  ref={refName}
                />
              </>
            ) : (
              <h3 className='text-2xl font-bold tracking-tight text-gray-900'>
                {themeName}
              </h3>
            )}
            {(type === SONG_TYPE.LIMITED || type === SONG_TYPE.EVENT) && (
              <Badge color={type === SONG_TYPE.LIMITED ? 'warning' : 'pink'}>
                {type}
              </Badge>
            )}
            {isNew && (
              <div className='w-24'>
                <Select id='songType' ref={refType}>
                  {Object.keys(SONG_TYPE).map((item, index) => (
                    <option key={item}>{item}</option>
                  ))}
                </Select>
              </div>
            )}
          </div>
          <div className='flex gap-2'>
            {!isNew && <ButtonEdit onClick={handleOnEdit} />}
            {(isEdit || isNew) && (
              <>
                <ButtonSave onClick={handleOnSave} />
                <ButtonDelete onClick={handleOnCancel} />
              </>
            )}
          </div>
        </div>
        <div className='flex gap-2 flex-wrap text-white text-sm font-bold font-mono w-[30rem]'>
          {grades.map((card, index) => (
            <CardGrade
              grade={card}
              key={index}
              isEdit={isEdit || isNew}
              onCardEdit={(data) => handleCardChange(data, index)}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CardTheme;
