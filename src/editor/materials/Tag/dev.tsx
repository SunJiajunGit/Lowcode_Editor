import { Tag as AntdTag } from 'antd';
import { CommonComponentProps } from '../../interface';
import { useDrag } from 'react-dnd';

const Tag = ({id, color, closable, children, styles}: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'Tag',
      item: {
          type: 'Tag',
          dragType: 'move',
          id: id
      }
  });

  return (
    <div ref={drag} data-component-id={id} style={styles}>
      <AntdTag 
        color={color}
        closable={closable}
      >
        {children}
      </AntdTag>
    </div>
  )
}

export default Tag;
