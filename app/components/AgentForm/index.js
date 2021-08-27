/**
 *
 * AgentForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select, Slider, Button, Form, Col, Row } from 'antd';

function AgentForm({
  handleFormSubmit,
  durationRange: { minimum, maximum },
  listOfAgents,
}) {
  return (
    <Form
      onFinish={handleFormSubmit}
      layout="vertical"
      initialValues={{
        'call-duration': [minimum, maximum],
      }}
    >
      <Row gutter={24} align="bottom">
        <Col span={8}>
          <Form.Item
            label="Select Agent"
            name="agent-list"
            rules={[{ required: true, message: 'Please select agent' }]}
          >
            <Select
              mode="multiple"
              allowClear
              placeholder="Please select agent"
            >
              {listOfAgents.map(agentName => (
                <Select.Option key={agentName}>{agentName}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Select Call Duration Range" name="call-duration">
            <Slider
              range
              min={minimum}
              max={maximum}
              step={0.005}
              railStyle={{
                backgroundColor: 'white',
                height: '5px',
              }}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Get Filtered Data
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

AgentForm.propTypes = {
  handleFormSubmit: PropTypes.func,
  durationRange: PropTypes.object,
  listOfAgents: PropTypes.array,
};

export default AgentForm;
