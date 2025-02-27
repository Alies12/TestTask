export const formatPhoneNumber = (value) => {
  const numbers = value.replace(/\D/g, ""); // Удаляем все нечисловые символы в форме

  const phoneNumber = numbers.slice(0, 11); // Обрезаем и берем только первые 11 цифр

  let formattedPhone = ""; // Форматируем номер телефона
  if (phoneNumber.length > 0) {
    formattedPhone = "+7";
  }
  if (phoneNumber.length > 1) {
    formattedPhone += ` (${phoneNumber.slice(1, 4)}`;
  }
  if (phoneNumber.length > 4) {
    formattedPhone += `) ${phoneNumber.slice(4, 7)}`;
  }
  if (phoneNumber.length > 7) {
    formattedPhone += `-${phoneNumber.slice(7, 9)}`;
  }
  if (phoneNumber.length > 9) {
    formattedPhone += `-${phoneNumber.slice(9, 11)}`;
  }

  return formattedPhone;
};

const sanitizeInput = (value) => {
  if (!value) return "";
  return value
    .replace(
      /[<>&"']/g,
      (match) =>
        ({
          "<": "&lt;",
          ">": "&gt;",
          "&": "&amp;",
          '"': "&quot;",
          "'": "&#x27;",
        }[match])
    ) // Удаляем потенциально опасные символы и скрипты
    .replace(/script/gi, ""); // Делаем дополнительную защиту от script тегов
};

const validateEmail = (email) => {
  const regular = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Валидация регулярным выражением
  return regular.test(email);
};
export const sendForm = ({ name, phoneNumber, email, userMessage }) => {
  // Санитизируем все входные данные
  const sanitizedName = sanitizeInput(name);
  const sanitizedEmail = sanitizeInput(email);
  const sanitizedUserMessage = sanitizeInput(userMessage);
  const phoneNumberCleared = phoneNumber.replace(/\D/g, "");

  const errorMessage = {};

  // Валидация очищенных данных
  if (phoneNumberCleared.length !== 11 && phoneNumberCleared.length !== 0) {
    errorMessage.phoneNumber = "Введите правильный номер";
  }

  if (!sanitizedName.trim()) {
    errorMessage.name = "Введите ваше имя";
  }

  if (!sanitizedEmail || !validateEmail(sanitizedEmail)) {
    errorMessage.email = "Введите корректный email";
  }
  if (!sanitizedUserMessage.trim()) {
    errorMessage.userMessage = "Введите ваше сообщение";
  }

  if (Object.keys(errorMessage).length > 0) {
    console.log(errorMessage);
    throw new Error(JSON.stringify(errorMessage));
  } else {
    // Используем проверенные данные в выводе
    alert(
      `Данные отправленые формой:\nИмя: ${sanitizedName}\nПочта: ${sanitizedEmail}\nНомер телефона: ${phoneNumberCleared}\nСообщение пользователя: ${sanitizedUserMessage}`
    );
  }
};
