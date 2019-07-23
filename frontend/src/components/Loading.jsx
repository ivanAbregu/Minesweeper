import React from 'react';
import loading from './loading.svg';

export default props=> {
    return (
      <div className="view-loader">
        <img src={loading} alt="loading"/>
      </div>
    );
}
