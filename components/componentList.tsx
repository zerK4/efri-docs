import { ROUTES } from "@/lib/routes-config";
import React from "react";
import Anchor from "./anchor";

function ComponentList() {
  const components = ROUTES.map((x) => x.items)
    .flat()
    .filter((x) => x?.title === "Components")[0]
    ?.items?.filter((x) => x.title !== "Form");

  return (
    <div className='flex flex-col gap-2'>
      {components?.map((x) => (
        <div key={x.title}>
          <Anchor className='text-sm font-medium w-fit' href={`/docs${x.href}`}>
            {x.title}
          </Anchor>
        </div>
      ))}
    </div>
  );
}

export default ComponentList;
