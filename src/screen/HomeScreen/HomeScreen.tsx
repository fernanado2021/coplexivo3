import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Text } from 'react-native-paper'
import { styles } from '../../theme/style'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';

//interface - UserAuth
interface UserAuth{
    name: string;
}

export const HomeScreen = () => {
  
    //hook useState. cambiar el estado del formulario
    const [userAuth, setUserAuth] = useState<UserAuth>({
        name:""
    })

    //hook useEffect: Validar el estado de la autenticacion
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserAuth({name: user.displayName ?? 'N/A'})
        }
      })
    }, [])
    


    return (
    <View style={styles.rootHome}>
        <View style={styles.headerHome}>
            <Avatar.Icon size={40} icon="account" />
            <View>
                <Text variant='labelLarge'>Bienvenid@</Text>
                <Text variant='bodySmall'>{userAuth.name}</Text>
            </View>
        </View>
    </View>
  )
}
