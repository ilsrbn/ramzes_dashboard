import { __awaiter } from "tslib";
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { HttpHeaders } from '@angular/common/http';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiError } from './ApiError';
const isDefined = (value) => {
    return value !== undefined && value !== null;
};
const isString = (value) => {
    return typeof value === 'string';
};
const isStringWithValue = (value) => {
    return isString(value) && value !== '';
};
const isBlob = (value) => {
    return (typeof value === 'object' &&
        typeof value.type === 'string' &&
        typeof value.stream === 'function' &&
        typeof value.arrayBuffer === 'function' &&
        typeof value.constructor === 'function' &&
        typeof value.constructor.name === 'string' &&
        /^(Blob|File)$/.test(value.constructor.name) &&
        /^(Blob|File)$/.test(value[Symbol.toStringTag]));
};
const isFormData = (value) => {
    return value instanceof FormData;
};
const base64 = (str) => {
    try {
        return btoa(str);
    }
    catch (err) {
        // @ts-ignore
        return Buffer.from(str).toString('base64');
    }
};
const getQueryString = (params) => {
    const qs = [];
    const append = (key, value) => {
        qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    };
    const process = (key, value) => {
        if (isDefined(value)) {
            if (Array.isArray(value)) {
                value.forEach(v => {
                    process(key, v);
                });
            }
            else if (typeof value === 'object') {
                Object.entries(value).forEach(([k, v]) => {
                    process(`${key}[${k}]`, v);
                });
            }
            else {
                append(key, value);
            }
        }
    };
    Object.entries(params).forEach(([key, value]) => {
        process(key, value);
    });
    if (qs.length > 0) {
        return `?${qs.join('&')}`;
    }
    return '';
};
const getUrl = (config, options) => {
    const encoder = config.ENCODE_PATH || encodeURI;
    const path = options.url
        .replace('{api-version}', config.VERSION)
        .replace(/{(.*?)}/g, (substring, group) => {
        var _a;
        if ((_a = options.path) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(group)) {
            return encoder(String(options.path[group]));
        }
        return substring;
    });
    const url = `${config.BASE}${path}`;
    if (options.query) {
        return `${url}${getQueryString(options.query)}`;
    }
    return url;
};
const getFormData = (options) => {
    if (options.formData) {
        const formData = new FormData();
        const process = (key, value) => {
            if (isString(value) || isBlob(value)) {
                formData.append(key, value);
            }
            else {
                formData.append(key, JSON.stringify(value));
            }
        };
        Object.entries(options.formData)
            .filter(([_, value]) => isDefined(value))
            .forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => process(key, v));
            }
            else {
                process(key, value);
            }
        });
        return formData;
    }
    return undefined;
};
const resolve = (options, resolver) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof resolver === 'function') {
        return resolver(options);
    }
    return resolver;
});
const getHeaders = (config, options) => {
    return forkJoin({
        token: resolve(options, config.TOKEN),
        username: resolve(options, config.USERNAME),
        password: resolve(options, config.PASSWORD),
        additionalHeaders: resolve(options, config.HEADERS),
    }).pipe(map(({ token, username, password, additionalHeaders }) => {
        const headers = Object.entries(Object.assign(Object.assign({ Accept: 'application/json' }, additionalHeaders), options.headers))
            .filter(([_, value]) => isDefined(value))
            .reduce((headers, [key, value]) => (Object.assign(Object.assign({}, headers), { [key]: String(value) })), {});
        if (isStringWithValue(token)) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        if (isStringWithValue(username) && isStringWithValue(password)) {
            const credentials = base64(`${username}:${password}`);
            headers['Authorization'] = `Basic ${credentials}`;
        }
        if (options.body) {
            if (options.mediaType) {
                headers['Content-Type'] = options.mediaType;
            }
            else if (isBlob(options.body)) {
                headers['Content-Type'] = options.body.type || 'application/octet-stream';
            }
            else if (isString(options.body)) {
                headers['Content-Type'] = 'text/plain';
            }
            else if (!isFormData(options.body)) {
                headers['Content-Type'] = 'application/json';
            }
        }
        return new HttpHeaders(headers);
    }));
};
const getRequestBody = (options) => {
    var _a;
    if (options.body) {
        if ((_a = options.mediaType) === null || _a === void 0 ? void 0 : _a.includes('/json')) {
            return JSON.stringify(options.body);
        }
        else if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
            return options.body;
        }
        else {
            return JSON.stringify(options.body);
        }
    }
    return undefined;
};
export const sendRequest = (config, options, http, url, body, formData, headers) => {
    return http.request(options.method, url, {
        headers,
        body: body !== null && body !== void 0 ? body : formData,
        withCredentials: config.WITH_CREDENTIALS,
        observe: 'response',
    });
};
const getResponseHeader = (response, responseHeader) => {
    if (responseHeader) {
        const value = response.headers.get(responseHeader);
        if (isString(value)) {
            return value;
        }
    }
    return undefined;
};
const getResponseBody = (response) => {
    if (response.status !== 204 && response.body !== null) {
        return response.body;
    }
    return undefined;
};
const catchErrorCodes = (options, result) => {
    const errors = Object.assign({ 400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable' }, options.errors);
    const error = errors[result.status];
    if (error) {
        throw new ApiError(options, result, error);
    }
    if (!result.ok) {
        throw new ApiError(options, result, 'Generic Error');
    }
};
/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param http The Angular HTTP client
 * @param options The request options from the service
 * @returns Observable<T>
 * @throws ApiError
 */
export const request = (config, http, options) => {
    const url = getUrl(config, options);
    const formData = getFormData(options);
    const body = getRequestBody(options);
    return getHeaders(config, options).pipe(switchMap(headers => {
        return sendRequest(config, options, http, url, formData, body, headers);
    }), map(response => {
        const responseBody = getResponseBody(response);
        const responseHeader = getResponseHeader(response, options.responseHeader);
        return {
            url,
            ok: response.ok,
            status: response.status,
            statusText: response.statusText,
            body: responseHeader !== null && responseHeader !== void 0 ? responseHeader : responseBody,
        };
    }), catchError((error) => {
        var _a;
        if (!error.status) {
            return throwError(error);
        }
        return of({
            url,
            ok: error.ok,
            status: error.status,
            statusText: error.statusText,
            body: (_a = error.error) !== null && _a !== void 0 ? _a : error.statusText,
        });
    }), map(result => {
        catchErrorCodes(options, result);
        return result.body;
    }), catchError((error) => {
        return throwError(error);
    }));
};
//# sourceMappingURL=request.js.map