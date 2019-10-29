import React from 'react';
import GithubData from './data';
import GithubTable from  './github_table';


class App extends React.Component{
  render() {
      return (
          <div>
              <GithubTable {...GithubData}/>
          </div>
      );
  }
};

export default App;
