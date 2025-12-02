import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

export interface MaterialItemProps {
    name: string
    desc: string
}

// 使用React.memo包装组件，避免不必要的重渲染
export const MaterialItem = React.memo(function MaterialItem(props: MaterialItemProps) {
    const { name, desc } = props;

    // 使用useCallback缓存drag函数（虽然在这个简单场景中不是必须的，但这是个好习惯）
    const [_, drag] = useDrag(() => ({
        type: name,
        item: {
            type: name
        }
    }));

    return (
        <div
            ref={drag}
            className='
                border-dashed
                border-[1px]
                border-[#000]
                py-[8px] px-[10px] 
                m-[10px]
                cursor-move
                inline-block
                bg-white
                hover:bg-[#ccc]
            '
        >
            {desc}
        </div>
    );
});