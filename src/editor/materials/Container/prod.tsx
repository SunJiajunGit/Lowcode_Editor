import React from 'react';
import { CommonComponentProps } from '../../interface';

const Container = React.forwardRef<HTMLDivElement, CommonComponentProps>(({ id, children, styles }, ref) => {
    return (
        <div 
            ref={ref}
            style={styles}
            className={`p-[20px]`}
        >{children}</div>
    )
});

export default Container;