import React from "react";

const DetailForm = ({ title, description, icon }) => {
    return (
        <div className="relative flex flex-col justify-center">
            <div className="flex justify-start items-center">
                <div className="relative mr-2 mb-2">
                    <img className="w-[45px] h-[45px]" alt="별" src="./images/star.png" />
                    <img className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-[2px] w-[21px] h-[21px]" alt="아이콘" src={icon} />
                </div>
                <div className="text-[5vh]">{title}</div>
            </div>
            <div className="grid grid-rows-8 p-4 w-[80vw] md:w-[70vh] lg:w-[90vh] h-[60vh] md:h-[70vh] bg-secondary rounded-[20px]">
                <div className="row-span-6 rounded-[20px] bg-tertiary"></div>
                <div className="row-span-2 text-[2.9vh] md:text-[3.5vh] pt-[1vh] h-full">{description}</div>
            </div>
        </div>
    );
};

export default DetailForm;

