import React from 'react';
import { useDrag } from 'react-dnd';
import { CommonComponentProps } from '../../interface';

const RichTextEditor = ({ id, value, placeholder, styles }: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'RichTextEditor',
      item: {
          type: 'RichTextEditor',
          dragType: 'move',
          id: id
      }
  });

  return (
    <div ref={drag} data-component-id={id} style={styles}>
      <div style={{ 
        border: '1px solid #d9d9d9', 
        borderRadius: '6px', 
        padding: '8px 12px',
        minHeight: '120px',
        backgroundColor: '#fafafa'
      }}>
        <div style={{ color: '#999', fontSize: '14px' }}>
          富文本编辑器 - {placeholder || '请输入内容'}
        </div>
        <div style={{ marginTop: '8px', color: '#666' }}>
          {value || '双击编辑内容...'}
        </div>
      </div>
    </div>
  )
}

export default RichTextEditor;