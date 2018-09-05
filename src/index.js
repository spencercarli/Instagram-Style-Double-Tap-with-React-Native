import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const w = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    liked: false,
  };

  toggleLike = () => this.setState(state => ({ liked: !state.liked }));

  // https://gist.github.com/brunotavares/3c9a373ba5cd1b4ff28b
  lastDoubleTap = null;
  DOUBLE_PRESS_DELAY = 300;
  handleDoubleTap = () => {
    const now = Date.now();
    if (this.lastDoubleTap && (now - this.lastDoubleTap) < this.DOUBLE_PRESS_DELAY) {
      this.toggleLike();
    } else {
      this.lastDoubleTap = now;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handleDoubleTap}>
          <Image
            source={{ uri: `https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=${w.width}` }}
            style={{ width: w.width, height: w.width }}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={this.toggleLike}>
            <Image
              source={this.state.liked ? require('./images/heart.png') : require('./images/heart-outline.png')}
              style={styles.heartIcon}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
});
