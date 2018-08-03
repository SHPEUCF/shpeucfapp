import React, { Component } from 'react';
import { GeneralContent } from '../components/general'

class Version extends Component {
  render() {
    const { title, content, footer } = this.props;
    return (
      <GeneralContent
        title={title}
        content={content}
        footer={footer}
      />
    );
  }
}

export { Version };
