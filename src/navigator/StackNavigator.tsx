import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screen/LoginScreen";
import { RegisterScreen } from "../screen/RegisterScreen";
import { HomeScreen } from "../screen/HomeScreen/HomeScreen";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { styles } from "../theme/style";

//interface - rutas
interface Routes {
  name: string;
  screen: () => JSX.Element; //Componente React
}

//Arreglos - rutas cuando el usuario no este autenticado
const routesNoAuth: Routes[] = [
  { name: "Login", screen: LoginScreen },
  { name: "Register", screen: RegisterScreen },
];

//Arreglos - rutas cuando el usuario  este autenticado
const routesAuth: Routes[] = [{ name: "Home", screen: HomeScreen }];

const Stack = createStackNavigator();

export const StackNavigator = () => {
  //hook useState: Verificar si esta autenticado o no
  const [isAuth, setIsAuth] = useState<boolean>(false);

  //hook useState : controlar carga inicial
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //hook useEffect: Validar el estado de la autenticacion
  useEffect(() => {
    //cargar el activity indicator
    setIsLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      }
      //Ocultar es activity indicator
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={styles.rootActivity}>
          <ActivityIndicator animating={true} size={30} />
        </View>
      ) : (
        <Stack.Navigator>
          {!isAuth
            ? routesNoAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))
            : routesAuth.map((item, index) => (
                <Stack.Screen
                  key={index}
                  name={item.name}
                  options={{ headerShown: false }}
                  component={item.screen}
                />
              ))}
        </Stack.Navigator>
      )}
    </>
  );
};
