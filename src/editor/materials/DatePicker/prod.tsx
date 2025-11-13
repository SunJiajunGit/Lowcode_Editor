import { DatePicker as AntdDatePicker } from 'antd';
import { CommonComponentProps } from '../../interface';

const DatePicker = ({id, placeholder, format, styles}: CommonComponentProps) => {
  return (
    <AntdDatePicker 
      data-component-id={id} 
      placeholder={placeholder} 
      format={format}
      style={styles} 
    />
  )
}

export default DatePicker;