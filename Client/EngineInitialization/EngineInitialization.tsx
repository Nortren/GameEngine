import * as React from 'react';
import DinamicAnimation from "../Animation/Dynamic/Dynamic";
import MapCreator from "../MapCreator/MapCreator";
import * as THREE from "three";
/**
 * Главный контрол первичной инициализации движка
 */
export default class EngineInitialization extends React.Component {
    public canvas: object;
    public context: CanvasRenderingContext2D;
    public imgBacground: object;
    public imgHero: object;
    private _testImageMap: object;
    private _dynamicAnimation: DinamicAnimation = new DinamicAnimation(this);
    private _mapCreator: MapCreator = new MapCreator();

    constructor(props: object) {
        super(props);
        this.state = {
            moveX: 0,
            moveY: 0, countMove: 0,
            moveXBoll: true
        };
    }

    componentDidMount() {
        this._testImageMap = this._mapCreator.parserJSON();
        this.canvas = document.getElementById('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // this.context = this.canvas.getContext("2d");
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        const renderer = new THREE.WebGLRenderer({canvas:this.canvas});



        camera.position.z = 5;

        const loader = new THREE.TextureLoader();
        let mapSprite =loader.load(this._testImageMap.map.src);
        this.map =new THREE.Sprite(new THREE.SpriteMaterial({
            map:mapSprite,
        }));
        this.map.scale.set(30,20);
        this.map.position.set(0,0,0);


        let heroTexture =loader.load(this._testImageMap.hero.src);
        heroTexture.wrapS = heroTexture.wrapT = THREE.RepeatWrapping;
        heroTexture.offset.x = 0.78;
        heroTexture.offset.y = 0.5;
        heroTexture.repeat.set( 0.2, 0.25 );
        let hero ;
        hero =new THREE.Sprite(new THREE.SpriteMaterial({
            map:heroTexture,
        }));
        hero.scale.set(0.5,0.5);
        hero.position.set(0,0,0);

        scene.add(hero,this.map);

        this.update(renderer,scene, camera,this.map,hero);
        this._dynamicAnimation.humanoidAnimation();

        // let heroMaterial = new THREE.MeshBasicMaterial( { map: heroTexture, side:THREE.DoubleSide } );
        // let heroGeometry = new THREE.PlaneGeometry(1, 1, 0, 0);
        // let heroNew = new THREE.Mesh(heroGeometry, heroMaterial);
    }

    update(renderer,scene, camera,map,hero) {
        requestAnimationFrame( ()=>{ this.update(renderer,scene, camera,map,hero)} );
        renderer.render( scene, camera );
        // hero.material.map.wrapS = 500;
        // hero.material.map.offset.x+=0.01;
        // hero.material.map.offset.y=0.75;
        this._dynamicAnimation.updateMap(map, this.props);
        this._dynamicAnimation.updateUserAvatar(hero, this.props);
        // this._dynamicAnimation.humanoidAnimation();

    }
    componentDidUpdate() {
        // this.context = this.canvas.getContext("2d");
        this._animate = this.props.animations;

        // this._dynamicAnimation.updateUserAvatar(this.context, this.canvas, this.imgHero, this.props);
    }

    /**
     * Отрисовка канваса на запущенном устройстве
     * @param context
     * @param canvas
     * @param img картинка локации
     * @param imgHero картинка героя
     * @param dynamicAnimation метод изменения state через redux
     */
    drawCanvas(context: CanvasRenderingContext2D, canvas: object, img: object, imgHero: object, dynamicAnimation: DinamicAnimation) {
        dynamicAnimation.updateMap(this.context, this.canvas, this.imgBacground, this.props);
        dynamicAnimation.humanoidAnimation();
        dynamicAnimation.updateUserAvatar(this.context, this.canvas, this.imgHero, this.props);
    }

    /**
     * Обновления Canvas в зависимости от разрешения экрана (работает при первичной инициализации)
     * @param canvas
     */
    resize(canvas: object) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    render() {
        return (
            <canvas id="canvas" />
        );
    }
}





