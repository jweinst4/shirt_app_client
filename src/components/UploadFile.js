import React from 'react';
import ReactDOM from 'react-dom';
import ReactS3 from 'react-s3';

import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom'

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
require('dotenv').config()
const aws = require('aws-sdk');


let amazonObject = [];
let amazonObjectURL = [];
let allImages=[];

let baseURL = process.env.REACT_APP_BASEURL



if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://shirt-api.herokuapp.com'
}

const config= {
      bucketName: process.env.REACT_APP_S3_BUCKET,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      region: 'us-east-1',
    }
   

class UploadFile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          
        }
      this.upload = this.upload.bind(this)
    }

    upload(e){
      console.log(e.target.files[0])
      const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
});

let params = {
    Bucket: process.env.REACT_APP_S3_BUCKET,
    Key: 'Test/' + e.target.files[0].name,
    Body: e.target.files[0],
    ACL: 'public-read',
};
console.log(params)
try {
    let uploadPromise = new AWS.S3().putObject(params).promise();
    console.log("Successfully uploaded data to bucket");
} catch (e) {
    console.log("Error uploading data: ", e);
}
    }
    
    render() {
        return (
    <div>
        <input type="file" onChange={this.upload} />
     </div>
       )
    }
}

export default UploadFile
