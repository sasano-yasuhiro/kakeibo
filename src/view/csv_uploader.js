import React from 'react';
import CSVReader from 'react-csv-reader'

import './csv_uploader.scss'

export default class CsvUploader extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      encode: 'sjis',
      csv_data: [],
      title: [],
    }
    this.format = [
      { value: 'sjis',  label: 'sjis'  },
      { value: 'utf-8',  label: 'utf-8'  },
    ];
  }
  onFileLoaded(data){
    //console.log("onFileLoaded")
    let title= [];
    for(let i=0; i < data[0].length; i++){
      title.push({check:false, value:""})
    }
    this.setState({
      csv_data: data,
      title: title,
    })
  }
  onError(){
    console.log("onError")
  }
  onSelect(e){
    this.setState({encode: e.target.value})
  }
  toggleCheck(e){
    let title= this.state.title
    title[e.target.value].check = !title[e.target.value].check 
    this.setState({title: title})
  }
  onChange(e){
    let title= this.state.title
    title[e.target.id].value = e.target.value
    this.setState({title: title})
  }
  filter_load(){
    console.log("filter_load")
  }
  filter_create(){
    console.log("filter_create")
  }
  render(){
    return(
      <div>
        {this.render_csv_uploader()}
        {this.render_csv_filter()}
        {this.render_select_display_cols()}
        {this.render_csv_table()}
      </div>
    )
  }
  render_csv_uploader(){
    return(
      <div className='csv_uploader'>
        <select
          defaultValue={this.state.encode}
          onChange={this.onSelect.bind(this)}
        >
          {this.format.map( d =>
            <option key={d.value} value={d.value}>{d.label}</option>
          )}
        </select>
        <CSVReader
          onFileLoaded={this.onFileLoaded.bind(this)}
          onError={this.onError.bind(this)}
          fileEncoding={this.state.encode}
        />
      </div>
    )
  }
  render_csv_filter()
  {
    return(
      <div className='csv_filter'>
        <input type="button" value='load' onClick={this.filter_load.bind(this)}/>
        <input type="button" value='create'onClick={this.filter_create.bind(this)}/>
      </div>
    )
  }
  render_select_display_cols(){
    let csv_data = this.state.csv_data
    return(
      <div className='select_display_columns'>
        {csv_data.length > 0 &&
          csv_data[0].map( (d, i) =>
           <div key={'row_one_'+i}> 
             <input
               type="checkbox"
               defaultValue={i}
               checked={this.state.title[i].check}
               onChange={this.toggleCheck.bind(this)}
             />
             <span>{d}</span>
             <input
               id={i}
               type='text'
               defaultValue={this.state.title[i].value}
               onChange={this.onChange.bind(this)}
             />
           </div>
        )}
      </div>
    )
  }
  render_csv_table(){
    let csv_data = this.state.csv_data
    let title = this.state.title
    return(
      <table className="selected_columns_table">
        <thead>
          <tr>
          {title.map( (d, col)=>
            <th
              key={'rhd'+col}
              hidden={d.check?false:true}
            >
                {d.value?d.value:csv_data[0][col]}
            </th>
          )}
          </tr>
        </thead>
        <tbody>
          {csv_data.map( (row_data, row)=>
            <tr key={'r'+row}>
            {row_data.map( (d, col)=>
              <td
                key={'rd'+col}
                hidden={title[col].check?false:true}
              >
                {d}
              </td>
            )}
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

