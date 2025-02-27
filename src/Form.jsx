import { CustomInput } from "./CustomInput.jsx";
import { useState } from "react";
import { formatPhoneNumber, sendForm } from "./validations.js";

export const Form = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState({});

  const handleChangeUser = (e) => {
    //проверяем по айдишнику и подставляем значения
    switch (e.target.id) {
      case "name":
        setName(e.target.value);
        break;
      case "phone":
        setPhoneNumber(formatPhoneNumber(e.target.value));
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "text":
        setUserMessage(e.target.value);
        break;
      default:
        break;
    }
  };
  const sendFormBackend = (e) => {
    //отлавливаем ошибку
    e.preventDefault();
    try {
      sendForm({ name, phoneNumber, email, userMessage });
      setPhoneNumber("");
      setName("");
      setEmail("");
      setError({});
    } catch (e) {
      setError(JSON.parse(e.message));
    }
  };
  return (
    <div className="flex flex-col h-screen py-[68px] px-[103px]">
      <div>
        <h1 className="flex w-[325px] h-[92px] top-[68.33px] left-[105px] font-mazzard font-semibold text-[46px] leading-[46px] tracking-normal text-[#1A1A1A]">
          Получить консультацию
        </h1>
        <p className="flex w-[340.223px] h-[44px] top-[169.33px] left-[105px] font-mazzard font-normal text-[18px] leading-[22px] tracking-normal text-[#1A1A1A]">
          Заполните форму и мы свяжемся с вами в ближайшее время
        </p>
      </div>
      <form className="pt-[34px] flex flex-col gap-[10px] max-w-[400px]">
        <CustomInput
          inputProps={{
            id: "name", //  Для автоподставления данных в браузере
            required: true,
          }}
          value={name}
          label="Имя"
          errorMsg={error?.name} //ошибка
          onChangeCallback={handleChangeUser}
        />
        <CustomInput
          inputProps={{ maxLength: 18, id: "phone" }}
          value={phoneNumber}
          label="Телефон"
          errorMsg={error?.phoneNumber}
          onChangeCallback={handleChangeUser}
        />
        <CustomInput
          inputProps={{
            id: "email",
            required: true,
          }}
          value={email}
          label="Email"
          errorMsg={error?.email}
          onChangeCallback={handleChangeUser}
        />
        <CustomInput
          inputProps={{
            id: "text",
            required: true,
          }}
          value={userMessage}
          label="Текст сообщения"
          errorMsg={error?.userMessage}
          onChangeCallback={handleChangeUser}
          customHeight={140}
          isTextArea
        />
        <button
          className="rounded-[24px] border border-transparent px-[1.2em] py-[0.6em] text-base font-[500px] font-sans cursor-pointer transition-[border-color] duration-250 w-[163px] h-[50px] bg-[#0071E3] text-[#FFFFFF] font-[bold] text-[18px] rounded-[6px] hover:bg-[#005BB5]"
          onClick={sendFormBackend}
        >
          Отправить
        </button>
        <h2 className="font-mazzard font-normal text-xs leading-4 tracking-normal decoration-solid [text-decoration-thickness:auto] [text-decoration-offset:auto] text-[#ABABAB]">
          Нажимая «Продолжить», вы{" "}
          <span className="underline">
            принимаете пользовательское соглашение
          </span>{" "}
          и <span className="underline">политику конфиденциальности</span>
        </h2>
      </form>
      <button class="absolute top-3 right-3 bg-[#F8F9FB3D] bg-opacity-24 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-600 transition duration-300">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
