import { Form as AntdForm, DatePicker, Input } from 'antd';
import React, { forwardRef } from 'react';
import { CommonComponentProps } from '../../interface';

// 定义组件props类型，排除ref属性
type FormItemProps = Omit<CommonComponentProps, 'ref'>;

const FormItem = forwardRef<HTMLDivElement, FormItemProps>(({ id, name, children, label, type, rules, styles }, ref) => {
    return (
        <div ref={ref} style={{ ...styles }}>
            <AntdForm.Item
                name={name}
                label={label || "表单项"}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 18 }}
                rules={
                    rules === 'required' ? [{
                        required: true,
                        message: '不能为空'
                    }] : []
                }
            >
                {type === 'input' && <Input placeholder="请输入内容" />}
                {type === 'date' && <DatePicker />}
            </AntdForm.Item>
        </div>
    )
});

export default FormItem;