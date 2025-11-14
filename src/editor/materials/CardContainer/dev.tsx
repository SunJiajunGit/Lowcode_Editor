import { useDrag } from 'react-dnd';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';
import { CommonComponentProps } from '../../interface';
import { useEffect, useRef } from 'react';
import { Card } from 'antd';

const CardContainer = ({ id, name, children, styles, title, extra }: CommonComponentProps) => {

    const {canDrop, drop } = useMaterailDrop(['Button', 'Container', 'Table', 'Form', 'DatePicker', 'Image', 'Input', 'Select', 'Switch', 'Progress', 'Tag', 'CardContainer'], id);

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
    
    return (
        <div 
            data-component-id={id}
            ref={divRef}
            style={styles}
        >
            <Card 
                title={title || '卡片标题'}
                extra={extra}
                className={`min-h-[100px] ${ canDrop ? 'border-[2px] border-[blue]' : ''}`}
                bodyStyle={{ padding: '20px' }}
            >
                {children}
            </Card>
        </div>
    )
}

export default CardContainer;