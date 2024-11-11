import React from "react";
import { TaskContent } from "../type";
import Image from "next/image";

export default function useHandleTaskContent() {
  const handleTaskContent = (content: TaskContent) => {
     switch(content.type) {
          case 'text': {
             return <p className="p-2 break-words">{content.content}</p>
          };
          case 'image': {
            return <Image height={300} width={300} src={content.content} alt="" />
          }
      }
  }
  const renderTaskContent = (contentList: TaskContent[]) => {
    return contentList.map((contentItem: TaskContent, index) => {
      return handleTaskContent(contentItem)
    })
  }
  return {
    // handleTaskContent,
    renderTaskContent
  }
}
