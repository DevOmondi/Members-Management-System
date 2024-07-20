import { React, useState } from "react";

import MembersTable from "../ui/MembersTable";
import Sidebar from "../ui/Sidebar";
import DashboardNav from "../ui/DashboardNav";
import AddMemberModal from "../ui/AddMemberModal";

const Dashboard = () => {
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  return (
    <>
      <DashboardNav />
      <MembersTable setIsMemberModalOpen={setIsMemberModalOpen} />
      <Sidebar />
      <AddMemberModal
        isMemberModalOpen={isMemberModalOpen}
        setIsMemberModalOpen={setIsMemberModalOpen}
      />
    </>
  );
};

export default Dashboard;
