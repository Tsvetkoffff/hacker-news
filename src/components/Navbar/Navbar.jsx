import { Row, Col } from 'antd';
import React from 'react';

const Navbar = () => {
  return (
    <Row justify='space-between'>
      <Col className='ant-menu ant-menu-dark'>
        Hacker News
      </Col>
    </Row>
  );
};

export default Navbar;
