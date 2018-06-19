import React from 'react';
import {Card,Row,Col} from 'antd';
const Analysis = () => {
  return(
    <div>
      <Row gutter={8}>
        <Col span={6}>
          <Card title="Card title" extra={<a href="javascript:;">More</a>}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Card title" extra={<a href="javascript:;">More</a>}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Card title" extra={<a href="javascript:;">More</a>}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Card title" extra={<a href="javascript:;">More</a>}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default Analysis;