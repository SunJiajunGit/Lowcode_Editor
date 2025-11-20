import { Form as AntdForm, DatePicker, Input } from 'antd';
import React, { forwardRef, ForwardRefRenderFunction, useEffect, useImperativeHandle, useMemo } from 'react';
import { CommonComponentProps } from '../../interface';
import dayjs from 'dayjs';

export interface FormRef {
    submit: () => void
}

// 定义组件props类型，排除ref属性
type FormProps = Omit<CommonComponentProps, 'ref'>;

const Form: ForwardRefRenderFunction<FormRef, FormProps> = ({ children, onFinish }, ref)  => {
    const [form] = AntdForm.useForm();

    useImperativeHandle(ref, () => {
        return {
            submit: () => {
                form.submit();
            }
        }
    }, [form]);

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
                rules: item.props?.rules,
            }
        });
    }, [children]);

    async function save(values: any) {
        Object.keys(values).forEach(key => {
            if (dayjs.isDayjs(values[key])) {
                values[key] = values[key].format('YYYY-MM-DD')
            }
        })

        onFinish && onFinish(values);
    }

    return <AntdForm name='form' labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} form={form} onFinish={save}>
        {formItems.map((item: any) => {
            return (
                <AntdForm.Item
                    key={item.name}
                    name={item.name}
                    label={item.label}
                    rules={
                        item.rules === 'required' ? [{
                            required: true,
                            message: '不能为空'
                        }] : []
                    }
                >
                    {item.type === 'input' && <Input />}
                    {item.type === 'date' && <DatePicker />}
                </AntdForm.Item>
            )
        })}
    </AntdForm>
}

export default forwardRef(Form);