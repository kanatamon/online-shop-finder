import React, { Component, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import './App.css';
import UploadButton from './UploadButton';

const GET_IG_POSTS_URL = 'http://localhost:5000/nutcha-58804/us-central1/getInstagramPostsByTagName';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      posts: [],
      isLoading: false,
    };
  }

  loadInstagramPosts = async () => {
    this.setState({ isLoading: true });
    const response = await fetch(GET_IG_POSTS_URL);
    const posts = await response.json();
    this.setState({
      posts,
      isLoading: false,
    });
  }

  handleOnUpload = (file, base64) => {
    this.setState({
      file,
      imagePreviewUrl: base64,
    });
    this.loadInstagramPosts();
  }

  renderUploadedImage = () => {
    const { imagePreviewUrl } = this.state;
    return (
      <div className="file-image">
      {
        imagePreviewUrl
        ? (<img alt="Uploaded image" src={imagePreviewUrl} />)
        : (<div>Please select an Image for Preview</div>)
      }
      </div>
    );
  }

  renderInstagramPosts = () => {
    const { posts, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="circular-process-container">
          <CircularProgress />
        </div>
      );
    }
    if (posts.length > 0) {
      return (
        <Fragment>
          <Typography
            align="center"
            color="primary"
            variant="display1"
          >
            Posts on Instagram
          </Typography>
          <div className="masonry">
            {
              posts.map(post => (
                <Card key={post.imageUrl}>
                  <CardMedia height="320" component="img" image={post.imageUrl} />
                  <CardContent>
                    <Typography component="p">
                      {post.caption}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      href={post.igUrl}
                      size="small"
                      color="primary"
                    >
                      link
                    </Button>
                  </CardActions>
                </Card>
              ))
            }
          </div>
        </Fragment>
      );
    }
    return null;
  }

  render(){
    return (
      <div>
        <div className="upload-container">
          <UploadButton onUpload={this.handleOnUpload} />
          {this.renderUploadedImage()}
        </div>
        {this.renderInstagramPosts()}
      </div>
    )
  }
}

export default App;
