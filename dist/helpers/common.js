"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function arrayFromLength(number) {
    return Array.from(new Array(number).keys()).map(function (k) { return k + 1; });
}
exports.arrayFromLength = arrayFromLength;
