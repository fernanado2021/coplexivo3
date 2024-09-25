import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Snackbar, TextInput } from "react-native-paper";
import { styles } from "../theme/style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface - formRegister
interface FormRegister {
  email: string;
  password: string;
}

//interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const RegisterScreen = () => {
  //hook useState: cambiar el estado de formulario
  const [formRegister, setformRegister] = useState<FormRegister>({
    email: "",
    password: "",
  });

  //hook usestate: cambiar estado del mensaje
  const [showMessage, setShowMessage] = useState<ShowMessage>({
    visible: false,
    message: "",
    color: "#fff",
  });

  //hook usestate: cambiar visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //hook usenavigation: permite la navegacion de un scrren a otro
  const navigation = useNavigation();

  //Funcion: actualizar el estado del formulario
  const handleSetValues = (key: string, value: string) => {
    setformRegister({ ...formRegister, [key]: value });
  };

  //Funcion:registar usuarios
  const handleRegister = async () => {
    if (!formRegister.email || !formRegister.password) {
      setShowMessage({
        visible: true,
        message: "Debes llenar todos los campos",
        color: "#FF0000",
      });
      return;
    }
    console.log(formRegister);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password
      );
      setShowMessage({
        visible: true,
        message: "Usuario creado con exito",
        color: "#008000",
      });
    } catch (e) {
      console.log(e);
      setShowMessage({
        visible: true,
        message: "Error al crear usuario intente mas tarde",
        color: "#FF0000",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Registrate</Text>
      <TextInput
        label="Correo Electrónico"
        mode="outlined"
        placeholder="Escribe tu Correo Electrónico"
        onChangeText={(value) => handleSetValues("email", value)}
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        mode="outlined"
        placeholder="Escribe tu Contraseña"
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChangeText={(value) => handleSetValues("password", value)}
        style={styles.input}
      />
      <Button
        icon="content-save"
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
      >
        Registrarse
      </Button>

      <Text
        style={styles.textRedirect}
        onPress={() =>
          navigation.dispatch(CommonActions.navigate({ name: "Login" }))
        }
      >
        Ya tengo una cuenta? Iniciar Sesion Ahora!
      </Text>

      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ ...styles.snackbar, backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};
