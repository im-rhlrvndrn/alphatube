import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const lightTheme = {
    light_background: '#f5f5f5',
    dark_background: '#eeeeee',
    color: '#222222',
    constants: {
        light: '#f5f5f5',
        dark: '#222222',
        icon: '#222222',
        primary: '#F8D410',
        my_protein: '#14A8B6',
        red: '#e73a23',
    },
};

const darkTheme = {
    light_background: '#222222',
    dark_background: '#111111',
    color: '#f5f5f5',
    constants: {
        light: '#f5f5f5',
        dark: '#111111',
        icon: '#f5f5f5',
        primary: '#F8D410',
        my_protein: '#14A8B6',
        red: '#e73a23',
    },
};
export const ThemeProvider = ({ children }) => {
    const [isLightTheme, setIsLightTheme] = useState(false);

    const toggleTheme = () => setIsLightTheme((prevState) => !prevState);

    return (
        <ThemeContext.Provider
            value={{
                isLightTheme,
                theme: isLightTheme ? lightTheme : darkTheme,
                setTheme: toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
