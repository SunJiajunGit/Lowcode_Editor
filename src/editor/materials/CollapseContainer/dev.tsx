import { useDrag } from 'react-dnd';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';
import { CommonComponentProps } from '../../interface';
import { useEffect, useRef } from 'react';
import { Collapse } from 'antd';

const CollapseContainer = ({ id, name, children, styles, items }: CommonComponentProps) => {

    const {canDrop, drop } = useMaterailDrop(['Button', 'Container', 'Table', 'Form', 'DatePicker', 'Image', 'Input', 'Select', 'Switch', 'Progress', 'Tag', 'CollapseContainer'], id);

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
    
    const collapseItems = items || [
        {
            key: '1',
            label: '折叠面板 1',
            children: children || <div className="min-h-[50px] p-[10px]">面板内容</div>
        }
    ];
    
    return (
        <div 
            data-component-id={id}
            ref={divRef}
            style={styles}
            className={`min-h-[100px] ${ canDrop ? 'border-[2px] border-[blue]' : ''}`}
        >
            <Collapse items={collapseItems} defaultActiveKey={['1']} />
        </div>
    )
}

export default CollapseContainer;