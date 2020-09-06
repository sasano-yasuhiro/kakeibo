import React from 'react';
import CSVReader from 'react-csv-reader'

import './csv_uploader.scss'

export default class CsvUploader extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      encode: 'sjis',
      csv_data: [],
    }
    this.onFileLoaded = this.onFileLoaded.bind(this)
    this.format = [
      { value: 'sjis',  label: 'sjis'  },
      { value: 'utf-8',  label: 'utf-8'  },
    ];
  }
  onFileLoaded(data){
    this.setState({csv_data: data})
  }
  onSelect(e){
    this.setState({encode: e.target.value})
  }
  render(){
    return(
      <div className='csv_uploader'>
        {this.render_encoding()}
        <CSVReader
          onFileLoaded={this.onFileLoaded}
          fileEncoding={this.state.encode}
        />
        {}
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
}

