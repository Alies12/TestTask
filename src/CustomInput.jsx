export const CustomInput = ({
  //создаём кастомный инпут
  label,
  value,
  errorMsg,
  onChangeCallback,
  inputProps: otherProps,
  customHeight = 68,
  isTextArea = false,
}) => {
  const inputClasses = `border-2 pl-[18px] pb-[16px] pt-[31px] ${
    //прописываем стили инпута и его ошибок
    errorMsg ? " border-[#ff0000]" : "border-[#EEEEF0]"
  } rounded-[6px] w-full h-full focus:bg-[#EEEEF0] focus:border-l-4 focus:border-l-[#016FDD] ${
    isTextArea ? "text-[16px]" : "text-[18px]"
  } font-[400]`;
  return (
    <div
      style={{ height: customHeight }}
      className={`relative${errorMsg ? " mb-4" : ""}`}
    >
      <label className="absolute left-[21px] top-[10px] select-none text-[#7F7F7F]">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={onChangeCallback}
          {...otherProps}
          className={inputClasses + " resize-none "}
        />
      ) : (
        <input
          {...otherProps}
          value={value}
          onChange={onChangeCallback}
          className={inputClasses}
        />
      )}
      {errorMsg && (
        <span className="absolute text-[#ff0000] -bottom-5 left-[21px] w-full text-sm">
          {errorMsg}
        </span>
      )}
    </div>
  );
};
