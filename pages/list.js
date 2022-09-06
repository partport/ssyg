import { Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { useState } from 'react';
import { ReorderIcon } from '../components/DragIcon';
const initialItems = ['🍅 Tomato', '🥒 Cucumber', '🧀 Cheese', '🥬 Lettuce'];

const ListPage = () => {
  const [items, setItems] = useState(initialItems);

  return (
    <Reorder.Group
      axis='y'
      onReorder={setItems}
      values={items}
      className='list'
    >

      {items.map((item) => (
        <Item key={item} item={item}/>
      ))}
    </Reorder.Group>
  );
};

const Item = ({ item }) => {
  const y = useMotionValue(0);
  // const boxShadow = useRaisedShadow(y);
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      id={item}
      // style={{ boxShadow, y }}
      dragListener={false}
      dragControls={dragControls}
      className="item"
    >
      <span>{item}</span>

      <ReorderIcon dragControls={dragControls} />
    </Reorder.Item>
  );
};

export default ListPage;
