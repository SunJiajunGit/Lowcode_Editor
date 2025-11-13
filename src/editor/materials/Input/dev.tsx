import { Input as AntdInput } from 'antd';
import { CommonComponentProps } from '../../interface';
import { useDrag } from 'react-dnd';

const Input = ({id, placeholder, size, prefix, suffix, styles}: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'Input',
      item: {
          type: 'Input',
          dragType: 'move',
          id: id
      }
  });

  return (
    <AntdInput 
      data-component-id={id} 
      placeholder={placeholder}
      size={size}
      prefix={prefix}
      suffix={suffix}
      style={styles}
    />
  )
}

export default Input;