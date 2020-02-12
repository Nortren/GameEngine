/**
 * @author Стромов А.С.
 * Класс генерации  Stub данных для эмуляции поведения реальных датчиков состояния
 */
export default class Player {
    /**
     * Обновление состояния игрока
     * @param playerData
     * @param props
     * @param rect
     */
    update(playerData: Object, props: Object, rect: Object, enemyArray) {
        let positionPlayer = playerData.user.position;
        let positionHealthLine = playerData.healthLine.position;
        let playerHealth = playerData.health;
        let healthLenght = this.calculationHealthLine(playerHealth);
        playerData.healthLine.scale.x = healthLenght;
        playerData.healthLine.scale.z = 2;

        positionHealthLine.x = positionPlayer.x;
        positionHealthLine.z = positionPlayer.z;
        positionHealthLine.y = 0;

        //рисуем героя по центру картинки

        playerData.user.position.x = props.moveX * -0.01;
        playerData.user.position.z = props.moveZ * -0.01;
        playerData.collaider.position.x = playerData.user.position.x;
        playerData.collaider.position.z = playerData.user.position.z;
        playerData.healthLine.position.x = playerData.user.position.x;
        playerData.healthLine.position.z = playerData.user.position.z;


        // this.playerSkillUse(props, playerData, enemyArray);
    }

}

