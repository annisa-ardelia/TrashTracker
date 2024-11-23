import style from "../style";
import Navbar from "../components/Navbar";
import BarChart from "../components/barChart";
import PieChart from "../components/pieChart";
import Footer from "../components/footer";

const DataPage = () => {
    return (
        <div className="bg-primary w-full relative pt-9">
            <Navbar />

            <div className={`bg-primary${style.flexStart} w-full h-screen flex flex-row justify-center items-center gap-24`}>
                <div className={`${style.boxWidth}`}>
                    <BarChart />
                </div>
            </div>

            <div className={`bg-primary${style.flexStart} w-full h-screen flex flex-row justify-center items-center gap-24`}>
                <div className={`${style.boxWidth}`}>
                    <PieChart />
                </div>
            </div>

            <div className={`bg-primary ${style.paddingX} ${style.flexCenter} flex-col md:absolute md:bottom-0 w-screen`}>
                <div className={`${style.boxWidth}`}>
                    <Footer />
                </div>
            </div>
        </div>
    )
};

export default DataPage;