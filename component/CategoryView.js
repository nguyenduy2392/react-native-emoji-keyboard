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
        // flex: 1,
        width: Dimensions.get('window').width,
        height: 300
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
    },
    recyclerListViewContent: {
        paddingBottom: 20
    }
});

class CategoryView extends React.PureComponent {
    layoutProviderNews = new LayoutProvider(
        (index => 0),
        (type, dim) => {
            dim.width = (width -1) / 8;
            dim.height = 40;
        }
    );
    dataProvider = new DataProvider((r1, r2) => {
        return r1 !== r2;
    });
    rowRendererNews = (type, data) => {
        return <EmojiIcon
            emoji={data}
            clickEmoji={this.props.onClick}
        />
    }
    render() {
        return (
            <View style={styles.categoryView}>
                <RecyclerListView
                    contentContainerStyle={styles.recyclerListViewContent}
                    layoutProvider={this.layoutProviderNews}
                    dataProvider={this.dataProvider.cloneWithRows(this.props.emojis)}
                    rowRenderer={this.rowRendererNews}

                />
            </View>
        )
    }
};

export default CategoryView;

