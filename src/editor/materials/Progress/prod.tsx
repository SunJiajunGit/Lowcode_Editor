import { Progress as AntdProgress } from 'antd';
import { CommonComponentProps } from '../../interface';

const Progress = ({id, percent, type, status, strokeColor, styles}: CommonComponentProps) => {
  return (
    <div data-component-id={id} style={styles}>
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
