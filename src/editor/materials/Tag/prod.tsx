import { Tag as AntdTag } from 'antd';
import { CommonComponentProps } from '../../interface';

const Tag = ({id, color, closable, children, styles}: CommonComponentProps) => {
  return (
    <div data-component-id={id} style={styles}>
      <AntdTag 
        color={color}
        closable={closable}
      >
        {children}
      </AntdTag>
    </div>
  )
}

export default Tag;
