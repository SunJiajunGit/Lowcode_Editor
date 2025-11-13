import { Switch as AntdSwitch } from 'antd';
import { CommonComponentProps } from '../../interface';

const Switch = ({id, checked, size, checkedChildren, unCheckedChildren, styles}: CommonComponentProps) => {
  return (
    <div data-component-id={id} style={styles}>
      <AntdSwitch 
        checked={checked}
        size={size}
        checkedChildren={checkedChildren}
        unCheckedChildren={unCheckedChildren}
      />
    </div>
  )
}

export default Switch;
