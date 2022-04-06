const axios = require('axios');

export const baseURL = 'https://www.googleapis.com/youtube/v3';

export const APIkey = process.env.REACT_APP_YOUTUBE_API_KEY;
// || 'AIzaSyA3dgnhBYnDQG6JA_bqCO39B-i1DvyC1uQ'; // First API key ▼
// 'AIzaSyDhPyhFlXcjO1Ik0fzfE0DxVqUiuJQZ3EE'; // My Second API key ▲ (true)
class YouTube {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
    }

    transformQueryParams = (params) => {
        const keys = Object.keys(params);
        let constructedQueryParams = '';

        return `?${keys
            .reduce((acc, cur) => {
                if (typeof params[cur] === 'object' && params[cur].length)
                    params[cur].forEach((param) => (constructedQueryParams += `&${cur}=${param}`));
                else constructedQueryParams += `&${cur}=${params[cur]}`;

                return constructedQueryParams;
            }, constructedQueryParams)
            .split('')
            .slice(1)
            .join('')}&key=${this.apiKey}`;
    };

    decodeQueryParams = (queryParam = '') =>
        queryParam
            .slice(1)
            .split('&')
            .reduce((acc, curValue) => {
                const [key, value] = curValue.split('=');

                return { ...acc, [key]: value };
            }, {});

    getVideo = async (
        videoId,
        params = {
            part: ['snippet', 'statistics', 'contentDetails'],
            regionCode: 'IN',
            maxResults: 50,
        }
    ) => {
        try {
            const response = await axios.get(
                `${this.baseUrl}/videos${this.transformQueryParams(params)}&id=${videoId}`
            );
            return response;
        } catch (error) {
            console.error(error.toJSON());
        }
    };

    getVideos = async (
        videoIds = [],
        params = {
            part: ['snippet', 'statistics', 'contentDetails'],
            regionCode: 'IN',
            maxResults: 50,
        }
    ) => {
        try {
            const response = await axios.get(
                `${this.baseUrl}/videos${this.transformQueryParams(params)}&id=${videoIds.join(
                    ','
                )}`
            );
            return response;
        } catch (error) {
            console.error(error.toJSON());
        }
    };

    getChannel = async (
        channelId,
        params = {
            part: ['snippet', 'statistics'],
            maxResults: 50,
        }
    ) => {
        try {
            const response = await axios.get(
                `${this.baseUrl}/channels${this.transformQueryParams(params)}&id=${channelId}`
            );
            return response;
        } catch (error) {
            console.error(error.toJSON());
        }
    };

    getChannels = async (
        channelId,
        params = {
            part: ['snippet', 'statistics'],
            maxResults: 50,
        }
    ) => {
        try {
            const response = await axios.get(
                `${this.baseUrl}/channels${this.transformQueryParams(params)}&id=${channelId}`
            );
            return response;
        } catch (error) {
            console.error(error.toJSON());
        }
    };

    getPlaylistItems = async (
        playlistId,
        params = {
            part: ['snippet'],
            regionCode: 'IN',
            maxResults: 50,
        }
    ) => {
        try {
            const response = await axios.get(
                `${this.baseUrl}/playlistItems${this.transformQueryParams(
                    params
                )}&playlistId=${playlistId}`
            );
            return response;
        } catch (error) {
            console.error(error.toJSON());
        }
    };

    getRelatedVideos = async (
        videoId,
        params = {
            type: 'video',
            maxResults: 10,
            part: 'snippet', // Can't pass any other `part`
            relatedToVideoId: videoId,
        }
    ) => {
        try {
            const response = await axios.get(
                `${this.baseUrl}/search${this.transformQueryParams(params)}`
            );
            return response;
        } catch (error) {
            console.error(error.toJSON());
        }
    };

    search = async (
        searchQuery,
        params = {
            part: ['snippet', 'statistics', 'contentDetails'],
            type: 'video,channel,playlist',
        }
    ) => {
        try {
            const response = await axios.get(
                `${this.baseUrl}/search${this.transformQueryParams(params)}&q=${searchQuery}`
            );
            return response;
        } catch (error) {
            console.error(error);
        }
    };
}

export default new YouTube(APIkey, baseURL);
