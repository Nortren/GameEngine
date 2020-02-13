/**
 * @author Стромов А.С.
 * Класс генерации  Stub данных для эмуляции поведения реальных датчиков состояния
 */
export default class Authorization {

    checkAuthorizationData(dataUser) {

        if (dataUser.login === '123' && dataUser.password === '123') {
            return true
        }
        return false

    }

}

