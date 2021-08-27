/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Spin } from 'antd';
import AgentForm from '../../components/AgentForm';
import {
  AGENTS_API_URL,
  DURATION_RANGE_API_URL,
  FILTERED_CALLS_API_URL,
} from '../../utils/constants';

export default function HomePage() {
  const [listOfAgents, setListOfAgents] = useState([]);
  const [durationRange, setDurationRange] = useState({});
  const [filteredCallList, setFilteredCallList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    const getAgents = axios.get(AGENTS_API_URL);
    const getDurationRange = axios.get(DURATION_RANGE_API_URL);
    axios
      .all([getAgents, getDurationRange])
      .then(
        axios.spread((...responses) => {
          if (responses[0].status === 200 && responses[1].status === 200) {
            const agentList = responses[0].data.data.listofagents;
            const durationRangeObject = responses[1].data.data;
            setListOfAgents(agentList);
            setDurationRange(durationRangeObject);
          }
          setLoading(false);
        }),
      )
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Get request failed with error:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Agent ID',
      dataIndex: 'agent_id',
      sorter: (a, b) => a.agent_id.localeCompare(b.agent_id),
      width: '40%',
    },
    {
      title: 'Call ID',
      dataIndex: 'call_id',
      sorter: (a, b) => a.call_id - b.call_id,
      width: '30%',
    },
    {
      title: 'Call Time',
      dataIndex: 'call_time',
      sorter: (a, b) => a.call_time - b.call_time,
      width: '30%',
    },
  ];

  const handleFormSubmit = values => {
    axios
      .post(FILTERED_CALLS_API_URL, {
        info: {
          filter_agent_list: values['agent-list'],
          filter_time_range: values['call-duration'],
        },
      })
      .then(response => {
        if (response.status === 200) {
          setFilteredCallList(response.data.data);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log('Post request failed with error:', error);
      });
  };

  return !loading ? (
    <>
      <AgentForm
        handleFormSubmit={handleFormSubmit}
        durationRange={durationRange}
        listOfAgents={listOfAgents}
      />
      <Table
        rowKey={record => record.call_id}
        columns={columns}
        dataSource={filteredCallList}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ y: 320 }}
      />
    </>
  ) : (
    <Spin size="large" className="loader" />
  );
}
