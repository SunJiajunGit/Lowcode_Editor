import { Row, Col } from 'antd';
import { CommonComponentProps } from '../../interface';

const GridContainer = ({ id, children, styles, cols = 2, gutter = 16 }: CommonComponentProps) => {
    const childrenArray = Array.isArray(children) ? children : [children];
    const span = 24 / cols;
    
    return (
        <Row gutter={gutter} style={styles}>
            {childrenArray.map((child, index) => (
                <Col key={index} span={span}>
                    {child}
                </Col>
            ))}
        </Row>
    )
}

export default GridContainer;