import React from 'react';
import Styles from './styles';

class AttributeHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<th style={Styles.HeaderCell}>{this.props.value}</th>);
    }
}


class AttributeCell extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if (Array.isArray(this.props.value)){
            return (<td style={Styles.cell}>{this.props.value.join(', ')}</td>)
        }
        return (
            <td style={Styles.cell}>{this.props.value}</td>
        );
    }
}


class MetricHeader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (<th style={Styles.HeaderCell}>{this.props.value}</th>);
    }
}

class MetricCell extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (<td style={Styles.cell}>{this.props.value}</td>);
    }
}


class Header extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <thead>
                <tr>
                    {this.props.attributes.map((th, idx) => (<AttributeHeader key={idx} value={th}/>))}
                    {this.props.metrics.map((th, idx) => (<MetricHeader key={idx} value={th}/>))}
                </tr>
            </thead>
        )
    }

}

class Row extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const row_style = this.props.index % 2 === 0 ? Styles.Row : {};
        return (
            <tr style={row_style}>
                {this.props.attributes.map((td, idx) => (<AttributeCell key={idx} value={td}/>))}
                {this.props.metrics.map((td, idx) => (<MetricCell key={idx} value={td}/>))}
            </tr>
        )
    }
}

class GithubTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            attr_columns: this.props.attr_columns,
            metric_columns: this.props.metric_columns,
            attr_values: this.props.attr_values,
            metric_values: this.props.metric_values,
        }
        this.filterByName = this.filterByName.bind(this);
 
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    

    filterByName(event){
        let name = event.target.value;  // 只能取一次
        this.setState(function(preState){ 
            let new_attrs = [];
            let new_metrics = [];
            if(! name){
                return {
                    attr_columns: this.props.attr_columns,
                    metric_columns: this.props.metric_columns,
                    attr_values: this.props.attr_values,
                    metric_values: this.props.metric_values,
                };
            }
            // 要和 this.props.attr_values比较, 因为state中的attr_values会变化
            for (let i=0; i<this.props.attr_values.length; i++){
                if (name && this.props.attr_values[i][1] === name){
                    new_attrs.push(this.props.attr_values[i]);
                    new_metrics.push(this.props.metric_values[i]);
                }
            }
            return {
                attr_columns: preState.attr_columns, metric_columns: preState.metric_columns,
                attr_values: new_attrs, metric_values: new_metrics
            }
        });
    }

    render(){
        return (
            <div>
                <div style={Styles.InputBox}>
                    <input type="text" name="name" placeholder='Name' onChange={this.filterByName} />
                </div>
                <table style={Styles.Table}>
                    <Header attributes={this.state.attr_columns.slice(1)} metrics={this.state.metric_columns}/>
                    <tbody>
                        {this.state.attr_values.map((item, idx) => (
                            <Row key={item[0]} index={item[0]} 
                                attributes={item.slice(1)} 
                                metrics={this.state.metric_values[idx]} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}


export default GithubTable;
