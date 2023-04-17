import { createContext, ReactNode, useContext, useState } from "react";

interface MessageContextProps {
  message: string;
  updateMessage: (msg: string) => void;
}

export const MessageContext = createContext<MessageContextProps>({
  message: "",
  updateMessage: () => {},
});

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");

  const updateMessage = (msg: string) => {
    setMessage(msg);
  };

  return (
    <MessageContext.Provider value={{ message, updateMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
