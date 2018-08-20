import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'

const defaultProps = {
  label: 'Upload image',
  multi: false,
  accept: null,
  onUpload: () => null,
}

export default class Component extends React.Component {
  openFileDialog = () => {
    var fileInputDom = ReactDOM.findDOMNode(this.refs.input)
    fileInputDom.click()
  }

  handleFile = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (upload) => {
      const base64 = upload.target.result;
      this.props.onUpload(file, base64);
    };

    reader.readAsDataURL(file);
  }

  render () {
    return (
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={this.openFileDialog}
        >
          {this.props.label}
        </Button>
        <input
          type='file'
          multiple={this.props.multi}
          ref='input'
          style={{ display: 'none' }}
          accept={this.props.accept}
          onChange={this.handleFile}
        />
      </div>
    )
  }
}

Component.defaultProps = defaultProps
