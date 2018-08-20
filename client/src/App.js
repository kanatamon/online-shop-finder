import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './App.css';
import UploadButton from './UploadButton';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
    };
  }

  handleOnUpload = (file, base64) => {
    this.setState({
      file,
      imagePreviewUrl: base64,
    });
  }

    // handleSubmit(e) {
    //     e.preventDefault();
    //     //TODO: do something with -> this.state.file
    //     console.log('handle uploading-', this.state.file);
    // }

    // handleImageChange(e) {
    //     e.preventDefault();

    //     let reader = new FileReader();
    //     let file = e.target.files[0];

    //     reader.onloadend = () => {
    //         this.setState({
    //             file: file,
    //             imagePreviewUrl: reader.result
    //         });
    //     }

    //     reader.readAsDataURL(file)
    // }


    //async componentDidMount() {
    // const response = await fetch('https://cors-anywhere.herokuapp.com/https://unsplash.com/search/photos/tree');
    // const html = await response.text();
    // const parser = new DOMParser();
    // const doc = parser.parseFromString(html, "text/html");
    // const imagesElements = doc.getElementsByClassName('_1pn7R');
    // const imageContainer = document.getElementById('image-container');
    // for (let index = 0; index < imagesElements.length; index++) {
    //   const imageElement = imagesElements[index];
    //   imageContainer.appendChild(imageElement);
    // }

    // const response = await fetch('https://api.instagram.com/v1/tags/sea/media/recent?access_token=30417487.d625d30.10397facb179422ab4fc1f0a0f8002bf');
    // const html = await response.text();
    // console.log(html)
  //}
  render(){
    const { imagePreviewUrl } = this.state;
    const $imagePreview = imagePreviewUrl
      ? (<img src={imagePreviewUrl} />)
      : (<div>Please select an Image for Preview</div>);
    return (
      <div>
        <div className="upload-container">
          <UploadButton
            onUpload={this.handleOnUpload}
          />
          <div className="file-image">
            {$imagePreview}
          </div>
        </div>
        <div>
          <Card>
            <CardMedia
              image="testpic.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                link
              </Button>
          </CardActions>
          </Card>
        </div>
      </div>
    )
  }
}

export default App;
