import style from "../style";
import map from "../assets/map-putih.png";
import Navbar from "../components/navbar";
import Hero from "../components/hero";
import MapPreview from "../components/mapPreview";
import StatistikPreview from "../components/statistikPreview";
import { useEffect, useState, useRef } from "react";

export function useIsVisible(ref) {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.isIntersecting);
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
            observer.disconnect();
        };
    }, [ref]);

    return isIntersecting;
}

const MainPage = () => {
    const ref1 = useRef();
    const isVisible1 = useIsVisible(ref1);

    const ref2 = useRef();
    const isVisible2 = useIsVisible(ref2);

    const ref3 = useRef();
    const isVisible3 = useIsVisible(ref3);

        return (
            <div className="bg-primary w-full relative pt-9">
                <Navbar />

                <div className={`bg-primary ${style.flexStart}` }>
                    <div ref={ref1} className={`${style.boxWidth}`}>
                        <Hero />
                    </div>
                </div>

                <div className={`bg-primary ${style.paddingX} ${style.flexCenter}`}>
                    <div ref={ref2} className={`${style.boxWidth} transition-opacity ease-in duration-700 ${isVisible2 ? "opacity-100" : "opacity-0"}`}>
                        <MapPreview />
                    </div>
                </div>

                <div className={`bg-primary ${style.paddingX} ${style.flexCenter}`}>
                    <div ref={ref3} className={`${style.boxWidth} transition-opacity ease-in duration-700 ${isVisible3 ? "opacity-100" : "opacity-0"}`}>
                        <StatistikPreview />
                    </div>
                </div>
            </div>
        );
    };

    export default MainPage;