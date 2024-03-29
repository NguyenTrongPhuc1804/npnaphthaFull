import { Avatar, Button, Chip, Typography } from "@material-tailwind/react";
import React from "react";
const authorsTableData = [
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: ["Manager", "Organization"],
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: ["Programator", "Developer"],
    online: false,
    date: "11/01/19",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: ["Executive", "Projects"],
    online: true,
    date: "19/09/17",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: ["Programator", "Developer"],
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Djpeg",
    name: "Bruce Mars",
    email: "bruce@creative-tim.com",
    job: ["Manager", "Executive"],
    online: false,
    date: "04/10/21",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Alexander",
    email: "alexander@creative-tim.com",
    job: ["Programator", "Developer"],
    online: false,
    date: "14/09/20",
  },
];
const projectsTableData = [
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Material XD Version",
    members: [
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Romina Hadid",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Ryan Tompson",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Jessica Doe",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Alexander Smith",
      },
    ],
    budget: "$14,000",
    completion: 60,
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Add Progress Track",
    members: [
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Ryan Tompson",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Alexander Smith",
      },
    ],
    budget: "$3,000",
    completion: 10,
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Fix Platform Errors",
    members: [
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Jessica Doe",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Romina Hadid",
      },
    ],
    budget: "Not set",
    completion: 100,
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Launch our Mobile App",
    members: [
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Alexander Smith",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Jessica Doe",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Ryan Tompson",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Romina Hadid",
      },
    ],
    budget: "$20,500",
    completion: 100,
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Add the New Pricing Page",
    members: [
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Alexander Smith",
      },
    ],
    budget: "$500",
    completion: 25,
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Redesign New Online Shop",
    members: [
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Romina Hadid",
      },
      {
        img: "https://plus.unsplash.com/premium_photo-1682147474777-90dc55cdbc67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        name: "Alexander Smith",
      },
    ],
    budget: "$2,000",
    completion: 40,
  },
];
export default function UserTable() {
  return (
    <tbody>
      <div className="flex justify-end w-full   ">
        <Button className="">Thêm mới</Button>
      </div>
      {authorsTableData.map(({ img, name, email, job, online, date }, key) => {
        const className = `py-3 px-5 ${
          key === authorsTableData.length - 1
            ? ""
            : "border-b border-blue-gray-50"
        }`;

        return (
          <tr key={name}>
            <td className={className}>
              <div className="flex items-center gap-4">
                <Avatar src={img} alt={name} size="sm" variant="rounded" />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold"
                  >
                    {name}
                  </Typography>
                  <Typography className="text-xs font-normal text-blue-gray-500">
                    {email}
                  </Typography>
                </div>
              </div>
            </td>
            <td className={className}>
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {job[0]}
              </Typography>
              <Typography className="text-xs font-normal text-blue-gray-500">
                {job[1]}
              </Typography>
            </td>
            <td className={className}>
              <Chip
                variant="gradient"
                color={online ? "green" : "blue-gray"}
                value={online ? "online" : "offline"}
                className="py-0.5 px-2 text-[11px] font-medium w-fit"
              />
            </td>
            <td className={className}>
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {date}
              </Typography>
            </td>
            <td className={className}>
              <Typography
                as="a"
                href="#"
                className="text-xs font-semibold text-blue-gray-600"
              >
                Edit
              </Typography>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
