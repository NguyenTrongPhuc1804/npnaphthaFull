import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/reducer/ModalSlice";
import moment from "moment";
import DefaultPagination from "../../../components/Pagination/DefaultPagination";

import {
  deleteAllBanner,
  deleteBanner,
  getAllBanner,
  searchBanner,
} from "../../../redux/reducer/BannerSlice";
import FormCreateBanner from "../../../components/Form/Banner/FormCreateBanner";
import FormUpdateBanner from "../../../components/Form/Banner/FormUpdateBanner";
import FormUpdateVideoBanner from "../../../components/Form/VideoBanner/FormUpdateVideoBanner";
import { getAllVideoBanner } from "../../../redux/reducer/VideoBannerSlice";

const TABS = [
  {
    label: "Tên",
    value: "name",
  },
  {
    label: "Loại",
    value: "type",
  },
];

const TABLE_HEAD = ["Đường dẫn", "Ngày khởi tạo", ""];

export default function ManagementVideoBanner() {
  const dispatch = useDispatch();
  //state
  const { listAllVideo } = useSelector((state) => state.videoBannerSlice);
  console.log(listAllVideo, "listAllVideo");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchBy, setSearchBy] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const [listDelete, setListDelete] = useState([]);

  //event
  const handleSearchProduct = () => {
    dispatch(searchBanner({ searchBy, searchValue }));
    setSearchValue("");
  };
  const handleOpenForm = () => {
    dispatch(
      openModal({
        body: <FormCreateBanner />,
        title: "Tạo video mới",
      })
    );
  };
  const handleDeleteProduct = (id) => {
    dispatch(deleteBanner(id));
  };
  const handleDeleteAllProduct = () => {
    dispatch(deleteAllBanner(listDelete));
    setListDelete([]);
  };
  useEffect(() => {
    dispatch(getAllVideoBanner());
  }, []);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách video
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Xem thông tin về video
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" size="sm">
              view all
            </Button> */}
            {/* <Button
              onClick={handleOpenForm}
              className="flex items-center gap-3"
              size="sm"
            >
              + Thêm video
            </Button> */}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* <Tabs value="name" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }, idx) => (
                <Tab onClick={() => setSearchBy(value)} key={idx} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> */}
          {/* <div className="w-full md:w-72">
            <Input
              label="Tìm kiếm theo tên sản phẩm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              icon={
                <MagnifyingGlassIcon
                  onClick={handleSearchProduct}
                  className="h-5 w-5 cursor-pointer"
                />
              }
            />
          </div> */}
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
            {listAllVideo?.data?.map((item, index) => {
              const isLast = index === listAllVideo.length - 1;
              const classes = isLast
                ? "p-4 truncate"
                : "p-4 border-b border-blue-gray-50 truncate";

              return (
                <tr key={item._id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal w-[200px] truncate"
                    >
                      <a href={item.url} target="_blank">
                        {item.url}
                      </a>
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {moment(item.createdAt).format("DD/MM/YYYY")}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Sửa video">
                      <IconButton
                        onClick={() =>
                          dispatch(
                            openModal({
                              title: "Cập nhật video",
                              body: <FormUpdateVideoBanner data={item} />,
                            })
                          )
                        }
                        variant="text"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip content="Xóa video">
                      <Popover>
                        <PopoverHandler>
                          <IconButton variant="text">
                            <TrashIcon color="red" className="h-4 w-4" />
                          </IconButton>
                        </PopoverHandler>
                        <PopoverContent>
                          <div className="flex items-center ">
                            <p className="text-sm mr-2">Xóa video này??</p>
                            <div className="flex justify-end mt-2">
                              <Button
                                onClick={() => handleDeleteProduct(item._id)}
                                className="px-2 py-2 text-xs"
                              >
                                Xóa
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </Tooltip> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div className="w-full flex justify-center">
          <DefaultPagination
            pageCount={listAllVideo?.totalPage}
            e={(value) => {
              dispatch(getAllVideoBanner({ page: value, limit: 8 }));
              setCurrentPage(value);
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
