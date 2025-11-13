import { DatePicker as AntdDatePicker } from 'antd';
import { CommonComponentProps } from '../../interface';
import { useDrag } from 'react-dnd';

const DatePicker = ({id, placeholder, format, styles}: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'DatePicker',
      item: {
          type: 'DatePicker',
          dragType: 'move',
          id: id
      }
  });

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