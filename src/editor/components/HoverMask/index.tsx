import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getComponentById, useComponetsStore } from '../../stores/components';

interface HoverMaskProps {
  portalWrapperClassName: string;
  containerClassName: string
  componentId: number;
}

function HoverMask({ containerClassName, portalWrapperClassName, componentId }: HoverMaskProps) {

  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const { components } = useComponetsStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      const el = document.querySelector(`.${portalWrapperClassName}`);
      setPortalElement(el as HTMLElement);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [portalWrapperClassName]);

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  useEffect(() => {
    updatePosition();
  }, [components]);

  useEffect(() => {
    // 添加滚动事件监听
    const scrollHandler = () => {
      updatePosition();
    };
    
    // 查找滚动容器并添加滚动事件监听
    const container = document.querySelector(`.${containerClassName}`);
    if (container) {
      // 找到内部的滚动容器
      const scrollContainer = container.querySelector('.overflow-auto');
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', scrollHandler);
      }
    }
    
    return () => {
      // 清理滚动事件监听
      const container = document.querySelector(`.${containerClassName}`);
      if (container) {
        const scrollContainer = container.querySelector('.overflow-auto');
        if (scrollContainer) {
          scrollContainer.removeEventListener('scroll', scrollHandler);
        }
      }
    }
  }, []);

  function updatePosition() {
    if (!componentId) return;

    const container = document.querySelector(`.${containerClassName}`);
    if (!container) return;

    // 找到内部的滚动容器
    const scrollContainer = container.querySelector('.overflow-auto') || container;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    // 使用getBoundingClientRect获取相对位置
    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: scrollContainerTop, left: scrollContainerLeft } = scrollContainer.getBoundingClientRect();

    // 计算相对于滚动容器的位置，确保正确考虑滚动偏移
    const relativeTop = top - scrollContainerTop;
    const relativeLeft = left - scrollContainerLeft;

    let labelTop = relativeTop;
    let labelLeft = relativeLeft + width;

    if (labelTop <= 0) {
      labelTop -= -20;
    }
  
    setPosition({
      top: relativeTop,
      left: relativeLeft,
      width,
      height,
      labelTop,
      labelLeft,
    });
  }

  const curComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  // 如果portal元素不存在，不渲染任何内容
  if (!portalElement) {
    return null;
  }

  return createPortal((
    <>
      <div
        style={{
          position: "absolute",
          left: position.left,
          top: position.top,
          backgroundColor: "rgba(0, 0, 255, 0.05)",
          border: "1px dashed blue",
          pointerEvents: "none",
          width: position.width,
          height: position.height,
          zIndex: 12,
          borderRadius: 4,
          boxSizing: 'border-box',
        }}
      />
      <div
          style={{
            position: "absolute",
            left: position.labelLeft,
            top: position.labelTop,
            fontSize: "14px",
            zIndex: 13,
            display: (!position.width || position.width < 10) ? "none" : "inline",
            transform: 'translate(-100%, -100%)',
          }}
        >
          <div
            style={{
              padding: '0 8px',
              backgroundColor: 'blue',
              borderRadius: 4,
              color: '#fff',
              cursor: "pointer",
              whiteSpace: 'nowrap',
            }}
          >
            {curComponent?.desc}
          </div>
        </div>
    </>
  ), portalElement)
}

export default HoverMask;