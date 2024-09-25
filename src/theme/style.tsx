import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#f4f6f9",          // Fondo más claro y suave
  },
  text: {
    fontSize: 26,
    fontWeight: '800',                   // Peso de fuente un poco más liviano para mayor legibilidad
    textAlign: "center",
    fontFamily: 'Roboto',
    color: "#2a2a2a",                    // Color gris más oscuro para un mejor contraste
    marginBottom: 20,
    letterSpacing: 1.2,                  // Espaciado entre letras para una lectura más moderna
  },
  input: {
    width: "100%",
    marginVertical: 9,
    backgroundColor: "#ffffff",
    borderRadius: 14,                    // Bordes más redondeados
    borderWidth: 1,
    borderColor: "#dde1e7",              // Bordes gris claro más suaves
    paddingHorizontal: 15,
    elevation: 3,                        // Sombra sutil en Android
    shadowColor: "#000",                 // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  button: {
    backgroundColor: "#4f63d2",          // Color azul elegante
    width: "100%",
    borderRadius: 14,
    marginVertical: 9,
    alignItems: "center",
    shadowColor: "#000",                 // Sombra suave para el botón
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: "#ffffff",                    // Texto blanco para un contraste fuerte
    fontSize: 18,                        // Fuente más grande para mejor legibilidad
    fontWeight: '600',
  },
  snackbar:{
    width: "100%",
  },
  textRedirect:{
    marginTop: 10,
    fontWeight: '600',                   // Peso medio para el texto de redirección
    color: "#4f63d2",                    // Azul moderno para la redirección
    textDecorationLine: "underline",
  },
  rootActivity:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#f4f6f9",          // Fondo suave también en esta pantalla
  },
  rootHome:{
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 50,
    alignItems: 'center',
  },
  headerHome:{
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingVertical: 10,                 // Añadir espacio vertical al encabezado
  },
});
