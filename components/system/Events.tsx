"use client";

import {
  Pagination,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";

const events = [
  {
    id: "1",
    name: "Etkinlik 1",
    description: "Etkinlik 1 açıklaması",
    maxParticipant: 100,
    isOnline: true,
    location: "Online",
    eventTime: new Date(2021, 10, 10, 10, 10, 10, 10),
    participants: ["sdfsf", "asdfasdfasdf"],
    exclusiveForActiveMembers: false,
    releaseTime: new Date(2021, 10, 10, 10, 10, 10, 10),
    closeTime: new Date(2025, 10, 10, 10, 10, 10, 10),
  },
  {
    id: "2",
    name: "Etkinlik 2",
    description: "Etkinlik 2 açıklaması",
    maxParticipant: 50,
    isOnline: false,
    location: "Ankara",
    eventTime: new Date(2022, 5, 15, 14, 30, 0, 0),
    participants: ["john.doe", "jane.doe"],
    exclusiveForActiveMembers: true,
    releaseTime: new Date(2022, 5, 1, 0, 0, 0, 0),
    closeTime: new Date(2022, 5, 14, 23, 59, 59, 999),
  },
  {
    id: "3",
    name: "Etkinlik 3",
    description: "Etkinlik 3 açıklaması",
    maxParticipant: 200,
    isOnline: true,
    location: "Online",
    eventTime: new Date(2022, 8, 1, 18, 0, 0, 0),
    participants: [],
    exclusiveForActiveMembers: false,
    releaseTime: new Date(2022, 7, 1, 0, 0, 0, 0),
    closeTime: new Date(2022, 7, 31, 23, 59, 59, 999),
  },
  {
    id: "4",
    name: "Etkinlik 4",
    description: "Etkinlik 4 açıklaması",
    maxParticipant: 75,
    isOnline: false,
    location: "İstanbul",
    eventTime: new Date(2022, 11, 15, 10, 0, 0, 0),
    participants: ["jane.doe", "joe.bloggs"],
    exclusiveForActiveMembers: true,
    releaseTime: new Date(2022, 11, 1, 0, 0, 0, 0),
    closeTime: new Date(2022, 11, 14, 23, 59, 59, 999),
  },
  {
    id: "5",
    name: "Etkinlik 5",
    description: "Etkinlik 5 açıklaması",
    maxParticipant: 150,
    isOnline: true,
    location: "Online",
    eventTime: new Date(2023, 2, 1, 14, 30, 0, 0),
    participants: ["john.doe", "joe.bloggs", "jane.doe"],
    exclusiveForActiveMembers: false,
    releaseTime: new Date(2023, 1, 1, 0, 0, 0, 0),
    closeTime: new Date(2023, 1, 28, 23, 59, 59, 999),
  },
  {
    id: "6",
    name: "Etkinlik 6",
    description: "Etkinlik 6 açıklaması",
    maxParticipant: 50,
    isOnline: false,
    location: "Ankara",
    eventTime: new Date(2023, 5, 15, 14, 30, 0, 0),
    participants: ["joe.bloggs"],
    exclusiveForActiveMembers: true,
    releaseTime: new Date(2023, 5, 1, 0, 0, 0, 0),
    closeTime: new Date(2023, 5, 14, 23, 59, 59, 999),
  },
  {
    id: "7",
    name: "Etkinlik 7",
    description: "Etkinlik 7 açıklaması",
    maxParticipant: 100,
    isOnline: true,
    location: "Online",
    eventTime: new Date(2023, 8, 1, 18, 0, 0, 0),
    participants: [],
    exclusiveForActiveMembers: false,
    releaseTime: new Date(2023, 7, 1, 0, 0, 0, 0),
    closeTime: new Date(2023, 7, 31, 23, 59, 59, 999),
  },
  {
    id: "8",
    name: "Etkinlik 8",
    description: "Etkinlik 8 açıklaması",
    maxParticipant: 200,
    isOnline: true,
    location: "Online",
    eventTime: new Date(2024, 2, 1, 14, 30, 0, 0),
    participants: ["jane.doe", "joe.bloggs"],
    exclusiveForActiveMembers: false,
    releaseTime: new Date(2024, 1, 1, 0, 0, 0, 0),
    closeTime: new Date(2024, 1, 28, 23, 59, 59, 999),
  },
  {
    id: "9",
    name: "Etkinlik 9",
    description: "Etkinlik 9 açıklaması",
    maxParticipant: 50,
    isOnline: false,
    location: "İzmir",
    eventTime: new Date(2024, 5, 15, 14, 30, 0, 0),
    participants: ["john.doe"],
    exclusiveForActiveMembers: true,
    releaseTime: new Date(2024, 5, 1, 0, 0, 0, 0),
    closeTime: new Date(2024, 5, 14, 23, 59, 59, 999),
  },
  {
    id: "10",
    name: "Etkinlik 10",
    description: "Etkinlik 10 açıklaması",
    maxParticipant: 150,
    isOnline: true,
    location: "Online",
    eventTime: new Date(2024, 8, 1, 18, 0, 0, 0),
    participants: ["jane.doe", "joe.bloggs"],
    exclusiveForActiveMembers: false,
    releaseTime: new Date(2024, 7, 1, 0, 0, 0, 0),
    closeTime: new Date(2024, 7, 31, 23, 59, 59, 999),
  },
  {
    id: "11",
    name: "Etkinlik 11",
    description: "Etkinlik 11 açıklaması",
    maxParticipant: 75,
    isOnline: false,
    location: "Ankara",
    eventTime: new Date(2025, 2, 1, 14, 30, 0, 0),
    participants: ["john.doe", "jane.doe"],
    exclusiveForActiveMembers: true,
    releaseTime: new Date(2025, 1, 1, 0, 0, 0, 0),
    closeTime: new Date(2025, 1, 28, 23, 59, 59, 999),
  },
  {
    id: "12",
    name: "Etkinlik 12",
    description: "Etkinlik 12 açıklaması",
    maxParticipant: 100,
    isOnline: true,
    location: "Online",
    eventTime: new Date(2025, 5, 15, 14, 30, 0, 0),
    participants: ["joe.bloggs"],
    exclusiveForActiveMembers: false,
    releaseTime: new Date(2025, 5, 1, 0, 0, 0, 0),
    closeTime: new Date(2025, 5, 14, 23, 59, 59, 999),
  },
  {
    id: "13",
    name: "Etkinlik 13",
    description: "Etkinlik 13 açıklaması",
    maxParticipant: 200,
    isOnline: true,
    location: "Online",
    eventTime: new Date(2025, 8, 1, 18, 0, 0, 0),
    participants: ["john.doe", "jane.doe", "joe.bloggs"],
    exclusiveForActiveMembers: false,
    releaseTime: new Date(2025, 7, 1, 0, 0, 0, 0),
    closeTime: new Date(2025, 7, 31, 23, 59, 59, 999),
  },
];

export const Events = () => {
  const [page, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<{
    id: string;
    name: string;
    description: string;
    maxParticipant: number;
    isOnline: boolean;
    location: string;
    eventTime: Date;
    participants: string[];
    exclusiveForActiveMembers: boolean;
    releaseTime: Date;
    closeTime: Date;
  }>(events[0]);

  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  /**
   * TODO: The event data should be retrieved from the backend according to the user's authorization
   * TODO: and the event's release and close times. (active members could enter before the release time)
   * ! Timezone difference could pose an issue in the future. Javascript defaults the timezone
   * ! to GMT+0, which we are currently not in. Timezone could be statically set to GMT+3.
   * ! However, this could cause problems if the user's timezone is different from turkey's timezone.
   */
  return (
    <div className="sm:w-10/12 w-full mb-4 flex sm:flex-col flex-col-reverse items-center border-2 border-neutral-200 p-2 rounded-xl">
      <Modal
        isOpen={!isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        placement="center"
      >
        <ModalContent>
          <ModalHeader>{selectedEvent.name}</ModalHeader>
          <ModalBody>
            <p>{selectedEvent.description}</p>
            <p>
              {selectedEvent.participants.length}/{selectedEvent.maxParticipant}
            </p>
          </ModalBody>
          <ModalFooter>
            <button onClick={() => {
              
            }}>Etkinliğe Katıl</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="w-full flex flex-col items-center my-4">
        <h1 className="text-3xl font-bold">Yaklaşan Etkinlikler</h1>
        <hr className="my-4 w-2/3" />
        <div className="w-fit">
          <Table className="w-fit">
            <TableHeader>
              <TableColumn>Etkinlik</TableColumn>
              <TableColumn>Tarih</TableColumn>
              <TableColumn>Saat</TableColumn>
              <TableColumn>Konum</TableColumn>
              <TableColumn>Katılım</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Yaklaşan etkinlik bulunmuyor."}>
              {events.map((event) => (
                <TableRow
                  key={event.id}
                  className="hover:bg-slate-700 cursor-pointer select-none"
                >
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.eventTime.toLocaleDateString()}</TableCell>
                  <TableCell>
                    {event.eventTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  {
                    // ! We probably wont ever have locations as short as these, could prove a problem in reality.
                  }
                  <TableCell>
                    {event.isOnline ? "Online" : event.location}
                  </TableCell>
                  <TableCell>
                    {event.participants.length}/{event.maxParticipant}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <Pagination
        total={10}
        initialPage={1}
        page={page}
        onChange={setPage}
        className="w-fit"
      />
    </div>
  );
};
