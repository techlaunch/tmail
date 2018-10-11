import React, { Component } from 'react';
import AvatarEditor from 'react-avatar-editor';
import Slider from '../Slider';

class ImageCropper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      borderRadius: 225,
      width: 225,
      height: 225,
      border: 0,
      color: [255, 255, 255, 0.6], // RGBA
      scale: 1,
      rotate: 0,
    };
  }

  rotate = (event, value) => {
    this.setState({
      rotate: value
    })
  }

  zoom = (event, value) => {
    this.setState({
      scale: value
    })
  }

  saveCroppedImage = () => {
    if (this.editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      // const canvas = this.editor.getImage();

      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      const canvas = this.editor.getImageScaledToCanvas();

      if (canvas.toDataURL) {
        this.props.saveCroppedImage(canvas.toDataURL());

        //this.convertCanvasToImage(canvas);
      }

      // if (canvasScaled.toBlob) {
      //   canvasScaled.toBlob(file => {return this.props.saveCroppedImage(file)},'image/png');
      // }

      //console.log(this.convertCanvasToImage(canvas));
      //console.log(this.convertCanvasToImage(canvasScaled));

    }
  }

  // convertCanvasToImage = (canvas) => {
  // 	return this.setState({image: canvas.toDataURL("image/png")});
  // }

  onPositionChange = (position) => {
    console.log(position);
  }

  setEditorRef = (editor) => this.editor = editor;

  render () {
    // console.log('cropper receiving image ', this.props.image);
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <AvatarEditor
          ref={this.setEditorRef}
          style={{borderRadius:'225px'}}
          image={this.props.image || ''}
          borderRadius={this.state.borderRadius}
          width={this.state.width}
          height={this.state.height}
          border={this.state.border}
          color={this.state.color}
          scale={this.state.scale}
          rotate={this.state.rotate}
          onLoadSuccess={this.saveCroppedImage}
          onPositionChange={this.saveCroppedImage}
        />

        <div className='devider'></div>

        <Slider
          min={-180}
          max={180}
          step={1}
          value={this.state.rotate}
          onChange={this.rotate}
          onDragEnd={this.saveCroppedImage}
        />

        <div className='devider'></div>

        <Slider
          min={0.1}
          max={5}
          step={0.01}
          value={this.state.scale}
          onChange={this.zoom}
          onDragEnd={this.saveCroppedImage}
        />
      </div>
    )
  }
}

export default ImageCropper;
