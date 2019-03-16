import React from 'react';
import { View, Text, Button } from 'react-native'

export const If = (props) => {
    return (props.test)
        ? props.children
        : false
}
