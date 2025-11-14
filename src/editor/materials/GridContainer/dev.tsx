import { useDrag } from 'react-dnd';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';
import { CommonComponentProps } from '../../interface';
import { useEffect, useRef } from 'react';
import { Row, Col } from 'antd';

const GridContainer = ({ id, name, children, styles, cols = 2, gutter = 16 }: CommonComponentProps) => {

    const {canDrop, drop } = useMaterailDrop(['Button', 'Container', 'Table', 'Form', 'DatePicker', 'Image', 'Input', 'Select', 'Switch', 'Progress', 'Tag', 'GridContainer'], id);

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

    // 将子元素分配到栅格列中
    const renderGridItems = () => {
        if (!children) return null;
        
        const childrenArray = Array.isArray(children) ? children : [children];
        const span = 24 / cols;
        
        return childrenArray.map((child, index) => (
            <Col key={index} span={span}>
                <div className="min-h-[50px] p-[10px] border border-dashed border-gray-300">
                    {child}
                </div>
            </Col>
        ));
    };
    
    return (
        <div 
            data-component-id={id}
            ref={divRef}
            style={styles}
            className={`min-h-[100px] p-[20px] ${ canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        >
            <Row gutter={gutter}>
                {renderGridItems()}
            </Row>
        </div>
    )
}

export default GridContainer;