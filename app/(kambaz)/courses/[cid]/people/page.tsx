"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as coursesClient from "../../client";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const users = await coursesClient.findUsersForCourse(cid as string);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
