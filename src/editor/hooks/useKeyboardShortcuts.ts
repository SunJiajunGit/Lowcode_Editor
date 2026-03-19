import { useEffect } from 'react';
import { useComponetsStore } from '../stores/components';
import { useHistoryStore } from '../stores/history';

export function useKeyboardShortcuts() {
    const { deleteComponent, curComponentId, setComponents } = useComponetsStore();
    const { undo, redo, canUndo, canRedo } = useHistoryStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // 撤销: Ctrl+Z 或 Command+Z
            if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
                e.preventDefault();
                if (canUndo()) {
                    const components = undo();
                    if (components) {
                        setComponents(components);
                    }
                }
            }

            // 重做: Ctrl+Y 或 Ctrl+Shift+Z 或 Command+Shift+Z
            if (((e.ctrlKey || e.metaKey) && e.key === 'y') || 
                ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z')) {
                e.preventDefault();
                if (canRedo()) {
                    const components = redo();
                    if (components) {
                        setComponents(components);
                    }
                }
            }

            // 删除: Delete 或 Backspace
            if ((e.key === 'Delete' || e.key === 'Backspace') && curComponentId) {
                e.preventDefault();
                deleteComponent(curComponentId);
            }

            // 复制: Ctrl+C 或 Command+C
            if ((e.ctrlKey || e.metaKey) && e.key === 'c' && curComponentId) {
                e.preventDefault();
                // TODO: 实现复制功能
                console.log('复制组件:', curComponentId);
            }

            // 粘贴: Ctrl+V 或 Command+V
            if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
                e.preventDefault();
                // TODO: 实现粘贴功能
                console.log('粘贴组件');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [curComponentId, deleteComponent, setComponents, undo, redo, canUndo, canRedo]);
}
