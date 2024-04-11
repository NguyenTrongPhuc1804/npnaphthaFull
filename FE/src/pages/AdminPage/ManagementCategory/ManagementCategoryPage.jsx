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
  CardFooter,
  IconButton,
  Tooltip,
  Popover,
  PopoverHandler,
  PopoverContent,
  Checkbox,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/reducer/ModalSlice";

import moment from "moment";
import DefaultPagination from "../../../components/Pagination/DefaultPagination";

import {
  deleteProduct,
  getAllProduct,
  searchProduct,
} from "../../../redux/reducer/ProductSlice";

import FormUpdateProduct from "../../../components/Form/Product/FormUpdateProduct";
import FormCreateCategory from "../../../components/Form/Category/FormCreateCategory";
import {
  deleteAllCategory,
  deleteCategory,
  getAllCategory,
  searchCategory,
} from "../../../redux/reducer/CategorySlice";
import FormUpdateCategory from "../../../components/Form/Category/FormUpdateCategory";

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

const TABLE_HEAD = ["", "Tên danh mục", "Đường dẫn tĩnh", "Ngày khởi tạo", ""];

export default function ManagementCategory() {
  const dispatch = useDispatch();
  //state
  const { listAllCategory } = useSelector((state) => state.categorySlice);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchBy, setSearchBy] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [listDelete, setListDelete] = useState([]);

  //event
  const handleSearchCate = () => {
    dispatch(searchCategory({ searchBy, searchValue }));
    setSearchValue("");
  };
  const handleOpenForm = () => {
    dispatch(
      openModal({ body: <FormCreateCategory />, title: "Tạo danh mục mới" })
    );
  };
  const handleDeleteCate = (id) => {
    dispatch(deleteCategory(id));
  };
  const handleDeleteAllProduct = () => {
    dispatch(deleteAllCategory(listDelete));
    setListDelete([]);
  };
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách danh mục
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Xem thông tin về tất cả danh mục
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
              + Thêm danh mục
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* <Tabs value="name" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  onClick={() => setSearchBy(value)}
                  key={value}
                  value={value}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs> */}
          <div className="w-full md:w-72">
            <Input
              placeholder="tìm kiếm theo tên danh mục"
              label="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              icon={
                <MagnifyingGlassIcon
                  onClick={handleSearchCate}
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
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
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
            {listAllCategory?.data?.map((item, index) => {
              const isLast = index === listAllCategory.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={item._id}>
                  <td className={classes}>
                    <Checkbox
                      value={item._id}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setListDelete([...listDelete, e.target.value]);
                        } else {
                          setListDelete(
                            [...listDelete].filter((ele) => ele !== item._id)
                          );
                        }
                      }}
                      on
                    />
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {item.name}
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
                        {item.slug}
                      </Typography>
                    </div>
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
                    <Tooltip content="Sửa danh mục">
                      <IconButton
                        onClick={() =>
                          dispatch(
                            openModal({
                              title: "Cập nhật danh mục",
                              body: <FormUpdateCategory data={item} />,
                            })
                          )
                        }
                        variant="text"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Xóa danh mục">
                      <Popover>
                        <PopoverHandler>
                          <IconButton variant="text">
                            <TrashIcon color="red" className="h-4 w-4" />
                          </IconButton>
                        </PopoverHandler>
                        <PopoverContent>
                          <div className="flex items-center ">
                            <p className="text-sm mr-2">Xóa danh mục này??</p>
                            <div className="flex justify-end mt-2">
                              <Button
                                onClick={() => handleDeleteCate(item._id)}
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
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <div className="w-full flex justify-center">
          <DefaultPagination
            pageCount={listAllCategory?.totalPage}
            e={(value) => {
              dispatch(getAllProduct({ page: value, limit: 8 }));
              setCurrentPage(value);
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
