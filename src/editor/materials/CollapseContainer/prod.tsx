import { Collapse } from 'antd';
import { CommonComponentProps } from '../../interface';

const CollapseContainer = ({ id, children, styles, items }: CommonComponentProps) => {
    const collapseItems = items || [
        {
            key: '1',
            label: '折叠面板 1',
            children: children || <div>面板内容</div>
        }
    ];
    
    return (
        <Collapse items={collapseItems} defaultActiveKey={['1']} style={styles} />
    )
}

export default CollapseContainer;