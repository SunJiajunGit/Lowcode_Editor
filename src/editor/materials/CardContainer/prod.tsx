import { Card } from 'antd';
import { CommonComponentProps } from '../../interface';

const CardContainer = ({ id, children, styles, title, extra }: CommonComponentProps) => {
    return (
        <Card 
            title={title || '卡片标题'}
            extra={extra}
            style={styles}
            bodyStyle={{ padding: '20px' }}
        >
            {children}
        </Card>
    )
}

export default CardContainer;