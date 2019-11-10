import React from 'react';
import { Table, Divider, Tag, Input } from 'antd';
import 'antd/dist/antd.css';
import Util from './utils';


const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => <a href={record.url}>{text}</a>,
    },
    {
      title: 'Resource',
      dataIndex: 'resource',
      key: 'resource',
    },
    {
        title: 'User',
        dataIndex: 'user_id',
        key: 'user_id',
    },
    {
      title: 'First Commit',
      dataIndex: 'first_commit_time',
      key: 'first_commit_time',
      render: text => <span>{Util.convertDatetime(text).split("-")[0]}</span>
    },
    {
      title: 'Last Commit',
      dataIndex: 'last_commit_time',
      key: 'last_commit_time',
      render: text => <span>{Util.convertDatetime(text).split("-")[0]}</span>
    },
    {
      title: 'Last Updated',
      dataIndex: 'updated',
      key: 'updated',
      render: text => <span>{Util.convertDatetime(text)}</span>
    },
    {
        title: 'Major Language',
        dataIndex: 'major_languages',
        key: 'major_languages',
        render: langs => (
            <span>
                {langs.slice(0, 2).map((lang, ind) => {
                    let color = ind % 2 === 0 ? 'geekblue' : 'green';
                    return (
                        <Tag color={color} key={ind}>{lang}</Tag>
                    );
                    })
                }
            </span>
        ),
    },
    {
        title: 'Topics',
        dataIndex: 'topics',
        key: 'topics',
        render: topics => (
            topics.slice(0, 2).map((topic, ind) => {
                if (ind === 0){
                    return (<span key={ind}><a>{topic}</a></span>);
                }else{
                    return (
                        <span key={ind}>
                            <Divider type="vertical" />
                            <a>{topic}</a>
                        </span>
                    );
                }
            })
        ),
    },
    {
        title: 'Stars',
        dataIndex: 'stars',
        key: 'stars',
    },
    {
        title: 'Commits',
        dataIndex: 'commits',
        key: 'commits'
    },
    {
        title: 'Issues',
        dataIndex: 'issues',
        key: 'issues',
    },
    {
        title: 'Watches',
        dataIndex: 'watches',
        key: 'watches',
    },
    {
        title: 'Contributors',
        dataIndex: 'contributors',
        key: 'contributors',
    },
    // {
    //     title: 'Action',
    //     dataIndex: 'action',
    //     key: 'action',
    //     render: (text, record) => {
    //         <span>
    //             <a href={record._id}>Sync</a>
    //         </span>
    //     }
    // }
]


const GithubRepoTable = props => (
    <Table columns={columns} dataSource={props.data} pagination={{ pageSize: 10 }}/>
);

export const {Search} = Input;
export default GithubRepoTable;

