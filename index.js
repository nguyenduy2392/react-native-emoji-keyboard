import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, Dimensions} from 'react-native';
import emojiSource from 'emoji-datasource';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {
    isIphoneXorAbove,
    isAndroid,
    handleDefaultEmoji,
    handleCustomEmoji
} from './utils';
import CategoryTabBar from './component/CategoryTabBar';
import CategoryView from './component/CategoryView';
import {defaultProps, IconType} from './constant';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EAEBEF',
        width: width,
        position: 'absolute',
        zIndex: 10,
        overflow: 'visible',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: isIphoneXorAbove() ? 15 : 0
    }
});

class EmojiBoard extends React.PureComponent {
    emojiData = handleDefaultEmoji(emojiSource, defaultProps.blackList)
    position = new Animated.Value(-300)
    open = () => {
        Animated.timing(this.position, {
            duration: 300,
            toValue: 0,
            useNativeDriver: false
        }).start();
    }

    close = () => {
        Animated.timing(this.position, {
            duration: 300,
            toValue: -300,
            useNativeDriver: false
        }).start();
    }
    render() {
        return (
            <Animated.View
                style={[
                    styles.container,
                    {
                        bottom: this.position,
                        height: isAndroid() ? 300 : 'auto'
                    },
                    this.props.containerStyle
                ]}>
                <CategoryView
                    emojis={this.emojiData[defaultProps.categories[0].name] || []}
                    onClick={this.props.onClick}
                />
            </Animated.View>
        )
    }
    
};

export default EmojiBoard;

