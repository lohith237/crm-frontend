// menuData.js
import { GridIcon, UserCircleIcon } from "../../icons";

export const menuItems = [
  {
    key: "dashboard",
    label: "Dashboard",
     url: null,   
    icon: GridIcon, 
    subMenu: [
      {
        key: "crm",
        label: "CRM",
        url: "/dashboard/crm",
      },
    ],
  },
  {
    key: "contactus",
    label: "Contacts",
    url: "/dashboard/contacts",
    icon: UserCircleIcon, 
  },
  
];
