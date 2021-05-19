import { createContext, useContext, useReducer } from 'react';
import { initialState, reducer } from '../reducers/modalReducer';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    return (
        <ModalContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </ModalContext.Provider>
    );
};
