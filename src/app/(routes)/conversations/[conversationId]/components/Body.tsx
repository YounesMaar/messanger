"use client";
import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import { FC, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  const messageHandler = (message: FullMessageType) => {
    axios.post(`/api/conversations/${conversationId}/seen`);
    // we're just making sure we're not making deplucating this message
    setMessages((current) => {
      if (find(current, { id: message.id })) {
        return current;
      }
      return [...current, message];
    });
    bottomRef?.current?.scrollIntoView();
  };

  const updateMessageHandler = (newMessage: FullMessageType) => {
    setMessages((current) =>
      current.map((currentMessage) => {
        if (currentMessage.id === newMessage.id) {
          return newMessage;
        }
        return currentMessage;
      })
    );
  };
  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    // only when you you see this element;
    bottomRef?.current?.scrollIntoView();

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, []);
  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div ref={bottomRef} className="pt-24" />
    </div>
  );
};

export default Body;
