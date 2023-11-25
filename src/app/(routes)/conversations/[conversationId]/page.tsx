import getConversationById from "@/action/getConversationById";
import getMessages from "@/action/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/layout/Header";
import { FC } from "react";
import Body from "./components/Body";
import Form from "./Form";

interface ConversationIdProps {
  params: { conversationId: string };
}

const ConversationId: FC<ConversationIdProps> = async ({ params }) => {
  // getting the conversation and their messages
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
