import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/providers/ThemeProviders'

const index = () => {
  const { toggleTheme } = useTheme();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>index</Text>
      <TouchableOpacity onPress={toggleTheme} style={{backgroundColor: 'red', padding: 10, borderRadius: 5}}>
        <Text>Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})