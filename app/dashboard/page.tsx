import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Avatar from "./components/avatar";
import Header from "./components/header";
import Todo from "./components/todo";

type Props = {};

export default function DashboardPage({}: Props) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[260px] overflow-hidden flex flex-col">
          <div className="flex py-2 px-3 items-center justify-between border-b border-solid">
            <Avatar width={32} height={32} />
            <div className="flex-1 overflow-scroll mx-1">
              <p className="text-sm font-medium text-nowrap">
                Trello Không gian làm việc
              </p>
              <span className="text-xs">Miễn Phí</span>
            </div>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="hover:bg-background-neutral-hovered"
            >
              <Image
                src={"https://trello.com/assets/58243262833f693f6101.svg"}
                alt=""
                width={28}
                height={28}
              />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="h-[1000px]"></div>
          </div>
          <h2>Settings</h2>
        </div>
        <div className="bg-red-200 flex-1 overflow-hidden flex flex-col">
          <div className="bg-blue-100 py-3 px-4">
            <h2 className="text-[18px] font-semibold">My first trello</h2>
          </div>
          <div className="flex-1 bg-slate-400 overflow-scroll flex gap-3">
           <Todo />
          </div>
        </div>
      </div>
    </div>
  );
}
