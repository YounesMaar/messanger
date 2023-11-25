import getUsers from "@/action/getUsers";
import UserList from "@/components/Lists/UserList";
import Sidebar from "@/components/bars/Sidebar";
import React from "react";

const UsersLayout = async ({ children }: { children: React.ReactNode }) => {
  const users = await getUsers();
  return (
    <>
      <Sidebar>
        <div className="h-full">
          <UserList items={users} />
          {children}
        </div>
      </Sidebar>
    </>
  );
};

export default UsersLayout;
