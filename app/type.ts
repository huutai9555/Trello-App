export type ColumnType = {
    id: string;
    title: string;
    taskIds: string[];
  };
  export type TaskContent = {
    type: string;
    content: string;
  };
  
  
  export type TaskType = {
    id: string;
    content: TaskContent[];
  };
  
  export type InitialDataType = {
    tasks: {
      [index: string]: TaskType;
    };
    columns: {
      [index: string]: ColumnType;
    };
    columnOrder: string[];
  };
  
