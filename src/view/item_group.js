import React from 'react';

export default class ItemGroup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      groups: [],
      group_name:'',
      items: this.props.items,
    }
  }
  input_group_name(e){
    this.setState({group_name: e.target.value})
  }
  add_group(e){
    let groups = Array.from(this.state.groups)
    groups.push(this.state.group_name)
    this.setState({
      groups: groups,
      group_name: '',
    })
  }
  render(){
    //this.setState({items: this.props.items})
    return(
      <div className='group_setting'>
        <input
          type="text"
          value={this.state.group_name}
          list="keywords"
          onChange={this.input_group_name.bind(this)}
        />
        <datalist id="keywords">
          {this.state.groups.map((d,i) =>
            <option key={i} value={d}>{d}</option>
          )}
        </datalist>
        <input type="button" value="+" onClick={this.add_group.bind(this)}/>
        <select
        >
          {this.props.items.map((d,i) =>
            <option key={i} value={d}>{d}</option>
          )}
        </select>
        <input type="button" value="+"/>
      </div>
    )
  }
}

