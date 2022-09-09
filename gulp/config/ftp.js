// Data provides by ./data.js
import { data } from "./data.js";

export let configFTP = {
  host: `${data.host}`, // Адрес FTP сервера
  user: `${data.user}`, // Имя пользователя
  password: `${data.password}`, // Пароль
  parallel: 5, // Кол-во одновременных потоков
};
