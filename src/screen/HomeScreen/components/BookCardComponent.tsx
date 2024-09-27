import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/style";

export const BookCardComponent = () => {
  return (
    <View style={styles.rootListBook}>
      <View>
        <Text variant="bodySmall">Nombre:</Text>
        <Text variant="bodySmall">Precio:</Text>
      </View>
      <View style={styles.icon}>
        <IconButton
          icon="book-open-page-variant-outline"
          iconColor="#000"
          size={25}
          mode="contained"
          onPress={() => ('ja')}
        />
      </View>
    </View>
  );
};
