import React, { useState } from "react";
import {
  Button,
  Divider,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../../theme/style";
import { View } from "react-native";
import { push, ref, set } from "firebase/database";
import { dbRealTime } from "../../../config/firebaseConfig";

//Interface - Props (propiedades)
interface Props {
  showModalNewBook: boolean;
  setShowModalNewBook: Function; //Funcion del hook Strate
}

//interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

//interface - FormBook
interface FormBook {
  nombre: string;
  autor: string;
  editorial: string;
  n_hojas: number;
  precio: number;
}

export const NewBookComponent = ({
  showModalNewBook,
  setShowModalNewBook,
}: Props) => {
  //hook useState; cambiar el estado del formulario
  const [formBook, setFormBook] = useState<FormBook>({
    nombre: "",
    autor: "",
    editorial: "",
    n_hojas: 0,
    precio: 0,
  });

  //hook usestate: cambiar estado del mensaje
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  //funcion: actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setFormBook({ ...formBook, [key]: value });
  };

  //funcion: agregar los libros
  const handleSaveBook = async () => {
    if (
      !formBook.nombre ||
      !formBook.autor ||
      !formBook.editorial ||
      !formBook.n_hojas ||
      !formBook.precio
    ) {
      setShowMessage({
        visible: true,
        message: "Debes llenar todos los campos",
        color: "#FF0000",
      });
      return;
    }

    //1. crear o redireccionar a la tabla de la bd
    const dbRef = ref(dbRealTime, "books");
    //2. Crear una coleccion que agrege los datoos en la dbRef
    const saveBook = push(dbRef);
    //3. Almacenar los datos en la bd
    try {
      await set(saveBook, formBook);
      //cerrar modal
      setShowModalNewBook(false);
      setShowMessage({
        visible: true,
        message: "Producto agregado correctamente",
        color: "#109048",
      });
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "No se pudo guardar , intentalo mas tarde",
        color: "#FF0000",
      });
    }
  };

  return (
    <>
      <Portal>
        <Modal visible={showModalNewBook} contentContainerStyle={styles.modal}>
          <View style={styles.modalHeader}>
            <Text variant="headlineSmall">Nuevo Libro</Text>
            <IconButton
              icon="close-box"
              size={30}
              onPress={() => setShowModalNewBook(false)}
            />
          </View>
          <Divider />
          <TextInput
            mode="outlined"
            label="Nombre"
            onChangeText={(value) => handleSetValues("nombre", value)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Autor"
            onChangeText={(value) => handleSetValues("autor", value)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Editorial"
            onChangeText={(value) => handleSetValues("editorial", value)}
            style={styles.input}
          />
          <View style={styles.rootIputBook}>
            <TextInput
              mode="outlined"
              label="Num Hojas"
              keyboardType="numeric"
              onChangeText={(value) => handleSetValues("n_hojas", value)}
              style={[styles.inputBook]}
            />
            <TextInput
              mode="outlined"
              label="Precio"
              keyboardType="numeric"
              onChangeText={(value) => handleSetValues("precio", value)}
              style={[styles.inputBook]}
            />
          </View>
          <Button
            icon="book"
            mode="contained"
            onPress={handleSaveBook}
            style={styles.buttonNewBook}
          >
            Registrar Libro
          </Button>
        </Modal>
        <Snackbar
          visible={showMessage.visible}
          onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
          style={{ ...styles.snackbarForm, backgroundColor: showMessage.color }}
        >
          {showMessage.message}
        </Snackbar>
      </Portal>
    </>
  );
};
