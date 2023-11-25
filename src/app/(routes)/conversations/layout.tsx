import getConversations from "@/action/getCoversations";
import Sidebar from "@/components/bars/Sidebar";
import { FC } from "react";
import ConversationList from "./components/ConversationList";
import getUsers from "@/action/getUsers";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = async ({ children }) => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList users={users} initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
};

export default layout;
