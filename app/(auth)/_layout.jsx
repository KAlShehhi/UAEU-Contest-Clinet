import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <>
        <Stack>
            <Stack.Screen name='sign-in' options={{ headerShown: false}}/>
            <Stack.Screen name='sign-up' options={{ headerShown: false}}/>
            <Stack.Screen name='forgetPassword' options={{ headerShown: false}}/>
            <Stack.Screen name='enterResetCode' options={{ headerShown: false}}/>
            <Stack.Screen name='resetPassword' options={{ headerShown: false}}/>
        </Stack>
    
    </>
  )
}

export default _layout