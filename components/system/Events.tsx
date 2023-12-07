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
  Spinner,
} from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";
import { Event } from "@/types/event";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


//   {
//     id: "1",
//     name: "Etkinlik 1 sdfgsdfg",
//     description: "Etkinlik 1 açıklaması",
//     maxParticipant: 100,
//     isOnline: false,
//     location: "sdafg sdfgsdfg sdfg sdfgsdf gsdfg sdfg sdfg sdfg sdfgsd fgsfd sdfg sdfg ",
//     eventTime: new Date(2021, 10, 10, 10, 10, 10, 10),
//     participants: ["sdfsf", "asdfasdfasdf"],
//     exclusiveForActiveMembers: false,
//     releaseTime: new Date(2021, 10, 10, 10, 10, 10, 10),
//     closeTime: new Date(2025, 10, 10, 10, 10, 10, 10),
//   },
//   {
//     id: "2",
//     name: "Etkinlik 2",
//     description: "Etkinlik 2 açıklaması",
//     maxParticipant: 50,
//     isOnline: false,
//     location: "Ankara",
//     eventTime: new Date(2022, 5, 15, 14, 30, 0, 0),
//     participants: ["john.doe", "jane.doe"],
//     exclusiveForActiveMembers: true,
//     releaseTime: new Date(2022, 5, 1, 0, 0, 0, 0),
//     closeTime: new Date(2022, 5, 14, 23, 59, 59, 999),
//   },
//   {
//     id: "3",
//     name: "Etkinlik 3",
//     description: "Etkinlik 3 açıklaması",
//     maxParticipant: 200,
//     isOnline: true,
//     location: "Online",
//     eventTime: new Date(2022, 8, 1, 18, 0, 0, 0),
//     participants: [],
//     exclusiveForActiveMembers: false,
//     releaseTime: new Date(2022, 7, 1, 0, 0, 0, 0),
//     closeTime: new Date(2022, 7, 31, 23, 59, 59, 999),
//   },
//   {
//     id: "4",
//     name: "Etkinlik 4",
//     description: "Etkinlik 4 açıklaması",
//     maxParticipant: 75,
//     isOnline: false,
//     location: "İstanbul",
//     eventTime: new Date(2022, 11, 15, 10, 0, 0, 0),
//     participants: ["jane.doe", "joe.bloggs"],
//     exclusiveForActiveMembers: true,
//     releaseTime: new Date(2022, 11, 1, 0, 0, 0, 0),
//     closeTime: new Date(2022, 11, 14, 23, 59, 59, 999),
//   },
//   {
//     id: "5",
//     name: "Etkinlik 5",
//     description: "Etkinlik 5 açıklaması",
//     maxParticipant: 150,
//     isOnline: true,
//     location: "Online",
//     eventTime: new Date(2023, 2, 1, 14, 30, 0, 0),
//     participants: ["john.doe", "joe.bloggs", "jane.doe"],
//     exclusiveForActiveMembers: false,
//     releaseTime: new Date(2023, 1, 1, 0, 0, 0, 0),
//     closeTime: new Date(2023, 1, 28, 23, 59, 59, 999),
//   },
//   {
//     id: "6",
//     name: "Etkinlik 6",
//     description: "Etkinlik 6 açıklaması",
//     maxParticipant: 50,
//     isOnline: false,
//     location: "Ankara",
//     eventTime: new Date(2023, 5, 15, 14, 30, 0, 0),
//     participants: ["joe.bloggs"],
//     exclusiveForActiveMembers: true,
//     releaseTime: new Date(2023, 5, 1, 0, 0, 0, 0),
//     closeTime: new Date(2023, 5, 14, 23, 59, 59, 999),
//   },
//   {
//     id: "7",
//     name: "Etkinlik 7",
//     description: "Etkinlik 7 açıklaması",
//     maxParticipant: 100,
//     isOnline: true,
//     location: "Online",
//     eventTime: new Date(2023, 8, 1, 18, 0, 0, 0),
//     participants: [],
//     exclusiveForActiveMembers: false,
//     releaseTime: new Date(2023, 7, 1, 0, 0, 0, 0),
//     closeTime: new Date(2023, 7, 31, 23, 59, 59, 999),
//   },
//   {
//     id: "8",
//     name: "Etkinlik 8",
//     description: "Etkinlik 8 açıklaması",
//     maxParticipant: 200,
//     isOnline: true,
//     location: "Online",
//     eventTime: new Date(2024, 2, 1, 14, 30, 0, 0),
//     participants: ["jane.doe", "joe.bloggs"],
//     exclusiveForActiveMembers: false,
//     releaseTime: new Date(2024, 1, 1, 0, 0, 0, 0),
//     closeTime: new Date(2024, 1, 28, 23, 59, 59, 999),
//   },
//   {
//     id: "9",
//     name: "Etkinlik 9",
//     description: "Etkinlik 9 açıklaması",
//     maxParticipant: 50,
//     isOnline: false,
//     location: "İzmir",
//     eventTime: new Date(2024, 5, 15, 14, 30, 0, 0),
//     participants: ["john.doe"],
//     exclusiveForActiveMembers: true,
//     releaseTime: new Date(2024, 5, 1, 0, 0, 0, 0),
//     closeTime: new Date(2024, 5, 14, 23, 59, 59, 999),
//   },
//   {
//     id: "10",
//     name: "Etkinlik 10",
//     description: "Etkinlik 10 açıklaması",
//     maxParticipant: 150,
//     isOnline: true,
//     location: "Online",
//     eventTime: new Date(2024, 8, 1, 18, 0, 0, 0),
//     participants: ["jane.doe", "joe.bloggs"],
//     exclusiveForActiveMembers: false,
//     releaseTime: new Date(2024, 7, 1, 0, 0, 0, 0),
//     closeTime: new Date(2024, 7, 31, 23, 59, 59, 999),
//   },
//   {
//     id: "11",
//     name: "Etkinlik 11",
//     description: "Etkinlik 11 açıklaması",
//     maxParticipant: 75,
//     isOnline: false,
//     location: "Ankara",
//     eventTime: new Date(2025, 2, 1, 14, 30, 0, 0),
//     participants: ["john.doe", "jane.doe"],
//     exclusiveForActiveMembers: true,
//     releaseTime: new Date(2025, 1, 1, 0, 0, 0, 0),
//     closeTime: new Date(2025, 1, 28, 23, 59, 59, 999),
//   },
//   {
//     id: "12",
//     name: "Etkinlik 12",
//     description: "Etkinlik 12 açıklaması",
//     maxParticipant: 100,
//     isOnline: true,
//     location: "Online",
//     eventTime: new Date(2025, 5, 15, 14, 30, 0, 0),
//     participants: ["joe.bloggs"],
//     exclusiveForActiveMembers: false,
//     releaseTime: new Date(2025, 5, 1, 0, 0, 0, 0),
//     closeTime: new Date(2025, 5, 14, 23, 59, 59, 999),
//   },
//   {
//     id: "13",
//     name: "Etkinlik 13",
//     description: "Etkinlik 13 açıklaması",
//     maxParticipant: 200,
//     isOnline: true,
//     location: "Online",
//     eventTime: new Date(2025, 8, 1, 18, 0, 0, 0),
//     participants: ["john.doe", "jane.doe", "joe.bloggs"],
//     exclusiveForActiveMembers: false,
//     releaseTime: new Date(2025, 7, 1, 0, 0, 0, 0),
//     closeTime: new Date(2025, 7, 31, 23, 59, 59, 999),
//   },
// ];
export const Events = () => {
  const router = useRouter();

  const [events, setEvents] = useState<Event[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState<Event>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    console.log("sdfdsfg")
    const pb_auth = Cookies.get("pb_auth")
    const getData = async () => {
      const res = await axios.get<
        any,
        AxiosResponse<{
          items: Event[];
          page: number;
          perPage: number;
          totalItems: number;
          totalPages: number;
        }>
      >(`http://localhost:3000/api/events?page=${page}&per_page=10`, {
        headers:{
          cookie: `pb_auth=${pb_auth}`
        }
      });
      // console.log(res.data);
      setEvents(res.data.items);
      setTotalPages(totalPages);
    };
    getData();
  }, [page]);

  /**
   * TODO: The event data should be retrieved from the backend according to the user's authorization
   * TODO: and the event's release and close times. (active members could enter before the release time)
   * ! Timezone difference could pose an issue in the future. Javascript defaults the timezone
   * ! to GMT+0, which we are currently not in. Timezone could be statically set to GMT+3.
   * ! However, this could cause problems if the user's timezone is different from turkey's timezone.
   */
  return (
    <div className="sm:w-10/12 w-full mb-4 flex sm:flex-col flex-col-reverse items-center border-2 border-neutral-200 p-2 rounded-xl">
      {/* <Modal
        isOpen={isOpen}
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
      </Modal> */}
      <div className="w-full flex flex-col items-center my-4">
        <h1 className="text-3xl font-bold">Yaklaşan Etkinlikler</h1>
        <hr className="my-4 w-2/3" />
        <div className="w-fit">
          {events ? (
            <Table className="w-fit">
              <TableHeader>
                <TableColumn>Etkinlik</TableColumn>
                <TableColumn>Tarih</TableColumn>
                <TableColumn className="sm:table-cell hidden">Saat</TableColumn>
                <TableColumn>Konum</TableColumn>
                <TableColumn className="sm:table-cell hidden">
                  Katılım
                </TableColumn>
              </TableHeader>
              <TableBody emptyContent={"Yaklaşan etkinlik bulunmuyor."}>
                {events.map((event) => (
                  <TableRow
                    key={event.id}
                    className="hover:bg-slate-700 cursor-pointer select-none"
                    onClick={() => {
                      router.push(`/dashboard/event/${event.id}`);
                    }}
                  >
                    <TableCell>
                      {event.name.length > 20
                        ? event.name.slice(0, 20) + "... "
                        : event.name}
                    </TableCell>
                    <TableCell>
                      {new Date(event.eventTime).toLocaleDateString("tr-TR", {
                        timeZone: "GMT+0",
                      })}
                    </TableCell>
                    <TableCell className="sm:table-cell hidden">
                      {new Date(event.eventTime).toLocaleTimeString("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZone: "GMT+0",
                      })}
                    </TableCell>
                    {
                      // ! We probably wont ever have locations as short as these, could prove a problem in reality.
                    }
                    <TableCell>
                      {event.isOnline
                        ? "Online"
                        : event.location.length > 20
                        ? event.location.slice(0, 5) + "..."
                        : event.location}
                    </TableCell>
                    <TableCell className="sm:table-cell hidden">
                      {event.participants.length}/{event.maxParticipant}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
      <Pagination
        total={totalPages}
        initialPage={page}
        page={page}
        onChange={setPage}
        className="w-fit"
      />
    </div>
  );
};
