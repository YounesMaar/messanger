import { FC } from "react";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "../layout/MobileFooter";
import getCurrentUser from "@/action/getCurrentUser";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: FC<SidebarProps> = async ({ children }) => {
  const currentUser = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={currentUser!} />
      <main className="lg:pl-20 h-full">{children}</main>
      <MobileFooter />
    </div>
  );
};

export default Sidebar;
