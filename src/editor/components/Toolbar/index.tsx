import React from 'react';
import { Button, Space, message } from 'antd';
import { UndoOutlined, RedoOutlined, SaveOutlined, EyeOutlined, CodeOutlined } from '@ant-design/icons';
import { useComponetsStore } from '../../stores/components';
import { useHistoryStore } from '../../stores/history';

export function Toolbar() {
    const { mode, setMode } = useComponetsStore(); 
const { undo, redo, canUndo, canRedo } = useHistoryStore();

const handleUndo = () => {
    if (canUndo()) {
        const newComponents = undo(); 
        if (newComponents) {
            useComponetsStore.getState().setComponents(newComponents);
        }
    }
    };

    const handleRedo = () => {
        if (canRedo()) {
            const components = redo();
            if (components) {
                useComponetsStore.getState().setComponents(components);
            }
        }
    };

    const handleSave = () => {
        // 保存到本地存储
        message.success('页面已保存');
    };

    const handlePreview = () => {
        setMode(mode === 'edit' ? 'preview' : 'edit');
    };

    const handleExport = () => {
        // 导出代码功能
        message.info('导出功能开发中...');
    };

    return (
        <div style={{ 
            padding: '10px', 
            borderBottom: '1px solid #d9d9d9', 
            background: '#f5f5f5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <div>
                <h3 style={{ margin: 0 }}>低代码编辑器</h3>
            </div>
            <Space>
                <Button 
                    icon={<UndoOutlined />} 
                    onClick={handleUndo}
                    disabled={!canUndo()}
                    title="撤销 (Ctrl+Z)"
                >
                    撤销
                </Button>
                <Button 
                    icon={<RedoOutlined />} 
                    onClick={handleRedo}
                    disabled={!canRedo()}
                    title="重做 (Ctrl+Y)"
                >
                    重做
                </Button>
                <Button 
                    icon={<SaveOutlined />} 
                    onClick={handleSave}
                    title="保存 (Ctrl+S)"
                >
                    保存
                </Button>
                <Button 
                    icon={<EyeOutlined />} 
                    type={mode === 'preview' ? 'primary' : 'default'}
                    onClick={handlePreview}
                    title="预览 (Ctrl+P)"
                >
                    {mode === 'preview' ? '编辑' : '预览'}
                </Button>
                <Button 
                    icon={<CodeOutlined />} 
                    onClick={handleExport}
                    title="导出代码"
                >
                    导出
                </Button>
            </Space>
        </div>
    );
}
