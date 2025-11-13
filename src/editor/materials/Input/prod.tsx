import { Input as AntdInput } from 'antd';
import { CommonComponentProps } from '../../interface';

const Input = ({id, placeholder, size, prefix, suffix, styles}: CommonComponentProps) => {
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