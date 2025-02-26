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
                    <SwiperCard imageUrl='/slider-1.jpg' date='2025-02-27T17:00:00.000Z' title='MIRR' link='/events/123123'/>
                </SwiperSlide>
                <SwiperSlide style={{ width: '200px' }}>
                    <SwiperCard imageUrl='/slider-2.jpg' date='2025-03-14T17:00:00.000Z' title='POLYCAT' link='/events/123123'/>
                </SwiperSlide>
                <SwiperSlide style={{ width: '200px' }}>
                    <SwiperCard imageUrl='/slider-3.jpg' date='2025-04-22T17:00:00.000Z' title='CERTIFIED_V10' link='/events/123123'/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default EventSlider;