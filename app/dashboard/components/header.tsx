'use client'
// React
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

// Components
import { CgMenuGridR } from "react-icons/cg";
import { IoChevronDownOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Style
import './index.css'
import Avatar from "./avatar";

type Props = {};

export default function Header({}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenDropDown = (value: boolean) => {
    setIsOpen(value)
  }
  return (
    // Header
    <div className="p-2 border-b border-solid">
      <div className="flex items-center">
        <Button
          size={"icon"}
          className="hover:bg-background-neutral-hovered text-text-subtle"
          variant={"ghost"}
        >
          <CgMenuGridR className="text-[20px]" />
        </Button>
        {/* <h2 className="text-xl font-semibold p-1 text-text-subtle hover:bg-background-neutral-hovered">
          TrelloApp
        </h2> */}
        <div className="p-2 rounded cursor-pointer hover:bg-background-neutral-hovered">
        <div className="logo" />        
        </div>
        <DropdownMenu onOpenChange={handleOpenDropDown}>
          <DropdownMenuTrigger className={`gap-1 p-[6px] px-4 rounded flex items-center font-medium text-text-subtle text-sm hover:bg-background-neutral-hovered ${isOpen ? 'bg-background-selected-hovered text-text-selected' : ''}`}>
            Các Không gian làm việc
            <IoChevronDownOutline className="text-base" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0 w-[304px]" align="start">
            <h2 className="text-[12px] pb-2 pt-4 px-5 font-medium">Các Không gian làm việc của bạn </h2>
            <DropdownMenuLabel className="flex items-center gap-3 text-text-subtle font-medium p-2 mb-1 mx-3 cursor-pointer rounded hover:bg-background-neutral-hovered">
              <Avatar width={40} height={40} />
              Trello Không gian làm việc
            </DropdownMenuLabel>          
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
