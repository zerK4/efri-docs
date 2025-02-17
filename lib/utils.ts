import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EachRoute, ROUTES } from "./routes-config";
import anime from "animejs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function helperSearch(
  query: string,
  node: EachRoute,
  prefix: string,
  currentLevel: number,
  maxLevel?: number,
  parentHierarchy: string[] = [] // Pass the hierarchy as an array
): EachRoute[] {
  const res: EachRoute[] = [];
  let parentHas = false;

  const nextLink = `${prefix}${node.href}`;
  const currentHierarchy = [...parentHierarchy, node.title]; // Build the current hierarchy

  // Check if the current node matches the query
  if (node.title.toLowerCase().includes(query.toLowerCase())) {
    res.push({
      ...node,
      items: undefined, // Remove child items from the result
      href: nextLink,
      nest: currentLevel, // Add nesting level
      parentTitle: currentHierarchy.join(" > "), // Join hierarchy into a single string
    });
    parentHas = true;
  }

  const goNext = maxLevel ? currentLevel < maxLevel : true;

  if (goNext && node.items?.length) {
    node.items.forEach((item) => {
      const innerRes = helperSearch(
        query,
        item,
        nextLink,
        currentLevel + 1,
        maxLevel,
        currentHierarchy // Pass the updated hierarchy
      );

      // If child matches exist and parent hasn't been added yet
      if (innerRes.length && !parentHas) {
        res.push({
          ...node,
          items: undefined,
          href: nextLink,
          parentTitle: currentHierarchy.join(" > "),
        });
        parentHas = true;
      }

      res.push(...innerRes);
    });
  }

  return res;
}

export function advanceSearch(query: string) {
  return ROUTES.map((node) =>
    helperSearch(query, node, "", 0, query.length === 0 ? 2 : undefined)
  ).flat();
}

// Thursday, May 23, 2024
export function formatDate(dateStr: string): string {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

//  May 23, 2024
export function formatDate2(dateStr: string): string {
  const [day, month, year] = dateStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export function stringToDate(date: string) {
  const [day, month, year] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function leavingPage(url: string) {
  const leavingEl = document.querySelector(".leaving");

  if (leavingEl) {
    leavingEl.innerHTML = "Leaving nents...";
  }

  const tl = anime.timeline();

  tl.add({
    targets: ".leaving",
    height: ["0vh", "100vh"],
    easing: "easeInOutQuad",
    duration: 1050,
  }).add({
    targets: ".leaving",
    translateY: "-100vh",
    easing: "easeInOutQuad",
    duration: 500,
    complete: () => {
      window.location.replace(url);
    },
  });
}
