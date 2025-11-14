import { CommonComponentProps } from '../../interface';

const SplitContainer = ({ id, children, styles, split = 'vertical', sizes = [50, 50] }: CommonComponentProps) => {
    const childrenArray = Array.isArray(children) ? children : [children];
    
    return (
        <div style={{ 
            display: split === 'vertical' ? 'flex' : 'block',
            height: '100%',
            width: '100%',
            ...styles
        }}>
            {childrenArray.map((child, index) => (
                <div 
                    key={index}
                    style={{ 
                        flex: sizes[index] || 1,
                        padding: '10px'
                    }}
                >
                    {child || <div>区域 {index + 1}</div>}
                </div>
            ))}
        </div>
    )
}

export default SplitContainer;