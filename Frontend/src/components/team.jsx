import React from "react";
import foto from "../assets/member-black.png";

const Team = () => {
  return (
    <div className="bg-primary py-16">
      {/* Title */}
      <h1 className="font-poppins text-center text-[55px] justify-center pt-16">
        <span className="text-gradient font-bold text-[55px]">MEET THE TEAM</span><br></br>
      </h1>
      {/* <h2 className="font-poppins text-center text-[20px] justify-center -mt-12 mb-12">
        <span className="text-white text-[20px] font-semibold">Universitas Indonesia</span>
      </h2> */}

      {/* Team Section */}
      <div className="max-w-5xl mx-auto -mt-12">
        <div className="relative">
          {/* Image */}
          <img
            src={foto}
            alt="Team Members"
            className="w-full rounded-lg ml-4 shadow-lg"
          />

          {/* Info Section */}
          <div className="grid grid-cols-3 gap-4 mt-8 text-center">
            {/* Member 1 */}
            <div>
              <h2 className="text-xl font-semibold text-white">
                Annisa Ardelia Setiawan
              </h2>
              <p className="text-gray-600">Teknik Komputer</p>
            </div>

            {/* Member 2 */}
            <div>
              <h2 className="text-xl font-semibold text-white">
                Mario Matthews Gunawan
              </h2>
              <p className="text-gray-600">Teknik Komputer</p>
            </div>

            {/* Member 3 */}
            <div>
              <h2 className="text-xl font-semibold text-white">
                Rizqi Zaidan
              </h2>
              <p className="text-gray-600">Teknik Komputer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
