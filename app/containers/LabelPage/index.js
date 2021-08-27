/**
 *
 * LabelPage
 *
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table, Spin } from 'antd';
import LabelForm from '../../components/LabelForm';
import {
  CALL_LIST_API_URL,
  LABEL_LIST_API_URL,
  APPLY_LABELS_API_URL,
} from '../../utils/constants';

export default function LabelPage() {
  const [callList, setCallList] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    const headers = {
      'Content-Type': 'application/json',
      user_id: '24b456',
    };
    const getCallList = axios.get(CALL_LIST_API_URL, { headers });
    const getlabelList = axios.get(LABEL_LIST_API_URL, { headers });

    axios
      .all([getCallList, getlabelList])
      .then(
        axios.spread((...responses) => {
          if (responses[0].status === 200 && responses[1].status === 200) {
            const callListArray = responses[0].data.data.call_data;
            const labelListArray = responses[1].data.data.unique_label_list;
            setCallList(callListArray);
            setLabelList(labelListArray);
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

  const handleFormSubmit = values => {
    const callListValues = values['call-list'];
    const addLabelValues = values['add-labels'];
    const removeLabelValues = values['remove-labels'];
    const labelOperations = [];
    if (addLabelValues) {
      labelOperations.push(
        ...addLabelValues.map(label => ({
          name: label,
          op: 'add',
        })),
      );
    }
    if (removeLabelValues) {
      labelOperations.push(
        ...removeLabelValues.map(label => ({
          name: label,
          op: 'remove',
        })),
      );
    }
    if (addLabelValues || removeLabelValues) {
      axios
        .post(
          APPLY_LABELS_API_URL,
          {
            operation: {
              callList: callListValues.map(Number),
              label_ops: labelOperations,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              user_id: '24b456',
            },
          },
        )
        .then(response => {
          if (response.status === 200) {
            const callListArr = [...callList];
            // Update callList and labelList state after getting response
            callListValues.forEach(callID => {
              // considering call_id to match with array index
              const callObject = { ...callList[callID] };

              if (addLabelValues) {
                addLabelValues.forEach(label => {
                  if (!callObject.label_id.includes(label)) {
                    callObject.label_id.push(label);
                  }
                  if (!labelList.includes(label)) {
                    setLabelList([...labelList, label]);
                  }
                });
              }

              if (removeLabelValues) {
                removeLabelValues.forEach(label => {
                  const labelIndex = callObject.label_id.indexOf(label);
                  if (labelIndex !== -1) {
                    callObject.label_id.splice(labelIndex, 1);
                  }
                });
              }

              callListArr[callID] = callObject;
            });
            setCallList(callListArr);
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log('Post request failed with error:', error);
        });
    }
  };

  const columns = [
    {
      title: 'Call ID',
      dataIndex: 'call_id',
      sorter: (a, b) => a.call_id - b.call_id,
      width: '40%',
    },
    {
      title: 'Label',
      dataIndex: 'label_id',
      sorter: (a, b) => a.label_id.length - b.label_id.length,
      width: '60%',
      render: labels => labels.join(', '),
    },
  ];

  return !loading ? (
    <>
      <LabelForm
        handleFormSubmit={handleFormSubmit}
        callList={callList}
        labelList={labelList}
      />
      <Table
        rowKey={record => record.call_id}
        columns={columns}
        dataSource={callList}
        pagination={{ pageSize: 10 }}
        bordered
        scroll={{ y: 320 }}
      />
    </>
  ) : (
    <Spin size="large" className="loader" />
  );
}
