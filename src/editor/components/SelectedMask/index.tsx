import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { getComponentById, useComponetsStore } from '../../stores/components';
import { Dropdown, Popconfirm, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface SelectedMaskProps {
  portalWrapperClassName: string
  containerClassName: string
  componentId: number;
}

function SelectedMask({ containerClassName, portalWrapperClassName, componentId }: SelectedMaskProps) {

  const [position, setPosition] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    labelTop: 0,
    labelLeft: 0,
  });

  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  const { components, curComponentId, curComponent, deleteComponent, setCurComponentId } = useComponetsStore();

  useEffect(() => {
    // 延迟查找portal元素，确保DOM已经渲染
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
    setTimeout(() => {
      updatePosition();
    }, 200);
  }, [components]);

  useEffect(() => {
    const resizeHandler = () => {
      updatePosition();
    }
    window.addEventListener('resize', resizeHandler)
    
    // 添加滚动事件监听
    const scrollHandler = () => {
      updatePosition();
    };
    
    // 查找滚动容器并添加滚动事件监听
    const container = document.querySelector(`.${containerClassName}`);
    if (container) {
      // 找到内部的滚动容器（我们之前添加的那个）
      const scrollContainer = container.querySelector('.overflow-auto');
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', scrollHandler);
      }
    }
    
    return () => {
      window.removeEventListener('resize', resizeHandler);
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

    const scrollContainer = container.querySelector('.overflow-auto') || container;

    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;

    const { top, left, width, height } = node.getBoundingClientRect();
    const { top: scrollContainerTop, left: scrollContainerLeft } = scrollContainer.getBoundingClientRect();

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

  const curSelectedComponent = useMemo(() => {
    return getComponentById(componentId, components);
  }, [componentId]);

  function handleDelete() {
    deleteComponent(curComponentId!);
    setCurComponentId(null);
  }

  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = curComponent;

    while (component?.parentId) {
      component = getComponentById(component.parentId, components)!;
      parentComponents.push(component);
    }

    return parentComponents;

  }, [curComponent]);

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
          backgroundColor: "rgba(0, 0, 255, 0.1)",
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
          <Space>
            <Dropdown
              menu={{
                items: parentComponents.map(item => ({
                  key: item.id,
                  label: item.desc,
                })),
                onClick: ({ key }) => {
                  setCurComponentId(+key);
                }
              }}
              disabled={parentComponents.length === 0}
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
                {curSelectedComponent?.desc}
              </div>
            </Dropdown>
            {curComponentId !== 1 && (
              <div style={{ padding: '0 8px', backgroundColor: 'blue' }}>
                <Popconfirm
                  title="确认删除？"
                  okText={'确认'}
                  cancelText={'取消'}
                  onConfirm={handleDelete}
                >
                  <DeleteOutlined style={{ color: '#fff' }}/>
                </Popconfirm>
              </div>
            )}
          </Space>
        </div>
    </>
  ), portalElement)
}

export default SelectedMask;