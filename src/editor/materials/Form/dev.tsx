import { Form as AntdForm, Input } from 'antd';
import React, { useEffect, useMemo, useRef } from 'react';
import { useMaterailDrop } from '../../hooks/useMaterailDrop';
import { CommonComponentProps } from '../../interface';
import { useDrag } from 'react-dnd';

function Form({ id, name, children, onFinish }: CommonComponentProps) {
    const [form] = AntdForm.useForm();

    const {canDrop, drop } = useMaterailDrop(['FormItem'], id);

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

    // 自动命名数组
    const autoLabels = ['姓名', '联系方式', '住址', '绩点'];

    const formItems = useMemo(() => {
        if (!children) return [];
        
        const childrenArray = React.Children.toArray(children);
        return childrenArray.map((item: any, index: number) => {
            // 根据子项的顺序自动设置标签名
            const autoLabel = autoLabels[index] || `表单项${index + 1}`;
            
            return {
                label: item.props?.label || autoLabel,
                name: item.props?.name || `field${index + 1}`,
                type: item.props?.type || 'input',
                id: item.props?.id,
            }
        });
    }, [children]);

    return <div
        className={`w-[100%] p-[20px] min-h-[100px] ${canDrop ? 'border-[2px] border-[blue]' : 'border-[1px] border-[#000]'}`}
        ref={divRef}
        data-component-id={id}
    >
        <AntdForm labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} form={form} onFinish={(values) =>{
            onFinish && onFinish(values)
        }}>
            {formItems.map((item: any) => {
                return (
                    <AntdForm.Item 
                        key={item.id || item.name} 
                        data-component-id={item.id} 
                        name={item.name}
                        label={item.label}
                    >
                        <Input style={{pointerEvents: 'none'}}/>
                    </AntdForm.Item>
                );
            })}
        </AntdForm>
    </div>
}

export default Form;