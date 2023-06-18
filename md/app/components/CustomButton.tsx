import AddIcon from "./icons/AddIcon";

const CustomButton = ({ fillColor, borderColor, backgroundColor, textColor, text }:any) => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-[140px] gap-2.5 px-4 py-2 rounded-full bg-${backgroundColor} border-2 border-${borderColor}`}
    >
      <div className="relative flex items-center self-stretch justify-between flex-grow-0 flex-shrink-0">
        <AddIcon fillColor={fillColor} />
        <div className="relative flex items-center justify-center flex-grow-0 flex-shrink-0 gap-1">
          <p className={`flex-grow-0 flex-shrink-0 text-sm font-semibold text-left uppercase text-${textColor}`}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomButton;
