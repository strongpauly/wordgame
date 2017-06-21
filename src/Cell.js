import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Cell extends Component {

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    char: PropTypes.string.isRequired,
    onSelectStart: PropTypes.func,
    onSelectOver: PropTypes.func,
    onSelectEnd: PropTypes.func,
    selected: PropTypes.bool
  }

  constructor(props) {
    super(props);
  }

  onSelectStart = () => {
    if(this.props.onSelectStart) {
      this.props.onSelectStart(this.props.x, this.props.y, this.props.char);
    }
  }

  onSelectOver = () => {
    if(this.props.onSelectOver) {
      this.props.onSelectOver(this.props.x, this.props.y, this.props.char);
    }
  }

  onSelectEnd = () => {
    if(this.props.onSelectEnd) {
      this.props.onSelectEnd(this.props.x, this.props.y, this.props.char);
    }
  }

  render() {
    let className = ['cell'];
    let content = this.props.char;
    if (this.props.selected) {
      className.push('selected');
    }
    return <td className={ className.join(' ') }
      onMouseDown={this.onSelectStart}
      onMouseUp={this.onSelectEnd}
      onMouseOver={this.onSelectOver}>{ content }</td>;
  }
}
