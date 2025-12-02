import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useComponentConfigStore } from "../../stores/component-config";
import { MaterialItem, MaterialItemProps } from "../MaterialItem";

export function Material() {
    const { componentConfig } = useComponentConfigStore();
    const [visibleItems, setVisibleItems] = useState<MaterialItemProps[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement>(null);
    const pageSize = 10; // 每页显示10个物料

    // 获取所有组件配置（过滤Page组件）
    const allComponents = useMemo(() => {
        return Object.values(componentConfig)
            .filter(item => item.name !== 'Page')
            .map(item => ({ name: item.name, desc: item.desc }));
    }, [componentConfig]);

    // 加载指定页码的数据
    const loadPage = useCallback((page: number) => {
        setLoading(true);
        
        // 模拟异步加载（实际项目中可能是从API获取数据）
        setTimeout(() => {
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const newItems = allComponents.slice(startIndex, endIndex);
            
            setVisibleItems(prev => page === 1 ? newItems : [...prev, ...newItems]);
            setHasMore(endIndex < allComponents.length);
            setLoading(false);
        }, 200); // 模拟网络延迟
    }, [allComponents]);

    // 初始化加载第一页
    useEffect(() => {
        setCurrentPage(1);
        loadPage(1);
    }, [loadPage]);

    // 设置IntersectionObserver监听
    useEffect(() => {
        if (loading || !hasMore) return;

        // 清理之前的observer
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // 创建新的observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading && hasMore) {
                    const nextPage = currentPage + 1;
                    setCurrentPage(nextPage);
                    loadPage(nextPage);
                }
            },
            {
                rootMargin: '0px 0px 200px 0px', // 提前200px触发，提升用户体验
                threshold: 0.1
            }
        );

        // 开始观察
        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        // 清理函数
        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [loading, hasMore, currentPage, loadPage]);

    return (
        <div 
            className="overflow-y-auto h-full"
            style={{ maxHeight: 'calc(100vh - 130px)' }} // 确保容器有固定高度以便滚动
        >
            {visibleItems.map((item) => (
                <MaterialItem 
                    key={item.name} // 使用name作为key更稳定
                    name={item.name} 
                    desc={item.desc} 
                />
            ))}
            
            {/* 加载更多的占位元素 */}
            {hasMore && (
                <div 
                    ref={loadMoreRef} 
                    className="text-center py-4"
                >
                    {loading ? '加载中...' : ''}
                </div>
            )}
            
        </div>
    );
}