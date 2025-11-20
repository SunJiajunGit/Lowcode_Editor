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
        <div style={{ color: '#999', fontSize: '14px', marginBottom: '8px' }}>
        - 富文本编辑器 - {placeholder || '支持完整格式化功能'}
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: '4px',
          marginBottom: '8px'
        }}>
          <span style={{ background: '#e6f7ff', padding: '2px 4px', borderRadius: '2px', fontSize: '10px' }}>粗体</span>
          <span style={{ background: '#f6ffed', padding: '2px 4px', borderRadius: '2px', fontSize: '10px' }}>斜体</span>
          <span style={{ background: '#fff7e6', padding: '2px 4px', borderRadius: '2px', fontSize: '10px' }}>对齐</span>
          <span style={{ background: '#f9f0ff', padding: '2px 4px', borderRadius: '2px', fontSize: '10px' }}>列表</span>
          <span style={{ background: '#fff2e8', padding: '2px 4px', borderRadius: '2px', fontSize: '10px' }}>链接</span>
          <span style={{ background: '#e6fffb', padding: '2px 4px', borderRadius: '2px', fontSize: '10px' }}>图片</span>
          <span style={{ background: '#f0f5ff', padding: '2px 4px', borderRadius: '2px', fontSize: '10px' }}>表格</span>
          <span style={{ background: '#fff0f6', padding: '2px 4px', borderRadius: '2px', fontSize: '10px' }}>颜色</span>
        </div>
        <div style={{ color: '#666', fontSize: '12px', borderTop: '1px dashed #ddd', paddingTop: '8px' }}>
          {value || '点击编辑内容...'}
        </div>
      </div>
    </div>
  )
}

export default RichTextEditor;