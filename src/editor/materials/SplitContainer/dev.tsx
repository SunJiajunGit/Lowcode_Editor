import { useDrag } from 'react-dnd';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';
import { CommonComponentProps } from '../../interface';
import { useEffect, useRef } from 'react';
import { Splitter } from 'antd';

const SplitContainer = ({ id, name, children, styles, split = 'vertical', sizes = [50, 50] }: CommonComponentProps) => {

    const {canDrop, drop } = useMaterailDrop(['Button', 'Container', 'Table', 'Form', 'DatePicker', 'Image', 'Input', 'Select', 'Switch', 'Progress', 'Tag', 'SplitContainer'], id);

    const divRef = useRef<HTMLDivElement>(null);

    const [_, drag] = useDrag({
        type: name,
        item: {
            type: name,
            dragType: 'move',
            id: id
        }
    });

    useEffect(() => {
        drop(divRef);
        drag(divRef);
    }, []);
    
    const childrenArray = Array.isArray(children) ? children : [children];
    
    return (
        <div 
            data-component-id={id}
            ref={divRef}
            style={styles}
            className={`min-h-[100px] ${ canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >
            <div style={{ 
                display: split === 'vertical' ? 'flex' : 'block',
                height: '100%',
                width: '100%'
            }}>
                {childrenArray.map((child, index) => (
                    <div 
                        key={index}
                        style={{ 
                            flex: sizes[index] || 1,
                            minHeight: '50px',
                            padding: '10px',
                            border: '1px dashed #ccc'
                        }}
                    >
                        {child || <div>区域 {index + 1}</div>}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SplitContainer;