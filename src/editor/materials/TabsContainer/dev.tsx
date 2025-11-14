import { useDrag } from 'react-dnd';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';
import { CommonComponentProps } from '../../interface';
import { useEffect, useRef, useState } from 'react';
import { Tabs } from 'antd';

const TabsContainer = ({ id, name, children, styles, items }: CommonComponentProps) => {

    const {canDrop, drop } = useMaterailDrop(['Button', 'Container', 'Table', 'Form', 'DatePicker', 'Image', 'Input', 'Select', 'Switch', 'Progress', 'Tag', 'TabsContainer'], id);

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

    const [activeTab, setActiveTab] = useState('1');
    
    const tabItems = items || [
        {
            key: '1',
            label: '标签页 1',
            children: children || <div className="min-h-[50px] p-[10px]">标签页内容</div>
        },
        {
            key: '2',
            label: '标签页 2',
            children: <div className="min-h-[50px] p-[10px]">标签页内容</div>
        }
    ];
    
    return (
        <div 
            data-component-id={id}
            ref={divRef}
            style={styles}
            className={`min-h-[100px] ${ canDrop ? 'border-[2px] border-[blue]' : ''}`}
        >
            <Tabs 
                activeKey={activeTab} 
                items={tabItems} 
                onChange={setActiveTab}
            />
        </div>
    )
}

export default TabsContainer;