import { Tabs } from 'antd';
import { CommonComponentProps } from '../../interface';

const TabsContainer = ({ id, children, styles, items }: CommonComponentProps) => {
    const tabItems = items || [
        {
            key: '1',
            label: '标签页 1',
            children: children || <div>标签页内容</div>
        },
        {
            key: '2',
            label: '标签页 2',
            children: <div>标签页内容</div>
        }
    ];
    
    return (
        <Tabs items={tabItems} defaultActiveKey="1" style={styles} />
    )
}

export default TabsContainer;