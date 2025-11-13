import { Switch as AntdSwitch } from 'antd';
import { CommonComponentProps } from '../../interface';
import { useDrag } from 'react-dnd';

const Switch = ({id, checked, size, checkedChildren, unCheckedChildren, styles}: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'Switch',
      item: {
          type: 'Switch',
          dragType: 'move',
          id: id
      }
  });

  return (
    <div ref={drag} data-component-id={id} style={styles}>
      <AntdSwitch 
        checked={checked}
        size={size}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
      />
    </div>
  )
}

export default Switch;
