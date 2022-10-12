import { Dictionary } from "./block";

type WebSocketParams = {
  userId: number;
  chatId: number;
  token: string;
};

const API_URL = "wss://ya-praktikum.tech/ws/";

export function createChatWebSocket(
  params: WebSocketParams,
  onMessageFunc?: (data: Dictionary) => void
) {
  const { userId, chatId, token } = params;
  const socket = new WebSocket(`${API_URL}chats/${userId}/${chatId}/${token}`);
  let timerId: ReturnType<typeof setTimeout> = setTimeout(() => {});

  socket.addEventListener("open", () => {
    console.log("Соединение по WebSocket установлено");

    function keepAlive(timeout = 20000) {
      if (socket.readyState == socket.OPEN) {
        socket.send('');
      }
      timerId = setTimeout(keepAlive, timeout);
    }

    keepAlive()
  });

  socket.addEventListener("close", (event) => {
    const { wasClean, code } = event;
    let { reason } = event;

    console.log(
      wasClean
        ? "Соединение по WebSocket закрыто"
        : "Соединение по WebSocket прервано"
    );

    if (code === 1006) {
      reason = "Соединение закрыто из-за отсутствия активности в WebSocket";
    }

    console.log(`Код: ${code} | Причина: ${reason}`);

    function cancelKeepAlive() {
      if (timerId) {
        clearTimeout(timerId);
      }
    }

    cancelKeepAlive()
  });

  socket.addEventListener("message", (event) => {
    const { data } = event;

    if (onMessageFunc && data) {
      onMessageFunc(JSON.parse(data));
    }
  });

  socket.addEventListener("error", (event: any) => {
    console.log("Ошибка", event.message);
  });

  return socket;
}
