import React from "react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/style";
import { Book } from "../HomeScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface -Props
interface Props{
  book: Book;
}

export const BookCardComponent = ({book}:Props) => {

  //Permite navegar de un screen a otro
  const navigation = useNavigation();

  return (
    <View style={styles.rootListBook}>
      <View>
        <Text variant="titleMedium">Nombre: {book.nombre}</Text>
        <Text variant="titleSmall">Precio: {book.precio}</Text>
      </View>
      <View style={styles.icon}>
        <IconButton
          icon="book-open-page-variant-outline"
          iconColor="#000"
          size={25}
          mode="contained"
          onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail', params:{book}}))}
        />
      </View>
    </View>
  );
};
