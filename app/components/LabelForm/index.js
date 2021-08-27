/**
 *
 * LabelForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select, Button, Form, Col, Row } from 'antd';

function LabelForm({ handleFormSubmit, callList, labelList }) {
  return (
    <Form onFinish={handleFormSubmit} layout="vertical">
      <Row gutter={24} align="bottom">
        <Col span={6}>
          <Form.Item
            label="Select Call ID"
            name="call-list"
            rules={[{ required: true, message: 'Please select call ID' }]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select call id"
            >
              {callList.map(callItem => (
                <Select.Option key={callItem.call_id}>
                  {callItem.call_id}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item label="Select Labels to Add" name="add-labels">
            <Select
              mode="tags"
              allowClear
              placeholder="Please select labels to add"
            >
              {labelList.map(label => (
                <Select.Option key={label}>{label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Select Labels to Remove" name="remove-labels">
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select labels to remove"
            >
              {labelList.map(label => (
                <Select.Option key={label}>{label}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add/Remove Labels
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

LabelForm.propTypes = {
  handleFormSubmit: PropTypes.func,
  callList: PropTypes.array,
  labelList: PropTypes.array,
};

export default LabelForm;
