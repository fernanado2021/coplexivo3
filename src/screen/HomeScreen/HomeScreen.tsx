import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  FAB,
  IconButton,
  Modal,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import { styles } from "../../theme/style";
import { signOut, updateProfile } from "firebase/auth";
import { auth, dbRealTime } from "../../config/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import firebase from "@firebase/auth";
import { BookCardComponent } from "./components/BookCardComponent";
import { NewBookComponent } from "./components/NewBookComponent";
import { onValue, ref } from "firebase/database";

// Interface - FormUser
interface FormUser {
  name: string;
}

// Interface - Book
export interface Book {
  id: string;
  nombre: string;
  autor: string;
  editorial: string;
  n_hojas: number;
  precio: number;
}

//interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const HomeScreen = () => {

   //hook usestate: cambiar estado del mensaje
   const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });


  const navigation = useNavigation();

  const [formUser, setFormUser] = useState<FormUser>({ name: "" });
  const [userData, setUserData] = useState<firebase.User | null>(null);
  const [book, setBook] = useState<Book[]>([]);

  //hook useState : permite que el modal de usuario se visualice o no
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  //hook useState : permite que el modal de registro de  libro se visualice o no
  const [showModalNewBook, setShowModalNewBook] = useState<boolean>(false);

  useEffect(() => {
    setUserData(auth.currentUser);
    setFormUser({ name: auth.currentUser?.displayName ?? "" });
    //llamar la funcion par ala lista de libros
    getAllBook();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Cierre de sesión exitoso");
        navigation.navigate("Login" as never);
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  };

  const handleSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  };

  const handleUpdateUser = async () => {
    try {
      await updateProfile(userData!, {
        displayName: formUser.name,
      });
      setShowMessage({
        visible: true,
        message: "Usuario Actualizado Correctamente",
        color: "#109048",
      });
    } catch (e) {
      console.log(e);
    }
    setShowModalProfile(false);
  };
  
  //Funcion : para poder ibtener los productos para listarlos
  const getAllBook = () => {
    //1. direccionar a la db
    const dbRef = ref(dbRealTime, "books");
    //2. Accededr a la data
    onValue(dbRef, (snapshot) =>{
      //3. Capturar la dat
      const data = snapshot.val(); //Obtener la data en un formato esperado
      //4. Obtener las keys de cada dato
      const getKeys = Object.keys(data);
      //5. Crear un arreglo para amacenar cada libro de la bd
      const listBook: Book[] = [];
      //6. Recorre las key para acceder a cada libro
      getKeys.forEach((key) =>{
        const value={...data[key], id:key}
        listBook.push(value);
      });
      //7. Actualizar la data obytenida en el areglo del hook
      setBook(listBook);
    })
  }

  return (
    <>
      <View style={styles.rootHome}>
        <View style={styles.headerSignOut}>
          <Button
            icon="logout"
            mode="contained"
            onPress={handleSignOut}
            style={styles.buttonSignOut}
          >
            Cerrar Sesión
          </Button>
        </View>
        <View style={styles.header}>
          <Avatar.Icon
            size={50}
            icon="account"
            color="#fff"
            style={{ backgroundColor: "#4f63d2" }}
          />
          <View style={styles.welcomeText}>
            <Text variant="titleMedium">Bienvenid@</Text>
            <Text variant="bodyMedium" style={styles.userName}>
              {userData?.displayName}
            </Text>
          </View>
          <IconButton
            icon="account-edit"
            iconColor="#4f63d2"
            size={30}
            onPress={() => setShowModalProfile(true)}
            style={styles.editIcon}
          />
        </View>
        <View style={styles.rootBook}>
          <Text style={styles.bookListTitle} variant="bodyLarge">
            Agregar Libro
          </Text>
          <FlatList
            data={book}
            renderItem={({ item }) => <BookCardComponent book={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.modalHeader}>
            <Text variant="headlineSmall">Mi Perfil</Text>
            <IconButton
              icon="close-box"
              size={30}
              onPress={() => setShowModalProfile(false)}
            />
          </View>
          <Divider />
          <TextInput
            mode="outlined"
            label="Nombre"
            value={formUser.name}
            onChangeText={(value) => handleSetValues("name", value)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Correo"
            disabled
            value={userData?.email!}
            style={styles.input}
          />
          <Button
            icon="book-edit"
            mode="contained"
            onPress={handleUpdateUser}
            style={styles.buttonEditProfile}
          >
            Actualizar
          </Button>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        color="white"
        style={styles.fabBook}
        onPress={() => setShowModalNewBook(true)}
      />
      {/* Indicar que va a tener propiedades  del home al componente*/}
      <NewBookComponent
        showModalNewBook={showModalNewBook}
        setShowModalNewBook={setShowModalNewBook}
      ></NewBookComponent>
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
