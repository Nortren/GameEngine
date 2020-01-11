export default class Dynamic {
    _count: number;
    props: object;
    _animate: boolean;
    _pressKey: string;

    constructor(options) {
        // super(props);
        this._count = 0;
        this.props = options.props;
        this._animate = this.props.animations;
    }

    /**
     * Метод запуска анимации персоонажа
     * При первичной инициализации движка запскаем анимацию персоонажа и обновляем ее состояние от изменения state
     */
    humanoidAnimation() {
        setInterval(() => {
            this._count++;
        }, 1000);
        this._animate = false;
    }

    /**
     * Обновления sprite анимации
     * @param context
     * @param canvas
     * @param imgHero картинка отображения гавного героя
     * @param props данные от контроллеров управления
     */
    updateUserAvatar(hero, props) {

        if (this._count > 3) {
            this._count = 0;
        }

        let spriteOffsetsS = [];
        spriteOffsetsS.push({x: 0.03, y: 0.75, width: 57, height: 42});
        spriteOffsetsS.push({x: 0.27, y: 0.75, width: 54, height: 39});
        spriteOffsetsS.push({x: 0.53, y: 0.75, width: 57, height: 38});
        spriteOffsetsS.push({x: 0.78, y: 0.75, width: 55, height: 40});

        let spriteOffsetsW = [];
        spriteOffsetsW.push({x:  0.03, y: 0, width: 57, height: 42});
        spriteOffsetsW.push({x: 0.27, y: 0, width: 54, height: 39});
        spriteOffsetsW.push({x: 0.53, y: 0, width: 57, height: 38});
        spriteOffsetsW.push({x: 0.78, y: 0, width: 55, height: 40});
        let spriteOffsetsD = [];
        spriteOffsetsD.push({x: 0.03, y: 0.25, width: 57, height: 42});
        spriteOffsetsD.push({x: 0.27, y: 0.25, width: 54, height: 39});
        spriteOffsetsD.push({x: 0.53, y: 0.25, width: 57, height: 38});
        spriteOffsetsD.push({x: 0.78, y: 0.25, width: 55, height: 40});
        let spriteOffsetsA = [];
        spriteOffsetsA.push({x: 0.03, y: 0.5, width: 57, height: 42});
        spriteOffsetsA.push({x: 0.27, y: 0.5, width: 54, height: 39});
        spriteOffsetsA.push({x: 0.53, y: 0.5, width: 57, height: 38});
        spriteOffsetsA.push({x: 0.78, y: 0.5, width: 55, height: 40});

        let rect = spriteOffsetsS[this._count];
        if (this._pressKey === "A" || (props && props.direction === "LEFT")) {
            rect = spriteOffsetsA[this._count];
        }
        if (this._pressKey === "D" || (props && props.direction === "RIGHT")) {
            rect = spriteOffsetsD[this._count];
        }
        if (this._pressKey === "W" || (props && props.direction === "UP")) {
            rect = spriteOffsetsW[this._count];
        }
        if (this._pressKey === "S" || (props && props.direction === "DOWN")) {
            rect = spriteOffsetsS[this._count];
        }
        //рисуем героя по центру картинки
        hero.material.map.offset.x = rect.x;
        hero.material.map.offset.y = rect.y;
        this._count++;
        // context.drawImage(imgHero, rect.x, rect.y, 70, 70, canvas.width / 2, canvas.height / 2, 50, 50);
    }

    /**
     * Метод обновления локации и перемещения персоонажа(он у нас всегда по центру)
     * @param context
     * @param canvas
     * @param img картинка локации
     * @param props данные с контролов управления для перемещения карты относительно персоонажа
     */
    updateMap(map, props) {
        map.position.x= props.moveX*0.01;
        map.position.y= props.moveY*-0.01;
    }
}





