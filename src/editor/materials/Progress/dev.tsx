import { Progress as AntdProgress } from 'antd';
import { CommonComponentProps } from '../../interface';
import { useDrag } from 'react-dnd';

const Progress = ({id, percent, type, status, strokeColor, styles}: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'Progress',
      item: {
          type: 'Progress',
          dragType: 'move',
          id: id
      }
  });

  return (
    <div ref={drag} data-component-id={id} style={styles}>
      <AntdProgress 
        percent={percent}
        type={type}
        status={status}
        strokeColor={strokeColor}
      />
    </div>
  )
}

export default Progress;
