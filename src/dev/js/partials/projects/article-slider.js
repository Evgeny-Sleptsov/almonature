import Swiper from 'swiper';
    export default () => {
        let sliders = document.querySelectorAll('.animal-slider-block');
        Array.from(sliders).forEach(item => {
        new Swiper(item.querySelector('.swiper-container'), {
            slidesPerView: 2,
            spaceBetween: 38,
            slidesPerGroup : 2,
            pagination: {
                el: item.querySelector('.slider-pagination')
            },
            navigation: {
                nextEl: item.querySelector('.almo-btn--slider-next'),
                prevEl: item.querySelector('.almo-btn--slider-prev')
            },
            breakpoints: {
                680: {
                    slidesPerView: 1,
                    slidesPerGroup : 1
                }
            }
        });
    });
    };
