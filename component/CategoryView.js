import React, { useState } from 'react';
import { Text, View, StyleSheet, Dimensions, VirtualizedList } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import SkinBox from './SkinBox';
import EmojiIcon from './EmojiIcon';
import Carousel from 'react-native-banner-carousel';
// import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

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
    },
    row: {
        flexDirection: 'row'
    }
});

class CategoryView extends React.PureComponent {
    // layoutProviderNews = new LayoutProvider(
    //     (index => 0),
    //     (type, dim) => {
    //         dim.width = (width - 1) / 8;
    //         dim.height = 40;
    //     }
    // );
    // dataProvider = new DataProvider((r1, r2) => {
    //     return r1 !== r2;
    // });
    rowRendererNews = ({ item }) => {
        // return <EmojiIcon
        //     emoji={data}
        //     clickEmoji={this.props.onClick}
        // />
        return <View style={styles.row}>
            {item[0]
                ?
                <EmojiIcon
                    emoji={item[0]}
                    clickEmoji={this.props.onClick}
                />
                : null
            }
            {item[1]
                ?
                <EmojiIcon
                    emoji={item[1]}
                    clickEmoji={this.props.onClick}
                />
                : null
            }
            {item[2]
                ?
                <EmojiIcon
                    emoji={item[2]}
                    clickEmoji={this.props.onClick}
                />
                : null
            }
            {item[3]
                ?
                <EmojiIcon
                    emoji={item[3]}
                    clickEmoji={this.props.onClick}
                />
                : null
            }
            {item[4]
                ?
                <EmojiIcon
                    emoji={item[4]}
                    clickEmoji={this.props.onClick}
                />
                : null
            }
            {item[5]
                ?
                <EmojiIcon
                    emoji={item[5]}
                    clickEmoji={this.props.onClick}
                />
                : null
            }
            {item[6]
                ?
                <EmojiIcon
                    emoji={item[6]}
                    clickEmoji={this.props.onClick}
                />
                : null
            }
            {item[7]
                ?
                <EmojiIcon
                    emoji={item[7]}
                    clickEmoji={this.props.onClick}
                />
                : null
            }
        </View>
    }
    getItemCount = (data) => {
        return data.length
    }

    getItem = (data, index) => {
        // return data[index]
        let items = []
        for (let i = 0; i < 8; i++) {
            const item = data[index * 8 + i]
            item && items.push(item)
        }
        return items
    }
    render() {
        return (
            <View style={styles.categoryView}>
                <VirtualizedList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.recyclerListViewContent}
                    data={this.props.emojis}
                    initialNumToRender={4}
                    renderItem={this.rowRendererNews}
                    keyExtractor={item => item.code}
                    getItemCount={this.getItemCount}
                    getItem={this.getItem}
                />
            </View>
        )
    }
};

export default CategoryView;

