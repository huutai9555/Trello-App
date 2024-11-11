import React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { TaskType } from "@/app/type";
import useHandleTaskContent from "@/app/hooks/useHandleTaskContent";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "@/components/ui/button";

type Props = {
  task: TaskType;
  index: number;
};

export default function Task(props: Props) {
  const { renderTaskContent } = useHandleTaskContent();
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(
        provided: DraggableProvided,
        snapshot: DraggableStateSnapshot,
        rubic: DraggableRubric
      ) => {
        return (
          <div
            className="border bg-white rounded border-solid border-l-gray-200 mb-2 group shadow-lg relative"
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {/* {props.task.content} */}
            {renderTaskContent(props.task.content)}
            <Button size={'icon'} variant={'ghost'} className="rounded-full hidden bg-white shadow-lg group-hover:flex absolute top-[3px] right-[5px]  items-center justify-center">
              <MdOutlineEdit />
            </Button>
          </div>
        );
      }}
    </Draggable>
  );
}
