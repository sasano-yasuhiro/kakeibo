import React from 'react';

export default class ItemGroup extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      groups: {},
      group_name:'',
      items: this.props.items,
      selected_item:'',
    }
  }
  input_group_name(e){
    this.setState({group_name: e.target.value})
  }
  add_group(e){
    let group_name=this.state.group_name
    if(Object.keys(this.state.groups).indexOf(group_name)==-1){
      let groups = Object.assign(this.state.groups)
      groups[group_name]=[]
      this.setState({groups: groups})
    }
  }
  add_group_item(){
    let groups= Object.assign(this.state.groups)
    let item=this.state.selected_item
    let group_name=this.state.group_name
    if(groups[group_name].indexOf(item)==-1){
      groups[group_name].push(item)
      this.setState({groups: groups})
    }
  }
  change_items(e){
    this.setState({selected_item: e.target.value})
  }
  render(){
    const group_names=Object.keys(this.state.groups)
    return(
      <div className='group_setting'>
        <input
          type="text"
          value={this.state.group_name}
          list="keywords"
          onChange={this.input_group_name.bind(this)}
        />
        <datalist id="keywords">
          {group_names.map((d,i) =>
            <option key={i} value={d}>{d}</option>
          )}
        </datalist>
        <input type="button" value="+" onClick={this.add_group.bind(this)}/>
        <select>
          {group_names.map((d,i) =>
            <option key={i} value={d}>{d}</option>
          )}
        </select>
        <select onChange={this.change_items.bind(this)}>
          {this.props.items.map((d,i) =>
            <option key={i} value={d}>{d}</option>
          )}
        </select>
        <input type="button" value="+" onClick={this.add_group_item.bind(this)}/>
      </div>
    )
  }
}

