import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SkinBox from './SkinBox';
import EmojiIcon from './EmojiIcon';
import Carousel from 'react-native-banner-carousel';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    categoryView: {
        position: 'relative',
        flex: 1,
    },
    categoryPageView: {
        width: width,
        height: 220
    },
    categoryLabel: {
        height: 40,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    labelText: {
        color: '#aaa',
        fontWeight: 'bold'
    }
});

const CategoryView = ({
    category,
    emojis,
    numRows,
    numCols,
    emojiSize,
    labelStyle,
    onClick
}) => {
    const [toggleSkinBox, setToggleSkinBox] = useState({
        showSkinBox: false,
        emoji: null
    });
    // Emoji count per page
    const perPage = numRows * numCols;
    const emojiWidth = (width - 20) / numRows;
    const clickEmoji = emoji => {
        setToggleSkinBox({
            showSkinBox: false,
            emoji: null
        });
        onClick(emoji);
    };

    const longPressEmoji = emoji => {
        if (emoji.skins) {
            setToggleSkinBox({
                showSkinBox: true,
                emoji
            });
        } else {
            onClick(emoji);
        }
    };

    const tabBar = () => {
        return (
            <View style={styles.categoryLabel}>
                <Text style={[styles.labelText, labelStyle]}>{category}</Text>
            </View>
        );
    };

    const layoutProviderNews = new LayoutProvider(
        (index => 0),
        (type, dim) => {
            dim.width = width / numRows;
            dim.height = 40;
        }
    );
    let dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    });

    const rowRendererNews = (type, data) => {
        return <EmojiIcon
            emoji={data}
            clickEmoji={clickEmoji}
            longPressEmoji={longPressEmoji}
            emojiWidth={emojiWidth}
            emojiSize={emojiSize}
        />
    }

    const renderCategory = () => {
        if (!emojis.length) {
            return <View />;
        }
        const pages = Math.ceil(emojis.length / perPage);
        const categoryView = [];
        for (let i = 0; i < pages; i++) {
            const currentPageEmojis = _.slice(
                emojis,
                i * perPage,
                (i + 1) * perPage
            );
            categoryView.push(
                <View
                    style={styles.categoryPageView}
                    key={`page-${i}`}
                    tabLabel={`page-${i}`}>
                    
                    <RecyclerListView
                        contentContainerStyle={styles.recyclerListViewContent}
                        layoutProvider={layoutProviderNews}
                        dataProvider={dataProvider.cloneWithRows(currentPageEmojis)}
                        rowRenderer={rowRendererNews}

                    />
                </View>
            );
        }
        return categoryView;
    };
    return (
        <View tabLabel={category} style={styles.categoryView}>
            {toggleSkinBox.showSkinBox && (
                <SkinBox
                    emoji={toggleSkinBox.emoji}
                    clickEmoji={clickEmoji}
                    emojiWidth={emojiWidth}
                    emojiSize={emojiSize}
                />
            )}
            <Carousel
                autoplay={false}
                loop
                index={0}
                pageSize={width}
            >
                {renderCategory()}
            </Carousel>

        </View>
    );
};

CategoryView.propTypes = {
    category: PropTypes.string
};

export default CategoryView;
