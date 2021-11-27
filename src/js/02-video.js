const iFrameEl = document.querySelector('#vimeo-player');
import throttle from 'lodash.throttle';

// Инициализация плеера
const player = new Vimeo.Player(iFrameEl);

// Сохранение времени воспроизведения в локальное хранилище
const onTimeUpdate = date => {
    localStorage.setItem('videoplayer-current-time', date.seconds);
    console.log(parseInt(localStorage.getItem('videoplayer-current-time')));
};

// Обновление времени воспроизведения
player.on('timeupdate', throttle(onTimeUpdate, 1000));

// Возобновление воспроизведения с сохраненной позиции
player.setCurrentTime(localStorage.getItem('videoplayer-current-time'))
    .then(function (seconds) { })
    .catch(function (error) {
    switch (error.name) {
        case 'RangeError':
            break;
        default:
            break;
    }
});


// if (localStorage.getItem("videoplayer-current-time") !== null) {
//     player.setCurrentTime(localStorage.getItem("videoplayer-current-time"));
// };

