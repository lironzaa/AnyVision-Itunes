import React, { Component } from 'react';

class ItemInfo extends Component {

  constructor() {
    super();
    this.state = {
      name: ''
    }
  }

  componentDidMount() {
    console.log(this.props.location.state.name);
    this.setState({ name: this.props.location.state.name });
  }

  render() {
    const { name } = this.state;

    return (
      <div>
        <p>test</p>
        <p>{name}</p>
      </div>
    )
  }

}
export default ItemInfo;