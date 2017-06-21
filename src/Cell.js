import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cell extends Component {

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    char: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };

    this.selectCell = this.selectCell.bind(this);
  }

  selectCell () {
    this.setState({selected: !this.state.selected});
  }

  render() {
    let className = ['cell'];
    let content = this.props.char;
    if (this.state.selected) {
      className.push('selected');
    }
    return <td className={ className.join(' ') } onClick={this.selectCell}>{ content }</td>;
  }
}
