import React, { Component } from 'react';
import Cropper from './Cropper';
import Avatar from '../Avatar';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class ImageUploader extends Component {
  handleUploadFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    if (file) {
      reader.onloadend = () => {
        this.props.saveCroppedImage(file, reader.result);
      }
      //console.log(file);
      reader.readAsDataURL(file);
    }
    else {
      this.props.saveCroppedImage('', '', true);
    }
  }

  onClick = (e) => {
    e.preventDefault();
    this.file_input.click();
  }

  // imageExists(image_url) {

  //   var http = new XMLHttpRequest();

  //   http.open('HEAD', image_url, false);
  //   http.send();

  //   return http.status !== 404;

  // }

  render() {
    const { classes } = this.props;
    const imagePreviewUrl = this.props.imageURL;
    const size = '225px';
    const imagePreview = imagePreviewUrl ? (
      <Cropper image={imagePreviewUrl} saveCroppedImage={this.props.saveCroppedImage} />
    ) : (
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        width: size,
        height: size,
        borderRadius: size,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Avatar
          alt="Avatar"
          reference={this.props.reference}
          src={this.props.image}
          unloader={
            <div style={{
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '11px'
            }}>No image avilable</div>
          }
          borderRadius={size}
          width={size}
          height={size}
        />
      </div>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="image-wrapper" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          {imagePreview}
        </div>

        <div className="input-file-container" style={{
          width: '250px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <form ref={r => this.form = r}>
            <input
              ref={(r) => this.file_input = r}
              accept="image/*"
              onChange={this.handleUploadFile} className="input-file"
              id="my-file"
              type="file"
              style={{
                display: 'none',
                width: '100%',
                height: '100%',
                position: 'absolute'
              }}
            />
          </form>
          
          <Button onClick={this.onClick} variant="contained" color="default" className={classes.button}>
            Upload
            <CloudUploadIcon className={classes.rightIcon} />
          </Button>
        </div>
      </div>
    )
  }
}

ImageUploader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageUploader);
