import Cookies from 'js-cookie';

export const slugify = (inputValue) => inputValue.toString().split(' ').join('-');

export const deSlugify = (inputValue) => inputValue.toString().split('-').join(' ');

export const generateSearchParams = (input) =>
    input
        .split('')
        .slice(1)
        .join('')
        .split('&')
        .reduce((acc, cur, index, sourceArray) => {
            let temp = cur.split('=');
            acc[temp[0]] = temp[1];
            return { ...acc };
        }, {});

export const maxWords = (inputString, maxValue) =>
    `${inputString
        .split('')
        .slice(0, maxValue + 1)
        .join('')}${inputString.length > maxValue ? '...' : ''}`;

export const isUserLoggedIn = () => (!Cookies.get('userId') ? false : true);

export { alreadyExists } from './array_helpers';
export { getFilteredData, getSortedData } from './filter';
export { transformDate, processDuration, processPublishedAt } from './time.utils';
