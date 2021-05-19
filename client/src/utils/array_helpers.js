export const alreadyExists = (array, data, propertyName) =>
    array.findIndex((item) => item[propertyName] === data[propertyName]) !== -1;
