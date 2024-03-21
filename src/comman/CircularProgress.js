import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Svg, {Circle} from 'react-native-svg';

class CircularProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  componentDidMount() {
    this.animateProgress();
  }

  animateProgress = () => {
    const {duration, initialValue, finalValue} = this.props;
    let progress = initialValue;
    const interval = (finalValue - initialValue) / (duration / 100);

    this.progressInterval = setInterval(() => {
      if (progress < finalValue) {
        progress += interval;
        this.setState({progress});
      } else {
        clearInterval(this.progressInterval);
      }
    }, 100);
  };

  render() {
    const {radius, strokeWidth, backgroundColor, progressColor, textColor} =
      this.props;
    const {progress} = this.state;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={styles.container}>
        {/* <Text style={[styles.text, {color: textColor}]}>
          Rank {progress.toFixed(0)}
        </Text> */}
        <Svg height={radius * 2} width={radius * 2}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="transparent"
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
          />

          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="transparent"
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default CircularProgress;
