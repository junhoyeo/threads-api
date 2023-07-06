import React from 'react';

type NoSSRProps = {
  children?: React.ReactNode;
};

export class NoSSR extends React.Component<NoSSRProps> {
  state = {
    isClient: false,
  };

  componentDidMount() {
    this.setState({
      isClient: true,
    });
  }

  render() {
    const { isClient } = this.state;
    const { children } = this.props;

    return isClient ? children : false;
  }
}
