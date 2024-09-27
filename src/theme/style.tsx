import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: "#f4f6f9", // Lighter, softer background
  },
  text: {
    fontSize: 26,
    fontWeight: "800", // Slightly lighter font weight for better readability
    textAlign: "center",
    fontFamily: "Roboto",
    color: "#2a2a2a", // Darker gray for better contrast
    marginBottom: 20,
    letterSpacing: 1.2, // Letter spacing for modern reading
  },
  input: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 14, // Consistent rounded corners
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#4f63d2", // Elegant blue
    width: "100%",
    borderRadius: 14, // Consistent rounded corners
    marginVertical: 9,
    alignItems: "center",
  },
  buttonSignOut: {
    backgroundColor: "#FF0000", // Elegant red for sign out
    width: "50%",
    borderRadius: 14,
    alignItems: "center",
  },
  buttonEditProfile: {
    backgroundColor: "#4f63d2", // Elegant blue for edit profile
    width: "100%",
    borderRadius: 14,
    marginVertical: 9,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff", // White text for strong contrast
    fontSize: 18, // Larger font for better readability
    fontWeight: "600",
  },
  snackbar: {
    width: "100%",
  },
  snackbarForm: {
    width: "96.5%",
  },
  textRedirect: {
    marginTop: 10,
    fontWeight: "600", // Medium weight for redirect text
    color: "#4f63d2", // Modern blue for redirection
    textDecorationLine: "underline",
  },
  rootActivity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f9", // Soft background for activity
  },
  headerSignOut: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  rootHome: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  icon: {
    alignItems: "flex-end",
    flex: 1,
  },
  modal: {
    margin: 15,
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    gap: 10,
  },
  rootBook: {
    marginTop: 10,
  },
  rootListBook: {
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
    gap: 15,
  },
  bookCard: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 10,
    marginVertical: 5,
    padding: 15,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4f63d2",
  },
  bookAuthor: {
    fontSize: 16,
    color: "#2a2a2a",
    marginVertical: 2,
  },
  bookInfo: {
    fontSize: 14,
    color: "#666",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    flex: 1,
    marginLeft:10
  },
  userName: {
    fontWeight: "500",
    color: "#2a2a2a",
  },
  editIcon: {
    marginLeft: 10,
  },
  bookListTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    color: "#4f63d2",
    marginVertical: 15,
  },
  fabBook: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor:'#109048',
  },
  rootIputBook:{
    flexDirection:'row'
  },
  inputBook:{
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 14, // Consistent rounded corners
    paddingHorizontal: 15,
    flex: 1, 
    marginRight: 5
  },
  buttonNewBook: {
    backgroundColor: "#4f63d2", // Elegant blue for edit profile
    width: "100%",
    borderRadius: 14,
    marginVertical: 9,
    alignItems: "center",
  },
});
