import classNames from 'classnames';
import CardGrade from '../card/CardGrade';

const ListGrades = (props) => {
  const { grades, isEdit, onCardEdit } = props;
  const handleOnCardEdit = (data, index) => {
    onCardEdit(data, index);
  };
  return (
    <div
      className={classNames(
        'flex gap-2 flex-wrap text-white font-bold font-mono',
        'w-[26.5rem]'
      )}
    >
      {grades.map((card, index) => (
        <CardGrade
          key={index}
          grade={card}
          isEdit={isEdit}
          onCardEdit={(data) => handleOnCardEdit(data, index)}
        />
      ))}
    </div>
  );
};

export default ListGrades;
