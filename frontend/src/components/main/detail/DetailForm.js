const DetailForm = ({ title, description, icon }) => {
    return (
        <div className="relative flex flex-col items-center justify-center">
            <div className="relative -left-[240px] top-4 mb-4">
                <img className="absolute -top-4 left-5 w-[45px] h-[45px]" alt="별" src="./images/star.png" />
                <img className="absolute left-[32px] w-[21px] h-[21px]" alt="아이콘" src={icon} />
                <div className="relative -top-1 left-[25px] w-[200px] text-3xl">{title}</div>
            </div>
            <div className="relative w-[650px] h-[455px] bg-secondary rounded-[20px]">
                <div className="relative top-5 left-[20px] w-[610px] h-[350px] rounded-[20px] bg-tertiay"></div>
                <div className="relative top-3 p-[20px] text-small-size">{description}</div>
            </div>
        </div>
    );
};

export default DetailForm;

