import React from 'react';
import PropTypes from 'prop-types';
import {Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';

const styles = StyleSheet.create({
    emojiTouch: {
        paddingVertical: 5,
        width: Dimensions.get('window').width / 8,
        height: 40,
        justifyContent: 'center',
    },
    emoji: {
        textAlign: 'center',
        fontSize: 20
    },
    emojiImg: {
        alignSelf: 'center',
        resizeMode: 'cover'
    }
});

const EmojiIcon = ({
    emoji,
    clickEmoji,
}) => {
    const {code, img} = emoji;
    return (
        <TouchableOpacity
            style={[styles.emojiTouch]}
            onPress={() => clickEmoji(emoji)}>
            {code ?
                <Text style={styles.emoji}>{code}</Text> :
                null
            }
        </TouchableOpacity>
    );
};

EmojiIcon.propTypes = {
    emoji: PropTypes.object,
    clickEmoji: PropTypes.func,
    longPressEmoji: PropTypes.func,
    emojiWidth: PropTypes.number,
    emojiSize: PropTypes.number
};
export default EmojiIcon;

