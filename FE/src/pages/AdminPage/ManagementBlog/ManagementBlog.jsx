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
import moment from "moment";
import DefaultPagination from "../../../components/Pagination/DefaultPagination";
import FormCreateBlog from "../../../components/Form/Blog/FormCreateBlog";
import {
  deleteAllBlog,
  deleteBlog,
  getAllBlog,
  searchBlog,
} from "../../../redux/reducer/BlogSlice";
import FormUpdateBlog from "../../../components/Form/Blog/FormUpdateBlog";
import { useNavigate } from "react-router-dom";

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

const TABLE_HEAD = [
  "",
  "Tên blog",
  "Đường dẫn tĩnh",
  "Nội dung",
  "Ngày khởi tạo",
  "",
];

export default function ManagementBlog() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const { listAllBlog } = useSelector((state) => state.BlogSlice);

  const [currentPage, setCurrentPage] = useState(0);
  const [searchBy, setSearchBy] = useState("title");
  const [searchValue, setSearchValue] = useState("");
  const [listDelete, setListDelete] = useState([]);

  //event
  const handleSearchProduct = () => {
    dispatch(searchBlog({ searchBy, searchValue }));
    setSearchValue("");
  };
  const handleOpenForm = () => {
    dispatch(
      openModal({
        body: <FormCreateBlog />,
        title: "Tạo blog mới",
      })
    );
  };
  const handleDeleteProduct = (id) => {
    dispatch(deleteBlog(id));
  };
  const handleDeleteAllProduct = () => {
    dispatch(deleteAllBlog(listDelete));
    setListDelete([]);
  };
  useEffect(() => {
    dispatch(getAllBlog());
  }, []);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Danh sách blog
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Xem thông tin về tất cả blog
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
              + Thêm blog
            </Button>
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
          <div className="w-full md:w-72">
            <Input
              label="Tìm kiếm theo tên bài viết"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              icon={
                <MagnifyingGlassIcon
                  onClick={handleSearchProduct}
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
            {listAllBlog?.data?.map((item, index) => {
              const isLast = index === listAllBlog.length - 1;
              const classes = isLast
                ? "p-4 truncate"
                : "p-4 border-b border-blue-gray-50 truncate";

              return (
                <tr
                  onClick={(e) => {
                    navigate(`/blog/${item.slug}`);
                  }}
                  className="cursor-pointer hover:bg-blue-100 transition duration-300"
                  key={item._id}
                >
                  <td className={classes}>
                    <Checkbox
                      value={item._id}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setListDelete([...listDelete, e.target.value]);
                        } else {
                          setListDelete(
                            [...listDelete].filter((ele) => ele !== item._id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3    ">
                      <img
                        className="rounded-lg h-16 w-16 object-cover"
                        src={
                          item.image
                            ? item.image
                            : "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt={item.image}
                        size="sm"
                      />
                      <div className="flex flex-col ">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal truncate ... w-[200px]"
                        >
                          {item.title}
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
                    <div
                      className="w-max line-clamp-2 max-w-[300px] max-h-[100px] "
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    ></div>
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
                  <td onClick={(e) => e.stopPropagation()} className={classes}>
                    <Tooltip content="Sửa blog">
                      <IconButton
                        onClick={() =>
                          dispatch(
                            openModal({
                              title: "Cập nhật blog",
                              body: <FormUpdateBlog data={item} />,
                            })
                          )
                        }
                        variant="text"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Xóa blog">
                      <Popover>
                        <PopoverHandler>
                          <IconButton variant="text">
                            <TrashIcon color="red" className="h-4 w-4" />
                          </IconButton>
                        </PopoverHandler>
                        <PopoverContent>
                          <div className="flex items-center ">
                            <p className="text-sm mr-2">Xóa blog này??</p>
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
            pageCount={listAllBlog?.totalPage}
            e={(value) => {
              dispatch(getAllBlog({ page: value, limit: 8 }));
              setCurrentPage(value);
            }}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
