import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import ScrollableMixin from 'react-native-scrollable-mixin';

import LazyloadScrollView from './LazyloadScrollView';

class LazyloadFlatList extends Component {
  static displayName = 'LazyloadFlatList';

  static propTypes = {
    ...FlatList.propTypes,
  };

  static defaultProps = {
    ...FlatList.defaultProps,
  }

  refresh() {
    this._scrollView.refresh();
  }

  get scrollProperties() {
    return this._flatList.scrollProperties;
  }

  /**
   * IMPORTANT: You must return the scroll responder of the underlying
   * scrollable component from getScrollResponder() when using ScrollableMixin.
   */
  getScrollResponder() {
    return this._flatList.getScrollResponder();
  }

  setNativeProps(props) {
    this._flatList.setNativeProps(props);
  }

  render() {
    return this.props.name ? <FlatList
      {...this.props}
      renderScrollComponent={props => <LazyloadScrollView {...props} />}
      ref={ele => this._flatList = ele}
    /> : <FlatList
        {...this.props}
        ref={ele => this._flatList = ele}
      />;
  }
}

// Mix in ScrollableMixin's methods as instance methods
Object.assign(LazyloadFlatList.prototype, ScrollableMixin);

export default LazyloadFlatList;
