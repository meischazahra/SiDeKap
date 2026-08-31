"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";


import {
  CalenderIcon,
  GridIcon,
  ListIcon,
  TableIcon,
} from "../icons/index";
import tableIconPng from "../icons/table.png";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Beranda",
    path: "/",
  },
  {
    icon: <TableIcon />,
    name: "Standar Data Statistik",
    path: "/sds",
  },
  {
    name: "Kode Referensi Indikator Pembangunan",
    // Gunakan hasil import di atas
    icon: <img src={tableIconPng.src} alt="Table Icon" className="w-5 h-5 object-contain" />,
    path: "/kode-referensi",
  },
  {
    icon: <TableIcon />,
    name: "Data prioritas",
    path: "/data-prioritas",
  },
  {
    name: "Kode DSSD",
    icon: <TableIcon />,
    path: "/kode-dssd",
  },
];

const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
  } = useSidebar();

  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<
    Record<string, number>
  >({});

  const subMenuRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  const isActive = useCallback(
    (path: string) => path === pathname,
    [pathname]
  );

  useEffect(() => {
    let submenuMatched = false;

    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: "main",
              index,
            });

            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]:
            subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (
    index: number
  ) => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }

      return {
        type: "main",
        index,
      };
    });
  };

  const renderMenuItems = (
    items: NavItem[]
  ) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <>
              <button
                type="button"
                onClick={() =>
                  handleSubmenuToggle(index)
                }
                className={`menu-item group ${
                  openSubmenu?.type === "main" &&
                  openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                } cursor-pointer ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "lg:justify-start"
                }`}
              >
                <span
                  className={`${
                    openSubmenu?.type === "main" &&
                    openSubmenu?.index === index
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>

                {(isExpanded ||
                  isHovered ||
                  isMobileOpen) && (
                  <span className="menu-item-text">
                    {nav.name}
                  </span>
                )}
              </button>

              {(isExpanded ||
                isHovered ||
                isMobileOpen) && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[
                      `main-${index}`
                    ] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.type === "main" &&
                      openSubmenu?.index === index
                        ? `${subMenuHeight[`main-${index}`]}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 ml-9 space-y-1">
                    {nav.subItems.map(
                      (subItem) => (
                        <li key={subItem.name}>
                          <Link
                            href={subItem.path}
                            className={`menu-dropdown-item ${
                              isActive(
                                subItem.path
                              )
                                ? "menu-dropdown-item-active"
                                : "menu-dropdown-item-inactive"
                            }`}
                          >
                            {subItem.name}

                            <span className="ml-auto flex items-center gap-1">
                              {subItem.new && (
                                <span
                                  className={`menu-dropdown-badge ${
                                    isActive(
                                      subItem.path
                                    )
                                      ? "menu-dropdown-badge-active"
                                      : "menu-dropdown-badge-inactive"
                                  }`}
                                >
                                  new
                                </span>
                              )}

                              {subItem.pro && (
                                <span
                                  className={`menu-dropdown-badge ${
                                    isActive(
                                      subItem.path
                                    )
                                      ? "menu-dropdown-badge-active"
                                      : "menu-dropdown-badge-inactive"
                                  }`}
                                >
                                  pro
                                </span>
                              )}
                            </span>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                className={`menu-item group ${
                  isActive(nav.path)
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>

                {(isExpanded ||
                  isHovered ||
                  isMobileOpen) && (
                  <span className="menu-item-text">
                    {nav.name}
                  </span>
                )}
              </Link>
            )
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 dark:text-white lg:mt-0
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${
          isMobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }
        lg:translate-x-0`}
      onMouseEnter={() =>
        !isExpanded && setIsHovered(true)
      }
      onMouseLeave={() =>
        setIsHovered(false)
      }
    >
      {/* LOGO */}
      <div
        className={`flex py-8 ${
          !isExpanded && !isHovered
            ? "lg:justify-center"
            : "justify-start"
        }`}
      >
        <Link href="/">
          {isExpanded ||
          isHovered ||
          isMobileOpen ? (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo bps kapuas.png"
                alt="Logo BPS Kabupaten Kapuas"
                width={250}
                height={700}
              />

              <Image
                className="hidden dark:block"
                src="/images/logo/logo bps kapuas bm.png"
                alt="Logo"
                width={250}
                height={700}
              />
            </>
          ) : (
            <>
              <Image
                className="dark:hidden"
                src="/images/logo/logo hidden.png"
                alt="Logo"
                width={35}
                height={35}
              />
              <Image
                className="hidden dark:block"
                src="/images/logo/logo hidden dark.png"
                alt="Logo"
                width={32}
                height={32}
              />
            </>
            
          )}
        </Link>
      </div>

      {/* MENU */}
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 flex text-xs uppercase leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded ||
                isHovered ||
                isMobileOpen ? (
                  "Menu"
                ) : (
                  <span className="text-xs">
                    •••
                  </span>
                )}
              </h2>

              {renderMenuItems(navItems)}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;