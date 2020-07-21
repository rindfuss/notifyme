import React from 'react';
import {View, StyleSheet} from 'react-native';
/*import {IconButton, BingoText} from '../';
import {colors} from '../../assets/colors';*/

const AppHeader = props => {
  return (
    <>
      <View style={styles.headerContainer}>
        {/*<IconButton
          style={styles.iconStyle}
          name="chevron-left"
          color={colors.bluespruce}
          onPress={props.onPressBack}
          size={30}
        />*/}
        <View style={styles.textContainer}>
          <Text>{props.title}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'flex-start',
    backgroundColor: 'gray',
    height: 160,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 30,
  },
  iconStyle: {
    backgroundColor: 'gray',
    alignItems: 'flex-start',
  },
  textContainer: {
    width: '100%',
    paddingTop: 10,
    borderBottomColor: 'purple',
    borderBottomWidth: 2,
  },
});

export default AppHeader;