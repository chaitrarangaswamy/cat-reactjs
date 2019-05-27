import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { ClipLoader } from 'react-spinners';
// Another way to import
// import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
    display: block;
    margin:  auto;
    border-color: red;
    z-index:6;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    border:7px solid;
`;

class SpinnerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
        <ClipLoader
          className={override}
          sizeUnit={"px"}
          size={100}
          color={'#ffa726'}
          loading={this.state.loading}
        />
      </div> 
    )
  }
}

export default SpinnerComponent;