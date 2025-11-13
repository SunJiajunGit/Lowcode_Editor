import { Select as AntdSelect } from 'antd';
import { CommonComponentProps } from '../../interface';
import { useDrag } from 'react-dnd';

const { Option } = AntdSelect;

const Select = ({id, placeholder, mode, options, styles}: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'Select',
      item: {
          type: 'Select',
          dragType: 'move',
          id: id
      }
  });

  return (
    <div ref={drag} data-component-id={id} style={styles}>
      <AntdSelect 
        placeholder={placeholder}
        mode={mode}
        style={{width: '100%'}}
      >
        {options?.map((option: any, index: number) => (
          <Option key={index} value={option.value}>{option.label}</Option>
        ))}
      </AntdSelect>
    </div>
  )
}

export default Select;
