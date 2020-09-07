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
    this.display_cols = ["date","category","money"];
  }
  onFileLoaded(data){
    this.setState({
      csv_data: data,
      title: new Array(data[0].length),
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
    title[e.target.name]= e.target.value
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
    let title = this.state.title
    return(
      <div className='select_display_columns'>
        {csv_data.length > 0 &&
          csv_data[0].map((data, col) =>
            <div key={col}>
              {this.display_cols.map((dummy,i) =>
                <input
                  type="radio"
                  value={i}
                  name={col}
                  checked={title[col] == i}
                  onChange={this.toggleCheck.bind(this)}
                  key={i}
                />
              )}
              <span>{data}</span>
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
          {title.map((d, col)=>
            <th
              key={col}
              hidden={d?false:true}
            >
              {this.display_cols[d]}
            </th>
          )}
          </tr>
        </thead>
        <tbody>
          {csv_data.map( (row_data, row)=>
            <tr key={row}>
            {row_data.map((d, col)=>
              <td
                key={col}
                hidden={title[col]?false:true}
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

