"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @author Стромов А.С.
 * Класс генерации  Stub данных для эмуляции поведения реальных датчиков состояния
 */
class Authorization {
    checkAuthorizationData(dataUser) {
        console.log(dataUser, 'dataUser');
        if (dataUser.login === '123' && dataUser.password === '123') {
            return { name: 123, status: true };
        }
        if (dataUser.login === '1' && dataUser.password === '1') {
            return { name: 1, status: true };
        }
        if (dataUser.login === '3' && dataUser.password === '3') {
            return { name: 3, status: true };
        }
        if (dataUser.login === '4' && dataUser.password === '4') {
            return { name: 4, status: true };
        }
        return false;
    }
}
exports.default = Authorization;
//# sourceMappingURL=Authorization.js.map