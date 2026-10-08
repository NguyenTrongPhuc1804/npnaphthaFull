export const ADMIN_MENU = [
  {
    group: "Nội dung",
    items: [
      { to: "/admin", end: true, label: "Sản phẩm", icon: "fa-bag-shopping" },
      { to: "/admin/category", label: "Danh mục", icon: "fa-list" },
      { to: "/admin/blog", label: "Tin tức", icon: "fa-newspaper" },
      { to: "/admin/catalogue", label: "Catalogue", icon: "fa-file-pdf" },
      { to: "/admin/partner", label: "Đối tác", icon: "fa-handshake" },
      { to: "/admin/banner", label: "Banner", icon: "fa-image" },
      { to: "/admin/video-banner", label: "Video banner", icon: "fa-video" },
    ],
  },
  {
    group: "Tương tác",
    items: [
      {
        to: "/admin/contact",
        label: "Liên hệ",
        icon: "fa-address-book",
        badge: "contact",
      },
      {
        to: "/admin/chat",
        label: "Tin nhắn",
        icon: "fa-comment",
        badge: "chat",
      },
    ],
  },
  {
    group: "Hệ thống",
    items: [
      {
        to: "/admin/user",
        label: "Người dùng",
        icon: "fa-user-group",
        adminOnly: true,
      },
    ],
  },
];

export const ADMIN_TITLES = {
  "/admin": "Quản lý sản phẩm",
  "/admin/category": "Quản lý danh mục",
  "/admin/blog": "Quản lý tin tức",
  "/admin/catalogue": "Quản lý catalogue",
  "/admin/partner": "Quản lý đối tác",
  "/admin/banner": "Quản lý banner",
  "/admin/video-banner": "Quản lý video banner",
  "/admin/contact": "Quản lý liên hệ",
  "/admin/chat": "Tin nhắn khách hàng",
  "/admin/user": "Quản lý người dùng",
  "/admin/my-profile": "Thông tin tài khoản",
};
