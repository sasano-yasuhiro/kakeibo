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
    this.onFileLoaded = this.onFileLoaded.bind(this)
    this.format = [
      { value: 'sjis',  label: 'sjis'  },
      { value: 'utf-8',  label: 'utf-8'  },
    ];
  }
  onFileLoaded(data){
    let title= [];
    for(let i=0; i < data[0].length; i++){
      title.push({check:false, value:""})
    }
    this.setState({
      csv_data: data,
      title: title,
    })
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
  render(){
    return(
      <div className='csv_uploader'>
        {this.render_encoding()}
        <CSVReader
          onFileLoaded={this.onFileLoaded}
          fileEncoding={this.state.encode}
        />
        {this.render_row_one()}
        {this.render_csv_table()}
      </div>
    )
  }
  render_encoding(){
    return(
      <select
        defaultValue={this.state.encode}
        onChange={this.onSelect.bind(this)}
      >
        {this.format.map( d =>
          <option key={d.value} value={d.value}>{d.label}</option>
        )}
      </select>
    )
  }
  render_row_one(){
    let csv_data = this.state.csv_data
    return(
      <div>
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
      <table className="raw_tbl">
        <thead>
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

