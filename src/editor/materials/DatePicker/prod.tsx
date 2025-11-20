import React from 'react';
import { DatePicker as AntdDatePicker } from 'antd';
import { CommonComponentProps } from '../../interface';

const DatePicker = React.forwardRef<any, CommonComponentProps>(({id, placeholder, format, styles}, ref) => {
  return (
    <AntdDatePicker 
      ref={ref}
      data-component-id={id} 
      placeholder={placeholder} 
      format={format}
      style={styles} 
    />
  )
});

export default DatePicker;