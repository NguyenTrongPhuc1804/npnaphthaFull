import React from "react";

export default function CardTeamMember() {
  return (
    <div className="w-full flex justify-center">
      <div className="team-thumb ">
        <img
          src="https://geniuscript.com/serity/assets/images/resources/team4.jpg"
          className="img-fluid team-image h-[300px] lg:h-[400px] w-[300px] sm:w-full  object-cover  "
          alt
        />
        <div className="team-info">
          <h4 className="mt-3 mb-0 text-2xl">Sophia</h4>
          <p>CEO &amp; Founder</p>
        </div>
      </div>
    </div>
  );
}
