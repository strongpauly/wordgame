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
    selected: PropTypes.bool,
    selecting: PropTypes.bool,
    used: PropTypes.bool,
    hinting: PropTypes.bool,
    hintNumber: PropTypes.number
  }

  constructor(props) {
    super(props);
  }

  onSelectStart = () => {
    if(this.props.onSelectStart && !this.props.used) {
      this.props.onSelectStart(this.props.x, this.props.y, this.props.char);
    }
  }

  onSelectOver = () => {
    if(this.props.onSelectOver && !this.props.used) {
      this.props.onSelectOver(this.props.x, this.props.y, this.props.char);
    }
  }

  onSelectEnd = () => {
    if(this.props.onSelectEnd && !this.props.used) {
      this.props.onSelectEnd(this.props.x, this.props.y, this.props.char);
    }
  }

  render() {
    let className = ['cell'];
    let content = this.props.char;
    let key = 'cell-' + this.props.x + '-' + this.props.y;
    if (this.props.selected) {
      className.push('selected');
    }
    if (this.props.selecting) {
      className.push('selecting');
    }
    if(this.props.used) {
      className.push('used');
    }
    if(this.props.hinting) {
      className.push('hint');
      key += '-' + this.props.hintNumber;
    }
    return <div className={ className.join(' ') } key={key}
      onMouseDown={this.onSelectStart}
      onMouseUp={this.onSelectEnd}
      onMouseOver={this.onSelectOver}>{ content }</div>;
  }
}
