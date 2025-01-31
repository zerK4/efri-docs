"use client";

import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CmdCtrlButton = ({ message }: { message?: string }) => {
  const [modifierKey, setModifierKey] = useState("ctrl");

  useEffect(() => {
    const isMac = navigator.userAgent.toLowerCase().includes("mac");
    setModifierKey(isMac ? "cmd" : "ctrl");
  }, []);

  return (
    <div className='flex items-center gap-4'>
      <Tooltip>
        <TooltipTrigger>
          <span className='flex items-center gap-2 cursor-default'>
            {modifierKey === "cmd" ? "⌘" : "^"}
            <span className='text-xs'>Enter</span>
          </span>
        </TooltipTrigger>
        <TooltipContent>
          Press {modifierKey} + Enter {message} to submit
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CmdCtrlButton;
