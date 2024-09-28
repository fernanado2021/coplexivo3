import React, { useState } from "react";
import { View } from "react-native";
import { styles } from "../theme/style";
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";

//interface - formLogin
interface FormLogin {
  email: string;
  password: string;
}

//interface - mensajes
interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

export const LoginScreen = () => {
  //hook useState: cambiar el estado de formulario
  const [formLogin, setformLogin] = useState<FormLogin>({
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
    setformLogin({ ...formLogin, [key]: value });
  };

  //funcion: Iniciar sesion con el usuario registrado
  const handleSingIn = async () => {
    if (!formLogin.email || !formLogin.password) {
      setShowMessage({
        visible: true,
        message: "Debes llenar todos los campos",
        color: "#FF0000",
      });
      return;
    }
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        formLogin.email,
        formLogin.password
      );
      navigation.dispatch(CommonActions.navigate({name:'Home'}))
    } catch (e) {
      setShowMessage({
        visible: true,
        message: "Correo y/o Contraseña incorrecta!",
        color: "#FF0000",
      });
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>Iniciar Sesion</Text>
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
        icon="login"
        mode="contained"
        onPress={handleSingIn}
        style={styles.button}
      >
        Iniciar Sesion
      </Button>

      <Text style={styles.textRedirect}
        onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Register'}))}>
        No tienes una cuenta? Registrate Ahora!
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
