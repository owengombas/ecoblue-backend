"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const axios_1 = require("axios");
class HttpRequest {
    constructor(params) {
        this._cookies = new Map();
        this.Data = params.data;
        this.Cookies = params.cookies;
        this.ContentType = params.contentType;
        this.Url = params.url;
        this.Method = params.method;
        this.Headers = params.headers;
    }
    get Data() {
        return this._data;
    }
    set Data(data) {
        this._data = data;
    }
    get Url() {
        return this._url;
    }
    set Url(url) {
        this._url = url;
    }
    get Method() {
        return this._method;
    }
    set Method(method) {
        this._method = method;
    }
    get ContentType() {
        return this._contentType;
    }
    set ContentType(contentType) {
        this._contentType = contentType;
    }
    get Cookies() {
        return this._cookies;
    }
    set Cookies(val) {
        this._cookies = val;
    }
    get Headers() {
        return this._headers;
    }
    set Headers(headers) {
        this._headers = headers;
    }
    /**
     * Flat the cookies to put it into the headers
     */
    get FlatCookies() {
        if (this._cookies) {
            return Array.from(this._cookies).reduce((prev, curr, index) => {
                return `${prev}${index > 0 ? ";" : ""}${curr[0]}=${curr[1]}`;
            }, "");
        }
        return "";
    }
    /**
     * Execute the HTTP request
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield axios_1.default(this.Url, {
                method: this.Method,
                data: this.Data,
                httpsAgent: new https_1.Agent({
                    rejectUnauthorized: false
                }),
                headers: Object.assign({ "Content-Type": this.ContentType, Cookie: this.FlatCookies }, this.Headers)
            });
            return res.data;
        });
    }
}
exports.HttpRequest = HttpRequest;
//# sourceMappingURL=HttpRequest.js.map