const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: [
        {
          type: "image",
          content:
            "https://thuviensach.vn/img/audio/comic/Berserk/img_03522.jpg?v=3.62",
        },
        {
          type: "text",
          content: "Take out the garbage",
        },
      ],
    },
    "task-2": {
      id: "task-2",
      content: [
        {
          type: "text",
          content: "Watch my favorite show",
        },
      ],
    },
    "task-3": {
      id: "task-3",
      content: [
        {
          type: "text",
          content: "Charge my phone",
        },
      ],
    },
    "task-4": {
      id: "task-4",
      content: [
        {
          type: "text",
          content: "Cook dinner",
        },
      ],
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "Done",
      taskIds: [],
    },
    "column-5": {
      id: "column-5",
      title: "Done",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"],
};

export default initialData;
