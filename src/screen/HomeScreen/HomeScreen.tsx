import React, { useEffect, useState } from 'react'
import { View, Button } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { styles } from '../../theme/style'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';

// Interface - UserAuth
interface UserAuth {
    name: string;
}

export const HomeScreen = () => {
    const navigation = useNavigation();  // Hook para manejar la navegación

    // hook useState: Cambiar el estado del formulario
    const [userAuth, setUserAuth] = useState<UserAuth>({
        name: ""
    })

    // hook useEffect: Validar el estado de la autenticación
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserAuth({ name: user.displayName ?? 'N/A' })
        }
      })
    }, [])

    // Función para cerrar sesión
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('Cierre de sesión exitoso');
                // Redirigir a la pantalla de inicio de sesión
                navigation.navigate('Login' as never);
                })
                .catch((error) => {
                    console.error('Error al cerrar sesión:', error);
                });
    }

    return (
        <View style={styles.rootHome}>
            <View style={styles.headerHome}>
                <Avatar.Icon size={40} icon="account" />
                <View>
                    <Text variant='labelLarge'>Bienvenid@</Text>
                    <Text variant='bodySmall'>{userAuth.name}</Text>
                </View>
            </View>

            {/* Botón para cerrar sesión */}
            <Button title="Cerrar sesión" onPress={handleSignOut} />
        </View>
    )
}
