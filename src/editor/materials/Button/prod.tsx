import React from 'react';
import { Button as AntdButton } from 'antd';
import { CommonComponentProps } from '../../interface';

const Button = React.forwardRef<any, CommonComponentProps>(({id, type, text, styles, ...props}, ref) => {
  return (
    <AntdButton ref={ref} type={type} style={styles} {...props}>{text}</AntdButton>
  )
});

export default Button;