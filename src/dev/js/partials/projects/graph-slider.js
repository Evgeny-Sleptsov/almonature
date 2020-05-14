import Swiper from 'swiper';

export default () => {
    let slidersGraph = document.querySelectorAll('.graph-slider-block');
    Array.from(slidersGraph).forEach(item => {
        new Swiper(item.querySelector('.swiper-container'), {
            slidesPerView: 1,
            pagination: {
                el: item.querySelector('.slider-pagination')
            },
            navigation: {
                nextEl: item.querySelector('.almo-btn--slider-next'),
                prevEl: item.querySelector('.almo-btn--slider-prev')
            },
        });
});

};