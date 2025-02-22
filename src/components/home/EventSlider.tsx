'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCard from './SwiperCard';

function EventSlider() {
    return (
        <div className="w-full overflow-x-hidden">
            <Swiper
                slidesPerView="auto"
                spaceBetween={20}
                keyboard={true}
                grabCursor={true}
                slideToClickedSlide={true}
                style={{
                    width: '100vw',
                    marginLeft: '20px'
                }}
            >
                <SwiperSlide style={{ width: '200px' }}>
                    <SwiperCard imageUrl='/slider-1.jpg' date='11 Feb 2025' title='MIRR'/>
                </SwiperSlide>
                <SwiperSlide style={{ width: '200px' }}>
                    <SwiperCard imageUrl='/slider-2.jpg' date='03 Mar 2025' title='POLYCAT'/>
                </SwiperSlide>
                <SwiperSlide style={{ width: '200px' }}>
                    <SwiperCard imageUrl='/slider-3.jpg' date='16 Mar 2025' title='CERTIFIED_V10'/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default EventSlider;