import style from "../style";
import map from "../assets/map-putih.png";
import Navbar from "../components/Navbar";
import Hero from "../components/hero";
import MapPreview from "../components/mapPreview";
import StatistikPreview from "../components/statistikPreview";
import Team from "../components/team";
import Footer from "../components/footer";
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

    const ref4 = useRef();
    const isVisible4 = useIsVisible(ref3);

    let colors = ["#35D5E7"];
    let i = 0;

    document.onmousemove = function(e) {
        i++;
        let x = e.pageX;
        let y = e.pageY;

        let span = document.createElement("span");
        span.classList.add("follower");
        span.style.left = x + "px";
        span.style.top = y + "px";
        span.style.backgroundColor = colors[i - 1];
        document.body.appendChild(span);

        if (i == colors.length) {
            i = 0;
        }
        setTimeout(() => {
            span.remove();
        }, 500);
    };

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

                <div className={`bg-primary ${style.paddingX} ${style.flexCenter}`}>
                    <div ref={ref3} className={`${style.boxWidth} transition-opacity ease-in duration-700 ${isVisible3 ? "opacity-100" : "opacity-0"}`}>
                        <Team />
                        <Footer />
                    </div>
                </div>

            </div>
        );
    };

    export default MainPage;