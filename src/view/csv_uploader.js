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
      selected_data: {},
      out_csv: [],
    }
    this.format = [
      { value: 'sjis',  label: 'sjis'  },
      { value: 'utf-8',  label: 'utf-8'  },
    ];
    this.display_cols = ["date","item","money"];
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
  selectRadio(e){
    let title = this.state.title
    let index = title.indexOf(e.target.value)
    if(index !== -1){
      title[index] = null
    }
    title[e.target.name] = e.target.value
    this.setState({title: title})
    this.set_selected_data(title)
    this.set_output_csv()
  }
  set_selected_data(title){
    let selected_data={date:[],item:[],money:[]}
    title.map((t,i)=>{
      this.state.csv_data.map(d =>{
        if(t){
          selected_data[this.display_cols[t]].push(d[i])
        }
      }
    )})
    this.setState({selected_data: selected_data})
  }
  set_output_csv(){
    let cols=[]
    let out_csv= []
    this.state.title.map((d,i)=>d?cols.push(i):null)
    this.state.csv_data.map(d=>{
      let data = []
      cols.map(i=>{
        data.push(d[i])
      })
      out_csv.push(data)
    })
    this.setState({out_csv: out_csv})
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
  csv_download(){
    console.log("csv_download")
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
        <input type="button" value='download'onClick={this.csv_download.bind(this)}/>
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
                  onChange={this.selectRadio.bind(this)}
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
            {Object.keys(this.state.selected_data).map((d, col)=>
              <th key={col}>{d}</th>
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

