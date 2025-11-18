import React from 'react';
import { useDrag } from 'react-dnd';
import { CommonComponentProps } from '../../interface';

const LocationPicker = ({ id, value, placeholder, styles }: CommonComponentProps) => {

  const [_, drag] = useDrag({
      type: 'LocationPicker',
      item: {
          type: 'LocationPicker',
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
        backgroundColor: '#fafafa'
      }}>
        <div style={{ color: '#999', fontSize: '14px' }}>
          位置选择器 - {placeholder || '请选择位置'}
        </div>
        <div style={{ marginTop: '8px', color: '#666' }}>
          {value || '当前位置：未选择'}
        </div>
      </div>
    </div>
  )
}

export default LocationPicker;