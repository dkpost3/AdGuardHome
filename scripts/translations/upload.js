const path = require('path');
const fs = require('fs');
const request = require('request-promise');

const LOCALES_DIR = '../../client/src/__locales';
const BASE_FILE = 'en.json';
const LANGUAGE = 'en';
const TWOSKY_URI = process.env.TWOSKY_URI;
const TWOSKY_PROJECT_ID = 'home';

/**
 * Prepare post params
 */
const getRequestData = (url, projectId) => {
    const formData = {
        format: 'json',
        language: LANGUAGE,
        filename: BASE_FILE,
        project: projectId,
        file: fs.createReadStream(path.resolve(LOCALES_DIR, `${LANGUAGE}.json`)),
    };

    return {
        url: `${url}/upload`,
        formData
    };
};

/**
 * Make request to twosky to upload new json
 */
const upload = () => {
    if (!TWOSKY_URI) {
        console.error('No credentials');
        return;
    }

    const { url, formData } = getRequestData(TWOSKY_URI, TWOSKY_PROJECT_ID);
    request
        .post({ url, formData })
        .catch(err => console.log(err));
};

upload();
