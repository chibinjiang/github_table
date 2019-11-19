import React from 'react';
import {Divider, Table, Tag} from 'antd';
import Config from './config';
import {Search} from './table';
import Util from "./utils";

const columnsOfTable = [
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
                    return (<span key={ind}><a href={"https://github.com/topics/" + topic}>{topic}</a></span>);
                }else{
                    return (
                        <span key={ind}>
                            <Divider type="vertical" />
                            <a href={"https://github.com/topics/" + topic}>{topic}</a>
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
];


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            pagination: {
                current: 0,
                pageSize: 10
            },  // {page: , size: , total: }
            loading: false,
            // filters: {},
            // sorter: {}
        };
        this.filterByName = this.filterByName.bind(this);
    }

    static convertFilters(filters) {
        // 解析 filters: {field: values}
        let filterBy = '';
        let count = 0;
        for (let field in filters) {
            if (filters[field] && count === 0) {
                filterBy += `${field}:${filters[field][0]}`;
            }else{
                filterBy += ','
            }
            count += 1;
        }
        return filterBy;
    }

    static convertSorter(sorter) {
        // 解析 sorter
        let sortBy = '';
        for (let field in sorter) {
            sortBy += (sorter[field] === 'ascend' ? '' : '-') + sorter[field];
        }
        if (sortBy.length === 0) {
            // return '-created';
            return '-stars';
        }
        return sortBy;
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log("pagination: ", pagination);
        // 点击页数, 翻页
        // 解析 Ant 传入的参数:
        // pagination: {current: , pageSize: , total: }
        // filters: {filed: [], }, 暂不用

        // 解析 pagination
        this.setState({ pagination: pagination});
        const sortBy = App.convertSorter(sorter);
        const filterBy = App.convertFilters(filters);

        // fetch data
        this.fetchData({
            page: pagination.current,
            size: pagination.pageSize,
            sortBy: sortBy,
            filterBy: filterBy,
        });
    };

    fetchData(params = {}) {
        // 访问接口, 更新table data, 将 Ant design的参数转为自定义的参数
        this.setState({loading: true});
        // 解析 filter 参数
        let api_params = {
            page: params.page,
            size: params.size,
            sort_by: params.sortBy || '',
            filter_by: params.filterBy || '',
        };
        console.log("api_params: ", api_params);
        let _url = new URL(Config.host + Config.RepoListFetchAPI);
        Object.keys(api_params).forEach(key => _url.searchParams.append(key, api_params[key]));
        fetch(_url)
            .then(response => (response.json()))
            .then((responseData) => {
                console.log("responseData: ", responseData);
                const pagination = {...this.state.pagination};
                pagination.total = responseData.total;  // 更新 total
                this.setState({data: responseData.repos, loading: false, pagination: pagination});
            });
        console.log("After Fetch: ", this.state)
    }

    componentDidMount() {
        this.fetchData({
            page: 1,
            size: 10,
            filterBy: '',
            // sortBy: '-created'
            sortBy: '-stars'
        });  // 第一次加载
    }

    filterByName(name) {
        // 调用 handle Table Change
        let filters = {};
        if (name){
            filters.name = [name];
        }
        this.handleTableChange({current: 1, pageSize: 10}, filters, {})
    }

    resetFilter() {
        this.setState({filters: {}})
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="Search By Name"
                    onSearch={this.filterByName}
                    style={{width: 200, margin: 10}}
                />
                <Table
                    columns={columnsOfTable}
                    dataSource={this.state.data}
                    rowKey={record => record._id}
                    loading={this.state.loading}
                    pagination={this.state.pagination}
                    onChange={this.handleTableChange}
                />
            </div>
        );
    }
};

export default App;
