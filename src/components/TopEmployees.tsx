import Image from "next/image";
import { useEffect, useState } from "react";

function TopEmployees() {
  const [users, setUsers] = useState([]); // ✓

  useEffect(() => {
    fetch(`/api/topEmployees`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  return (
    <div className="flex flex-col flex-wrap items-center gap-y-8">
      <div className="flex justify-center font-bold text-2xl py-4">
        Top Employees
      </div>

      <div className="flex flex-wrap gap-10">
        {users
          ?.sort((a, b) => {
            const aCount = a?.AssignedOn.length;
            const bCount = b?.AssignedOn.length;
            return bCount - aCount;
          })
          .map((user, index) => {
            return (
              <div
                key={index}
                className="flex flex-col container shadow hover:shadow-lg hover:shadow-blue-100 border 
        border-gray-200 hover:border-cyan-600 gap-4 p-10 rounded-lg w-96"
              >
                <div className="flex flex-col gap-2 justify-center items-center">
                  <div className="h-20 w-20 relative rounded-full overflow-hidden ">
                    <Image src={user.image} alt={user.name} fill />
                  </div>
                  <div className="text-lg text-center font-bold">
                    {user.name}
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center text-center gap-2">
                  <div className="text-lg">{user.bio}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default TopEmployees;
