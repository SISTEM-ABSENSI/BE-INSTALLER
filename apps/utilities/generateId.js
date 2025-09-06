"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueId = generateUniqueId;
/* eslint-disable @typescript-eslint/space-before-function-paren */
function generateUniqueId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let id = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        id += characters.charAt(randomIndex);
    }
    return id;
}
