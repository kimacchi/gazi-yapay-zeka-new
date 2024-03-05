"use client";
import { useRouter } from "next/navigation";
import React from "react";

const AdminUser = ({
  admin,
  activeMember,
  name,
  username,
  sendData,
  boardMember
}: {
  admin: boolean;
  activeMember: boolean;
  name: string,
  username: string,
  boardMember: boolean,
  sendData: (formData: FormData) => Promise<void>;
}) => {
    const router = useRouter()
    const [admin_, setAdmin_] = React.useState(admin)
    const [activeMember_, setActiveMember_] = React.useState(activeMember)
    const [boardMember_, setBoardMember_] = React.useState(boardMember)

  return (
    <div className="sm:w-1/3 w-11/12 flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold">Üye Bilgileri</h1>
      <h2 className="w-full">
        <span className="font-bold">İsim:</span> {name}
      </h2>
      {/* <h2 className='w-full'><span className='font-bold'>E-posta:</span> {res.data.email}</h2> */}
      <h2 className="w-full">
        <span className="font-bold">Kullanıcı adı:</span> {username}
      </h2>
      <form
        action={async (formdata: FormData) => {
            await sendData(formdata)
            router.push('/dashboard/users')
        }}
        className="flex flex-col items-start w-full gap-4"
      >
        <div className="flex w-2/3 justify-between">
          <label htmlFor="admin" className="w-full">
            Admin:
          </label>
          <input
            type="checkbox"
            name="admin"
            className="w-full"
            checked={admin_}
            onChange={(e) => setAdmin_(e.target.checked)}
          />
        </div>
        <div className="flex w-2/3 justify-between">
          <label htmlFor="admin" className="w-full">
            Aktif üye:
          </label>
          <input
            type="checkbox"
            name="activeMember"
            className="w-full"
            checked={activeMember_}
            onChange={(e) => setActiveMember_(e.target.checked)}
          />
        </div>
        <div className="flex w-2/3 justify-between">
          <label htmlFor="admin" className="w-full">
            İdari Kurul Üyesi:
          </label>
          <input
            type="checkbox"
            name="boardMember"
            className="w-full"
            checked={boardMember_}
            onChange={(e) => setBoardMember_(e.target.checked)}
          />
        </div>
        <button type="submit" className="border border-white p-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminUser;
