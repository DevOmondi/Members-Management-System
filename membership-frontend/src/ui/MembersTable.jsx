import { React, useState, useEffect } from "react";
import axios from "axios";
import config from "../config";

import { Add } from "@carbon/icons-react";
import { Button } from "carbon-components-react";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

const MembersTable = ({ setIsMemberModalOpen }) => {
  const token = sessionStorage.getItem("token");
  const [membersRows, setMembersRows] = useState([]);

  // TODO: Func to fetch members
  const getMembers = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 && response.data) {
        setMembersRows(response.data);
        console.log("Members:", response.data);
      }
      
      if (response.status === 401 && response.data) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log("Error fetching members:", error);
    }
  };

  // Define table headers
  const headers = [
    {
      key: "firstName",
      header: "First Name",
    },
    {
      key: "middleName",
      header: "Middle Name",
    },
    {
      key: "lastName",
      header: "Last Name",
    },
    {
      key: "dateOfBirth",
      header: "Date of Birth",
    },
    {
      key: "idNumber",
      header: "ID Number",
    },
  ];

  useEffect(() => {
    getMembers();
  }, []);
  return (
    <div className="ml-[5%]  lg:ml-[18rem] my-[2rem] w-[90%] mx-auto lg:w-[80%]">
      <div className="mb-[1rem]">
        <Button
          renderIcon={Add}
          size="md"
          iconDescription="Add User"
          style={{ backgroundColor: "#8ec53e" }}
          onClick={() => setIsMemberModalOpen(true)}
        >
          Add Member
        </Button>
      </div>
      <DataTable rows={membersRows} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </DataTable>
    </div>
  );
};

export default MembersTable;
