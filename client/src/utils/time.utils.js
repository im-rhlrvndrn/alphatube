export const transformDate = (date) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const splittedDate = date
        .split('-')
        .map((item, index) => (index === 1 ? months[+item - 1]?.slice(0, 3) : +item));
    return `${splittedDate[1]} ${splittedDate[2]}, ${splittedDate[0]}`;
};

export const processDuration = (duration = 'PT1H1M55S') => {
    duration = duration
        .split('')
        .map((item, index, array) => {
            if (!isNaN(item)) {
                if (!isNaN(array[index - 1]) || !isNaN(array[index + 1])) return item;
                else if (+item < 10) return `0${item}`;
                // else if (+item < 100) `00${item}`;
            }
            return item;
        })
        .filter((item) => item)
        .slice(2)
        .join('');

    return {
        hours:
            duration.split('').findIndex((item) => item === 'H') !== -1
                ? duration.split('H').shift()
                : '00',
        minutes:
            duration.split('').findIndex((item) => item === 'M') !== -1
                ? duration.split('M').shift().split('H').pop()
                : '00',
        seconds:
            duration.split('').findIndex((item) => item === 'S') !== -1
                ? duration.split('S').shift().split('M').pop().split('H').pop()
                : '00',
    };
};

export const processPublishedAt = (date) => {
    const [year, month, day] = date
        .split('T')[0]
        .split('-')
        .map((date) => +date);

    return [year, month, day];
};

// console.log('Transformed duration => ', processDuration('PT1H10M55S'));
// console.log('Transformed date => ', transformDate('2017-02-20'));
