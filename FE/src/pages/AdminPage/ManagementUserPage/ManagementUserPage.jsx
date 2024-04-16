import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
  Popover,
  PopoverHandler,
  PopoverContent,
  Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/reducer/ModalSlice";
import FormCreateUser from "../../../components/Form/User/FormCreateUser";
import {
  deleteAllUser,
  deleteUser,
  getAllUser,
  searchUser,
} from "../../../redux/reducer/UserSlice";
import moment from "moment";
import DefaultPagination from "../../../components/Pagination/DefaultPagination";
import { closeDialog } from "../../../redux/reducer/DialogSlice";
import FormUpdateUser from "../../../components/Form/User/FormUpdateUser";
import { notify } from "../../../toolkits/help";

const TABS = [
  {
    label: "Tên",
    value: "name",
  },
  {
    label: "Email",
    value: "email",
  },
  {
    label: "Phone",
    value: "phone",
  },
];

const TABLE_HEAD = ["", "Tên người dùng", "Phone", "Loại", "Ngày khởi tạo", ""];

export default function ManagementUserPage() {
  const dispatch = useDispatch();
  //state
  const { allUserList } = useSelector((state) => state.userSlice);
  const [currentPage, setCurrentPage] = useState(0);
  const [popover, setPopover] = useState(false);
  const [searchBy, setSearchBy] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [listDelete, setListDelete] = useState([]);

  //event
  const handleSearchUser = () => {
    dispatch(searchUser({ searchBy, searchValue }));
    setSearchValue("");
  };
  const handleOpenForm = () => {
    dispatch(
      openModal({ body: <FormCreateUser />, title: "Tạo người dùng mới" })
    );
  };
  const handleDeleteUser = (user_id) => {
    if (user_id === localStorage.getItem("user_id")) {
      return notify("error", "Không thể xóa tài khoản của bạn");
    }
    dispatch(deleteUser({ user_id, page: currentPage }));
  };
  const handleDeleteAllProduct = () => {
    dispatch(deleteAllUser(listDelete));
    setListDelete([]);
  };
  useEffect(() => {
    dispatch(getAllUser());
    localStorage.setItem("sidenav", "user");
  }, []);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách người dùng
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Xem thông tin về tất cả thành viên
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" size="sm">
              view all
            </Button> */}
            <Button
              onClick={handleOpenForm}
              className="flex items-center gap-3"
              size="sm"
            >
              + Thêm người dùng
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="name" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }, idx) => (
                <Tab onClick={() => setSearchBy(value)} key={idx} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              icon={
                <MagnifyingGlassIcon
                  onClick={handleSearchUser}
                  className="h-5 w-5 cursor-pointer"
                />
              }
            />
          </div>
        </div>
      </CardHeader>
      {listDelete.length > 0 && (
        <div className="pr-6 mt-4 flex justify-end">
          <Button className="py-2 px-3" onClick={handleDeleteAllProduct}>
            Xóa tất cả
          </Button>
        </div>
      )}
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, idx) => (
                <th
                  key={idx}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allUserList?.data?.map(
              (
                {
                  address,
                  avatar,
                  createdAt,
                  email,
                  name,
                  password,
                  phone,
                  role,
                  _id,
                },
                index
              ) => {
                const isLast = index === allUserList.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Checkbox
                        value={_id}
                        disabled={_id === localStorage.getItem("user_id")}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setListDelete([...listDelete, e.target.value]);
                          } else {
                            setListDelete(
                              [...listDelete].filter((ele) => ele !== _id)
                            );
                          }
                        }}
                      />
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={
                            avatar
                              ? avatar
                              : "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                          }
                          alt={name}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {phone}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={role == "ADMIN" ? "quản trị" : "người dùng"}
                          color={role == "ADMIN" ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(createdAt).format("DD/MM/YYYY")}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Sửa người dùng">
                        <IconButton
                          onClick={() =>
                            dispatch(
                              openModal({
                                title: "Cập nhật người dùng",
                                body: (
                                  <FormUpdateUser
                                    data={{
                                      address,
                                      avatar,
                                      createdAt,
                                      email,
                                      name,
                                      password,
                                      phone,
                                      role,
                                      _id,
                                      currentPage,
                                    }}
                                  />
                                ),
                              })
                            )
                          }
                          variant="text"
                        >
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Xóa người dùng">
                        <Popover>
                          <PopoverHandler>
                            <IconButton variant="text">
                              <TrashIcon color="red" className="h-4 w-4" />
                            </IconButton>
                          </PopoverHandler>
                          <PopoverContent>
                            <div className="flex items-center ">
                              <p className="text-sm mr-2">
                                Xóa người dùng này??
                              </p>
                              <div className="flex justify-end mt-2">
                                <Button
                                  onClick={() => handleDeleteUser(_id)}
                                  className="px-2 py-2 text-xs"
                                >
                                  Xóa
                                </Button>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div className="w-full flex justify-center">
          <DefaultPagination
            pageCount={allUserList?.totalPage}
            e={(value) => {
              dispatch(getAllUser({ page: value, limit: 8 }));
              setCurrentPage(value);
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
