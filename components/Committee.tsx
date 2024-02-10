"use client";
import React, { useEffect } from "react";
import { Commitee } from "@/types/comitee";
import { Avatar, Chip, Input } from "@nextui-org/react";
import { Member } from "@/types/member";
import { Listbox, ListboxItem } from "@nextui-org/react";

const Committee = ({
  data,
  members,
}: {
  data: Commitee;
  members: Member[];
}) => {
  const [name, setName] = React.useState<string>(data.committeeName);
  const [membersWhoAreNotInCommittee, setMembersWhoAreNotInCommittee] =
    React.useState<Member[]>(
      members!.filter((member) => !data.members!.includes(member.id))
    );
  const [membersWhoAreInCommittee, setMembersWhoAreInCommittee] =
    React.useState<Member[]>(data.expand?.members || []);
  useEffect(() => {
    console.log(membersWhoAreNotInCommittee, data.expand?.members);
  }, []);

  const moveUp = (item: Member) => {
    const temp = [...membersWhoAreInCommittee];
    const idx = temp.indexOf(item);
    // if (idx === 0) return;
    temp.splice(idx, 1);
    temp.splice(idx - 1, 0, item);
    setMembersWhoAreInCommittee(temp);
  };
  const moveDown = (item: Member) => {
    const temp = [...membersWhoAreInCommittee];
    const idx = temp.indexOf(item);
    // if (idx === temp.length - 1) return;
    temp.splice(idx, 1);
    temp.splice(idx + 1, 0, item);
    setMembersWhoAreInCommittee(temp);
  };
  const onDelete = (item: Member) => {
    const temp = [...membersWhoAreInCommittee];
    const idx = temp.indexOf(item);
    temp.splice(idx, 1);
    setMembersWhoAreInCommittee(temp);
    setMembersWhoAreNotInCommittee([...membersWhoAreNotInCommittee, item]);
  };
  const onAdd = (item: Member) => {
    const temp = [...membersWhoAreNotInCommittee];
    const idx = temp.indexOf(item);
    temp.splice(idx, 1);
    setMembersWhoAreNotInCommittee(temp);
    setMembersWhoAreInCommittee([...membersWhoAreInCommittee, item]);
  };
  return (
    <div className="flex flex-col items-center py-12 gap-4 sm:w-1/3 w-11/12">
      <h1 className="text-4xl font-bold text-center">{data.committeeName}</h1>
      <Input
        type="text"
        value={name}
        onValueChange={setName}
        label="Komite İsmi"
      />
      <div className="flex sm:flex-row flex-col gap-4 w-full">
        <div className="w-full border-small px-2 py-2 rounded-small border-default-100">
          <Chip color="primary" className="w-full">
            Komiteye Eklenmemiş Üyeler
          </Chip>
          <Listbox aria-label="Actions" items={membersWhoAreInCommittee}>
            {(item) => (
              <ListboxItem
                key={item.id}
                // color="danger"
                endContent={
                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-md hover:bg-rose-800"
                      onClick={() => {
                        onDelete(item);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash-fill "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                      </svg>
                    </button>
                    <div>
                      <div className="flex flex-col gap-2">
                        <button
                          className="hover:bg-zinc-800 p-1 rounded-md  disabled:cursor-not-allowed"
                          onClick={() => {
                            moveUp(item);
                          }}
                          // disabled={disabled}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="white"
                            className="bi bi-chevron-up"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                            />
                          </svg>
                        </button>
                        <button
                          className=" hover:bg-zinc-800 p-1 rounded-md  disabled:cursor-not-allowed"
                          onClick={() => {
                            moveDown(item);
                          }}
                          // disabled={disabled}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="white"
                            className="bi bi-chevron-down"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="w-full flex flex-row gap-2 items-center ">
                  <Avatar
                    alt={item.id}
                    className="flex-shrink-0"
                    size="sm"
                    src={`https://gazi-yapay-zeka.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.picture}?token=`}
                  />
                  <p>{item.name}</p>
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </div>
        <div className="w-full border-small px-2 py-2 rounded-small border-default-100">
          <Chip color="primary" className="w-full">
            Komiteye Eklenmemiş Üyeler
          </Chip>
          <Listbox aria-label="Actions" items={membersWhoAreNotInCommittee}>
            {(item) => (
              <ListboxItem key={item.id} onClick={() => {
                onAdd(item)
              }}>
                <div className="w-full flex flex-row gap-2 items-center ">
                  <Avatar
                    alt={item.id}
                    className="flex-shrink-0"
                    size="sm"
                    src={`https://gazi-yapay-zeka.pockethost.io/api/files/${item.collectionId}/${item.id}/${item.picture}?token=`}
                  />
                  <p>{item.name}</p>
                </div>
              </ListboxItem>
            )}
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default Committee;
