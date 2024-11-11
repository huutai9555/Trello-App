// React
import React, { useState } from "react";

// Types
import { ColumnType, InitialDataType, TaskType } from "@/app/type";

// Component
import {
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { v4 as uuidv4 } from "uuid";
import { cloneDeep } from "lodash";
import { Textarea } from "@/components/ui/textarea";
import Task from "./task";
import { Input } from "@/components/ui/input";

type StateProps = {
  state: InitialDataType;
  setState: (data: InitialDataType) => void;
};

type Props = {
  column: ColumnType;
  tasks: TaskType[];
  index: number;
  stateProp: StateProps;
};

export default function Column(props: Props) {
  const [showInput, setShowInput] = useState(false);
  const [textareaValue, setTextareaValue] = useState("");
  const [inputValue, setInputValue] = useState(props.column.title);
  const [isEdit, setIsEdit] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided: DraggableProvided) => {
        return (
          <div
            className="w-[300px] flex-none bg-slate-50	 border border-solid rounded flex flex-col h-fit max-h-full"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {isEdit && (
              <div className="p-2">
                <Input
                  className="text-base"
                  value={inputValue}
                  autoFocus
                  onChange={handleChange}
                  onBlur={() => {
                    setIsEdit(false);
                    const cloneData = cloneDeep(props.stateProp.state);
                    cloneData.columns[props.column.id].title = inputValue;
                    props.stateProp.setState(cloneData);
                  }}
                />
              </div>
            )}
            <h3
              className={`py-[13px] px-[23px] break-words ${isEdit && "hidden"}`}
              {...provided.dragHandleProps}
              onClick={() => {
                setIsEdit(true);
              }}
            >
              {props.column.title}
            </h3>
            <Droppable droppableId={props.column.id}>
              {(
                provided: DroppableProvided,
                snapshot: DroppableStateSnapshot
              ) => {
                return (
                  <div
                    className={`p-2 flex-1 overflow-y-scroll`}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {props.tasks.map((task, index) => (
                      <Task key={task.id} task={task} index={index} />
                    ))}
                    {showInput && (
                      <Textarea
                        value={textareaValue}
                        onChange={(event) => {
                          setTextareaValue(event.target.value);
                        }}
                      />
                    )}
                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
            <div className="p-2 flex">
              <Button
                className="justify-start grow items-center gap-1"
                variant={"ghost"}
                onClick={() => {
                  if (!showInput) {
                    setShowInput(true);
                    return;
                  }
                  const stateClone = cloneDeep(props.stateProp.state);
                  const newId = uuidv4();
                  stateClone.tasks[newId] = {
                    id: newId,
                    content: [
                      {
                        type: "text",
                        content: textareaValue,
                      },
                    ],
                  };
                  stateClone.columns[props.column.id].taskIds.push(newId);
                  props.stateProp.setState(stateClone);
                  setTextareaValue("");
                  setShowInput(false);
                }}
              >
                <PlusIcon />
                Thêm Thẻ
              </Button>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
