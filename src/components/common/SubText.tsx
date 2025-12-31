import React from 'react'
import { Text,TextProps, useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '../../theme/color';
    
function SubText({ children, style }: { children: React.ReactNode; style?: any }) {
    const scheme = useColorScheme();
    const colors = scheme === "dark" ? DarkTheme : LightTheme;
    return (
        <Text style={[style,  {color: colors.text}]}>
            {children}
        </Text>
    )
}

export default SubText