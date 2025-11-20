import { Form as AntdForm, Input } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';
import { CommonComponentProps } from '../../interface';
import { useDrag } from 'react-dnd';

function FormItem({ id, name, children, label, styles }: CommonComponentProps) {
    const {canDrop, drop } = useMaterailDrop([], id);

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
            className={`w-[100%] p-[10px] min-h-[60px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
            ref={divRef}
            data-component-id={id}
            style={{ ...styles }}
        >
            <AntdForm.Item 
                label={label || "表单项"} 
                labelCol={{ span: 6 }} 
                wrapperCol={{ span: 18 }}
                style={{ marginBottom: 0 }}
            >
                <Input style={{pointerEvents: 'none'}} placeholder="请输入内容" />
            </AntdForm.Item>
        </div>
    )
}

export default FormItem;