import { reducer, initialState } from '../reducers/dataReducer';

const { createContext, useContext, useReducer } = require('react');

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    return (
        <DataContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </DataContext.Provider>
    );
};
