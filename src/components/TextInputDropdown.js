import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, FlatList, SafeAreaView } from 'react-native'
import { TextInput as Input, Menu } from 'react-native-paper'
import { theme } from '../core/theme'

export default function TextInputDropdown({ ...props }) {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                renderItem={({ item }) =>
                    <Menu.Item
                        title={item}
                        onPress={(text) => {
                            props.value(item)
                        }}
                    />}
                {...props}
            />
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    input: {
        backgroundColor: theme.colors.surface,
    },
    container2: {
        flex: 1,
        borderWidth: 2,
        marginTop: 0,
        maxHeight: "50%"
    },
    description: {
        fontSize: 13,
        color: theme.colors.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: theme.colors.error,
        paddingTop: 8,
    },
})
