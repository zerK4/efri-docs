import {
  AntennaIcon,
  BarChartIcon,
  BarcodeIcon,
  BetweenHorizonalStartIcon,
  BlocksIcon,
  BookTextIcon,
  BracesIcon,
  BrickWallIcon,
  BrushIcon,
  DoorClosedIcon,
  DoorOpenIcon,
  FeatherIcon,
  FileSlidersIcon,
  TerminalIcon,
  ToyBrickIcon,
  WaypointsIcon,
} from "lucide-react";
import React from "react";

export type EachRoute = {
  icon?: React.ReactNode;
  title: string;
  href: string;
  noLink?: true;
  items?: EachRoute[];
  nest?: number;
  parentTitle?: string | null;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Getting Started",
    href: "",
    noLink: true,
    items: [
      {
        title: "Why Efri?",
        href: "/why-efri",
        icon: <BrushIcon size={16} />,
      },
      {
        title: "Installation",
        href: "/installation",
        icon: <BlocksIcon size={16} />,
      },
      {
        title: "Configuration",
        href: "/configuration",
        icon: <BookTextIcon size={16} />,
      },
    ],
    icon: <BarChartIcon size={16} />,
  },
  {
    title: "Config",
    href: "/config",
    icon: <FileSlidersIcon size={16} />,
  },
  {
    title: "Request",
    href: "/request",
    icon: <AntennaIcon size={16} />,
  },
  {
    title: "Response",
    href: "/response",
    icon: <AntennaIcon size={16} />,
  },
  {
    title: "Cli",
    href: "/cli",
    icon: <TerminalIcon size={16} />,
  },
  {
    title: "Router",
    href: "/router",
    icon: <WaypointsIcon size={16} />,
  },
  {
    title: "Middleware",
    href: "/middleware",
    icon: <BetweenHorizonalStartIcon size={16} />,
  },
  {
    title: "Controller",
    href: "/controller",
    icon: <DoorClosedIcon size={16} />,
  },
  {
    title: "Model",
    href: "/model",
    icon: <BracesIcon size={16} />,
  },
  {
    title: "Logger",
    href: "/logger",
    icon: <FeatherIcon size={16} />,
  },
  {
    title: "Plugins",
    href: "/plugins",
    icon: <ToyBrickIcon size={16} />,
    items: [
      {
        title: "Definition",
        href: "/definition",
      },
      {
        title: "Response Plugins",
        href: "/responsePlugins",
      },
      {
        title: "Route Plugins",
        href: "/routePlugins",
      },
      {
        title: "Logger Plugins",
        href: "/loggerPlugins",
      },
    ],
  },
  {
    title: "Gates",
    href: "/gates",
    icon: <DoorOpenIcon size={16} />,
  },
  {
    title: "Validators",
    href: "/validators",
    icon: <BarcodeIcon size={16} />,
  },
  {
    title: "Build",
    href: "/build",
    icon: <BrickWallIcon size={16} />,
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
