import React, { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { Button, Divider, Snackbar, Text, TextInput } from "react-native-paper";
import { styles } from "../../theme/style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Book } from "./HomeScreen";
import { ref, remove, update } from "firebase/database";
import { auth, dbRealTime } from "../../config/firebaseConfig";

//interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const DetailBookScreen = () => {
  //hook usestate: cambiar estado del mensaje
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  //hook useRoute:  acceder a oda la informacion  de navgacion
  const route = useRoute();
  //@ts-ignore
  const { book } = route.params;

  //hook useNavigation: permite navegar de un screen a otro
  const navigation = useNavigation();
  //hokok usuState: camboar el estado del formulario de editar y eliminar
  const [formEdit, setFormEdit] = useState<Book>({
    id: "",
    nombre: "",
    autor: "",
    editorial: "",
    n_hojas: 0,
    precio: 0,
  });
  //hook useEffect: cargar y mostrar la informacion en el formulario de detalle
  useEffect(() => {
    //Actualizar los datos en el formulario
    setFormEdit(book);
  }, []);

  //funcion: actualizar los datos capturados desde el formulario
  const handleSetValues = (key: string, value: string) => {
    setFormEdit({ ...formEdit, [key]: value });
  };

  //Funcion. actualizar la data del libro
  const handleUpdateBook = async () => {
    // console.log(formEdit);
    //1. direccionar a la tabl y al elemento a editar en la db
    const dbRef = ref(dbRealTime, 'books/' +auth.currentUser?.uid +'/'+ formEdit.id);
    //2. Actualizar el dato seleccionado
    try {
      await update(dbRef, {
        nombre: formEdit.nombre,
        autor: formEdit.autor,
        editorial: formEdit.editorial,
        n_hojas: formEdit.n_hojas,
        precio: formEdit.precio,
      });
      setShowMessage({
        visible: true,
        message: "Libro Actualizado Correctamente",
        color: "#109048",
      });
      setTimeout(() => {
        //este fue el error
        navigation.goBack();
      }, 2000);
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "Libro no se pudo Actualizar",
        color: "#FF0000",
      });
    }
  };

  // Función: eliminar el libro
  const handleDeleteBook = async () => {
    const dbRef = ref(dbRealTime, 'books/'+auth.currentUser?.uid + '/'+formEdit.id);
    try {
      await remove(dbRef); // Eliminar el libro de la base de datos
      setShowMessage({
        visible: true,
        message: "Libro Eliminado Correctamente",
        color: "#109048",
      });

      // Redirigir después de un pequeño retraso
      setTimeout(() => {
        navigation.goBack(); // Volver a la pantalla anterior (Home)
      }, 2000);
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "No se pudo Eliminar el Libro",
        color: "#FF0000",
      });
    }
  };
  return (
    <>
      <View style={styles.rootDetail}>
        <Text style={styles.bookListTitle} variant="bodyLarge">
          Detalles del Libro
        </Text>
        <View>
          <Text variant="bodyLarge">Nombre:</Text>
          <TextInput
            mode="outlined"
            value={formEdit.nombre}
            onChangeText={(value) => handleSetValues("nombre", value)}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: "#000" }}></Divider>
        </View>
        <View>
          <Text variant="bodyLarge">Autor:</Text>
          <TextInput
            mode="outlined"
            value={formEdit.autor}
            onChangeText={(value) => handleSetValues("autor", value)}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: "#000" }}></Divider>
        </View>
        <View>
          <Text variant="bodyLarge">Editorial:</Text>
          <TextInput
            mode="outlined"
            value={formEdit.editorial}
            onChangeText={(value) => handleSetValues("editorial", value)}
            style={styles.input}
          />
          <Divider style={{ backgroundColor: "#000" }}></Divider>
        </View>
        <View style={styles.rootIputBook}>
          <View style={styles.inputContainer}>
            <Text variant="bodyLarge">Num Hojas:</Text>
            <TextInput
              mode="outlined"
              keyboardType="numeric"
              value={formEdit.n_hojas.toString()}
              onChangeText={(value) => handleSetValues("n_hojas", value)}
              style={styles.input}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text variant="bodyLarge">Precio:</Text>
            <TextInput
              mode="outlined"
              keyboardType="numeric"
              value={formEdit.precio.toString()}
              onChangeText={(value) => handleSetValues("precio", value)}
              style={styles.input}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon="book-edit"
            mode="contained"
            onPress={handleUpdateBook}
            style={[styles.buttonEditBook, { backgroundColor: "#4f63d2" }]}
          >
            Actualizar Libro
          </Button>
          <Button
            icon="delete"
            mode="contained"
            onPress={handleDeleteBook} // Llamar a la función de eliminar
            style={[styles.buttonEditBook, { backgroundColor: "#FF0000" }]}
          >
            Eliminar Libro
          </Button>
        </View>
      </View>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ ...styles.snackbarForm, backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </>
  );
};
