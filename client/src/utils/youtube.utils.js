const axios = require('axios');

export const baseURL = 'https://www.googleapis.com/youtube/v3';

export const APIkey = process.env.REACT_APP_YOUTUBE_API_KEY;

export const transformQueryParams = (params) => {
    const keys = Object.keys(params);
    let constructedParamString = '';

    console.log(
        'Constructed query params => ',
        `?${keys
            .reduce((acc, cur) => {
                if (typeof params[cur] === 'object' && params[cur].length)
                    params[cur].forEach((param) => (constructedParamString += `&${cur}=${param}`));
                else constructedParamString += `&${cur}=${params[cur]}`;

                return (acc = constructedParamString);
            }, constructedParamString)
            .split('')
            .slice(1)
            .join('')}`
    );

    return `?${keys
        .reduce((acc, cur) => {
            if (typeof params[cur] === 'object' && params[cur].length)
                params[cur].forEach((param) => (constructedParamString += `&${cur}=${param}`));
            else constructedParamString += `&${cur}=${params[cur]}`;

            return (acc = constructedParamString);
        }, constructedParamString)
        .split('')
        .slice(1)
        .join('')}&key=${APIkey}`;
};

export const getVideo = async (
    videoId,
    params = {
        part: ['snippet', 'statistics', 'contentDetails'],
        regionCode: 'IN',
        maxResults: 50,
    }
) => {
    try {
        const response = await axios.get(
            `${baseURL}/videos${transformQueryParams(params)}&id=${videoId}`
        );
        return response;
    } catch (error) {
        console.error(error.toJSON());
    }
};

export const getVideos = async (
    videoIds,
    params = {
        part: ['snippet', 'statistics', 'contentDetails'],
        regionCode: 'IN',
        maxResults: 50,
    }
) => {
    try {
        const response = await axios.get(
            `${baseURL}/videos${transformQueryParams(params)}&id=${videoIds.join(',')}`
        );
        return response;
    } catch (error) {
        console.error(error.toJSON());
    }
};

export const getChannel = async (
    channelId,
    params = {
        part: ['snippet', 'statistics'],
        maxResults: 50,
    }
) => {
    try {
        const response = await axios.get(
            `${baseURL}/channels${transformQueryParams(params)}&id=${channelId}`
        );
        return response;
    } catch (error) {
        console.error(error.toJSON());
    }
};

export const getChannels = async (
    channelId,
    params = {
        part: ['snippet', 'statistics'],
        maxResults: 50,
    }
) => {
    try {
        const response = await axios.get(
            `${baseURL}/channels${transformQueryParams(params)}&id=${channelId}`
        );
        return response;
    } catch (error) {
        console.error(error.toJSON());
    }
};

export const getRelatedVideos = async (
    videoId,
    params = {
        type: 'video',
        maxResults: 10,
        part: 'snippet', // Can't pass any other `part`
        relatedToVideoId: videoId,
    }
) => {
    try {
        const response = await axios.get(`${baseURL}/search${transformQueryParams(params)}`);
        return response;
    } catch (error) {
        console.error(error.toJSON());
    }
};

export const search = async (
    searchQuery,
    params = {
        part: ['snippet', 'statistics', 'contentDetails'],
        type: 'video,channel,playlist',
    }
) => {
    try {
        const response = await axios.get(
            `${baseURL}/search${transformQueryParams(params)}&q=${searchQuery}`
        );
        return response;
    } catch (error) {
        console.error(error);
    }
};
