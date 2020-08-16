export const globalVariables = {
        server: false,
        serverPath: 'http://localhost',
        serverFolderPath: '',
        // serverPath: 'http://image-life.ru',
        // serverFolderPath: '/home/nortren',
        camera: {
            cameraControl: false
        },
        shadow: {materialShadow: false},
        models: {sprite: false},
        enableEditor: true, //включает отображение редактора
        disableAuthorization: false, //выключает меню авторизации (удобно при разработке редактора отключать, что б каждый раз не авторизовываться)
        showMapGrid: false,
        collider: {
            shadow: false,
            showShadow: false,
            showCollider: true,//Показать коллайдеры объектов на сцене
            showColliderDynamick: false,//Показать коллайдеры динамических объектов на сцене(игрока , ботов)
            additionalData: false, //отображения супортных дынных(область видимости , область преследования и т.д)

        },
    }
;
