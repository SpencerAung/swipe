import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  PanResponder,
} from 'react-native';

class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {}
    });

    this.state = { panResponder, position };
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        // Apply animation only on first card element
        return (
          <Animated.View
            key={item.id}
            style={this.state.position.getLayout()}
            {...this.state.panResponder.panHandlers}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }
      return this.props.renderCard(item);
    });
  }

  render() {
    return (
      <Animated.View>
        {this.renderCards()}
      </Animated.View>
    );
  }
}

export default Deck;

const styles = StyleSheet.create({
  container: {
    width: 500,
    height: 300,
    backgroundColor: 'pink',
  },
});