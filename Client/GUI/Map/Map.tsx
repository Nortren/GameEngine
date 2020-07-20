import * as React from 'react';

interface IMap {
    mobile?: boolean
}

/**
 * Компонент инициализации карты игрового интерфейса
 * @param props
 * @constructor
 */
export default function Map(props: IMap) {
    const [messageStore, setMessageStore] = React.useState([]);
    return <MapArea mobile={props.mobile} source={messageStore}/>
}
/**
 * Компонент контейнер карты
 * @param props
 * @constructor
 */
function MapArea(props) {
    return <div className="map-container">
        {props.mobile ? <div className="map-containerMobile__map">
        </div> : <div className="map-container__map"> </div>}
    </div>
}
