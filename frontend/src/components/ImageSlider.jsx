import { useState, useRef } from "react";

function ImageSlider() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = (offsetX / rect.width) * 100;
        if (percentage >= 0 && percentage <= 100) setSliderPosition(percentage);
    };

    const handleTouchMove = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const percentage = (touchX / rect.width) * 100;
        if (percentage >= 0 && percentage <= 100) setSliderPosition(percentage);
    };

  return (
    <div ref={containerRef} onMouseMove={(e) => e.buttons === 1 && handleMouseMove(e)} onTouchMove={handleTouchMove} className="slide-in-right-slow relative w-full max-w-2xl h-96 overflow-hidden rounded-2xl shadow-lg select-none">
        {/* After image (base layer) */}
        <img src="/image_slider/after.jpeg" alt="After" className="absolute top-0 left-0 w-full h-full object-cover" />

        {/* Before image (overlay, revealed as slider moves right) */}
        <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
            <img src="/image_slider/before.jpg" alt="Before" className="w-full h-full object-cover" />
        </div>

        <div className="absolute top-0 h-full w-1.5 bg-white z-10 -translate-x-1/2" style={{ left: `${sliderPosition}%` }}></div>

        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20" style={{ left: `${sliderPosition}%` }}>
            <div className="w-10 h-10 bg-red-800 flex items-center justify-center rounded-full border-2 border-white cursor-ew-resize shadow-md">
                <span className="text-white text-sm select-none">&#x276E;&nbsp;&#x276F;</span>
            </div>
        </div>
    </div>
  );
}

export default ImageSlider;
