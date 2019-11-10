import React from 'react';
import Util from './utils';
import Config from './config';
import GithubRepoTable, { Search } from './table';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
        };
        this.filterByName = this.filterByName.bind(this);
    }

    filterByName(text){
        const api = Config.host + Config.RepoListFetchAPI;
        let params = text ? {name: text} : {};
        Util.get(
            api, params,
            data => (this.setState({data: data.map(record => ({key: record._id, ...record}))}))
        );
    }

    componentDidMount(){
        this.filterByName();
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="Search By Name"
                    onSearch={this.filterByName}
                    style={{ width: 200, margin: 10 }}
                />
                <GithubRepoTable data={this.state.data}/>
            </div>
        );
    }
};

export default App;
