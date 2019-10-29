
const RawData = [
    {   
        id: 1,
        // attributes
        name: "python",
        major_languages: ['C', 'python'],
        current_version: '4.0',
        first_commit: '1995-01-01',
        last_commit: '2019-10-26',
        doc_site: 'https://docs.python.org',
        // metrics
        stars: 10000,
        contributors: 100,
        commits: 100000,
        issues: 100,
        forks: 1000,
        watches: 100,
        resource: 'github'
    },
    {   
        id: 2,
        // attributes
        name: "mxnet",
        major_languages: ['C', 'python', 'CUDA'],
        current_version: '1.5.1',
        first_commit: '2015-01-01',
        last_commit: '2019-10-26',
        doc_site: 'https://docs.mxnet.org',
        // metrics
        stars: 8888,
        contributors: 88,
        commits: 8888,
        issues: 88,
        forks: 888,
        watches: 8,
        resource: 'github'
    },
    {   
        id: 3,
        // attributes
        name: "airlfow",
        major_languages: ['C', 'python'],
        current_version: '1.9.0',
        first_commit: '2014-01-01',
        last_commit: '2019-10-26',
        doc_site: 'https://docs.airflow.org',
        // metrics
        stars: 6666,
        contributors: 666,
        commits: 6666,
        issues: 66,
        forks: 666,
        watches: 66,
        resource: 'github'
    },
    {   
        id: 4,
        // attributes
        name: "python",
        major_languages: ['C', 'python'],
        current_version: '4.0',
        first_commit: '1995-01-01',
        last_commit: '2019-10-26',
        doc_site: 'https://docs.python.org',
        // metrics
        stars: 10000,
        contributors: 100,
        commits: 100000,
        issues: 100,
        forks: 1000,
        watches: 100,
        resource: 'github'
    },
    {   
        id: 5,
        // attributes
        name: "mxnet",
        major_languages: ['C', 'python', 'CUDA'],
        current_version: '1.5.1',
        first_commit: '2015-01-01',
        last_commit: '2019-10-26',
        doc_site: 'https://docs.mxnet.org',
        // metrics
        stars: 8888,
        contributors: 88,
        commits: 8888,
        issues: 88,
        forks: 888,
        watches: 8,
        resource: 'github'
    },
    {   
        id: 6,
        // attributes
        name: "airlfow",
        major_languages: ['C', 'python'],
        current_version: '1.9.0',
        first_commit: '2014-01-01',
        last_commit: '2019-10-26',
        doc_site: 'https://docs.airflow.org',
        // metrics
        stars: 6666,
        contributors: 666,
        commits: 6666,
        issues: 66,
        forks: 666,
        watches: 66,
        resource: 'github'
    },
]

const GithubData = {
    attr_columns: ['id', 'name', 'major_languages', 'current_version', 'first_commit', 'last_commit', 'doc_site', 'resource'],
    metric_columns: ['stars', 'contributors', 'commits', 'issues', 'forks', 'watches'],
    attr_values: [],
    metric_values: [],
}
RawData.forEach(item => {
    let attr_row = [];
    GithubData.attr_columns.forEach(col => {
        attr_row.push(item[col]);
    });
    GithubData.attr_values.push(attr_row);
    let metric_row = [];
    GithubData.metric_columns.forEach(col => {
        metric_row.push(item[col]);
    });
    GithubData.metric_values.push(metric_row);    
})


export default GithubData;
