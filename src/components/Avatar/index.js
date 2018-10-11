import React, { Component } from 'react';
import Img from 'react-image';
import socket from '../../socket';

const uuidv1 = require('uuid/v1');

export default class Avatar extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      cacheBreaker: "? " + uuidv1()
    }
  }
  
  componentWillUnmount() {
    this._ismounted = false;
  }

  componentDidMount() {
    var event = this.props.ioevent || 'update image';

    this._ismounted = true;

    socket.on(event, reference => {

      console.log(this.props.reference, reference);

      if ( reference === this.props.reference && this._ismounted ) {
        this.setState({
          cacheBreaker: "? " + uuidv1()
        });
      }
    });

  }

  render() {
    return (
      <div style={{ flex: '0, 0, ' + this.props.width}}>
        <Img
          alt="Avatar"
          src={this.props.src + this.state.cacheBreaker}
          loader={this.props.loader}
          unloader={this.props.unloader}
          style={{
            borderRadius: this.props.borderRadius || '30px',
            width: this.props.width || 40,
            height: this.props.height || 40,
            ...this.props.imageStyle
          }}
        />
      </div>
    )
  }
}
