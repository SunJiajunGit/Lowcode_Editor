import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Component } from './components';

interface HistoryState {
    history: Component[][];
    historyIndex: number;
    maxHistorySize: number;
}

interface HistoryAction {
    addHistory: (components: Component[]) => void;
    undo: () => Component[] | null;
    redo: () => Component[] | null;
    canUndo: () => boolean;
    canRedo: () => boolean;
    clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState & HistoryAction>()(
    persist(
        (set, get) => ({
            history: [],
            historyIndex: -1,
            maxHistorySize: 50,

            addHistory: (components) => {
                const { history, historyIndex, maxHistorySize } = get();
                
                // 深拷贝组件状态
                const newComponents = JSON.parse(JSON.stringify(components));
                
                // 如果当前不是历史记录的最新位置，移除后面的记录
                const newHistory = history.slice(0, historyIndex + 1);
                newHistory.push(newComponents);
                
                // 限制历史记录大小
                if (newHistory.length > maxHistorySize) {
                    newHistory.shift();
                }
                
                set({ 
                    history: newHistory, 
                    historyIndex: newHistory.length - 1 
                });
            },

            undo: () => {
                const { history, historyIndex } = get();
                if (historyIndex > 0) {
                    const newIndex = historyIndex - 1;
                    set({ historyIndex: newIndex });
                    return JSON.parse(JSON.stringify(history[newIndex]));
                }
                return null;
            },

            redo: () => {
                const { history, historyIndex } = get();
                if (historyIndex < history.length - 1) {
                    const newIndex = historyIndex + 1;
                    set({ historyIndex: newIndex });
                    return JSON.parse(JSON.stringify(history[newIndex]));
                }
                return null;
            },

            canUndo: () => {
                const { historyIndex } = get();
                return historyIndex > 0;
            },

            canRedo: () => {
                const { history, historyIndex } = get();
                return historyIndex < history.length - 1;
            },

            clearHistory: () => {
                set({ history: [], historyIndex: -1 });
            },
        }),
        {
            name: 'lowcode-history-storage',
        }
    )
);
