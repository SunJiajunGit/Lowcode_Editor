import { Select as AntdSelect } from 'antd';
import { CommonComponentProps } from '../../interface';

const { Option } = AntdSelect;

const Select = ({id, placeholder, mode, options, styles}: CommonComponentProps) => {
  return (
    <div data-component-id={id} style={styles}>
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
