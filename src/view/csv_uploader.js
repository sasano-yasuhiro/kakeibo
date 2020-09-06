import React from 'react';
import CSVReader from 'react-csv-reader'

import './csv_uploader.scss'

export default class CsvUploader extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className='csv_uploader'>
        <CSVReader/>
      </div>
    )
  }
}

