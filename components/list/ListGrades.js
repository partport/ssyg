import classNames from 'classnames';
import CardGrade from '../card/CardGrade';

const ListGrades = (props) => {
  const { grades, isEdit, onCardEdit } = props;
  const quantity = Math.min(6,grades.length);
  return (
    <div
      className={classNames(
        'flex gap-2 flex-wrap text-white font-bold font-mono',
        `w-[${quantity * 64 + (quantity - 1) * 8}px]`,
      )}
    >
      {grades.map((card, index) => (
        //w-16 = 64px
        <CardGrade
          key={index}
          grade={card}
          isEdit={isEdit}
          onCardEdit={onCardEdit}
        />
      ))}
    </div>
  );
};

export default ListGrades;
