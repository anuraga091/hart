import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import {DraggableGrid} from 'react-native-draggable-grid';
import {FONT_SIZES, height, width} from '../utils/styles/fontsSizes';
import {Colors} from '../utils/styles/colors';
import ImagePicker from 'react-native-image-crop-picker';
import {AbsoluteView, AppImage} from 'react-native-quick-components';
import {ImgSrc} from '../utils/assetComp/ImgSrc';
import {AddIcon} from '../utils/assetComp/IconComp';
import {useSelector} from 'react-redux';

export const DraggableBox = ({onLongPress = () => {}}) => {
  const [selectedImages, setSelectedImages] = useState([
    {image: '', key: 1, text: 'Pic 1'},
    {image: '', key: 2, text: 'Pic 2'},
    {image: '', key: 3, text: 'Pic 3'},
    {image: '', key: 4, text: 'Pic 4'},
  ]);
  const profile = useSelector(state => state.basicDetails);
  useEffect(() => {
    const updatedImages = selectedImages.map((item, index) => ({
      ...item,
      image: profile?.profilePictures?.[index] || '',
    }));
    setSelectedImages(updatedImages);
  }, [profile]);

  const openImagePicker = ind => {
    ImagePicker.openPicker({
      cropping: true,
      multiple: true,
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
      compressImageQuality: 0.8,
      mediaType: 'photo',
      maxFiles: 4,
    }).then(image => {
      console.log(image);

      image.slice(0, 4).map((i, k) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages[k].image = i.path;
        setSelectedImages(newSelectedImages);
      });

      //console.log(image.path);
    });
  };
  const renderItem = (item, index) => {
    return (
      <View style={styles.item} key={item?.key}>
        <AbsoluteView onPress={() => openImagePicker(index)} T={10} R={10}>
          <AddIcon size={30} />
        </AbsoluteView>
        {item?.image ? (
          <Image style={styles.boximage} source={{uri: item?.image}} />
        ) : (
          <Text style={styles.item_text}>image</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <DraggableGrid
        numColumns={2}
        itemHeight={width * 0.493}
        renderItem={renderItem}
        onResetSort={() => {
          console.log('onResetSort');
          onLongPress(false);
        }}
        onDragging={() => {
          console.log('onDragging');
          onLongPress(false);
        }}
        onDragItemActive={() => {
          console.log('onDragItemActive');
          onLongPress(false);
        }}
        onDragStart={() => {
          console.log('on=DragStart');
          onLongPress(false);
        }}
        onItemPress={() => {
          console.log('onItemPress');
          // onLongPress();
        }}
        data={selectedImages}
        onDragRelease={d => {
          console.log(d);
          setSelectedImages(d);
          onLongPress(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: width * 0.85,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    height: '38%',
  },
  boximage: {
    width: '100%',
    height: '100%',
  },
  item: {
    width: width * 0.37,
    height: width * 0.44,
    overflow: 'hidden',

    borderRadius: 12,
    backgroundColor: Colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item_text: {
    fontSize: FONT_SIZES[15],
    color: Colors.textPrimary,
    opacity: 0.8,
  },
});
