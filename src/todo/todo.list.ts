export interface IData {
  categoryId: number;
  category: string;
  tasks: ITask[];
}

export interface ITask {
  id: number;
  title: string;
  description: string;
  assignee: string;
  creator: string;
  createdAt: string;
  deletedAt: string;
}

export const DATA: IData[] = [
  {
    categoryId: 1,
    category: "Back Log",
    tasks: [
      {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        assignee: "Assignee 1",
        creator: "Creator 1",
        createdAt: "CreatedAt 1",
        deletedAt: "DeletedAt 1",
      },
      {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        assignee: "Assignee 2",
        creator: "Creator 2",
        createdAt: "CreatedAt 2",
        deletedAt: "DeletedAt 2",
      },

      {
        id: 5,
        title: "Task 5",
        description: "Description 5",
        assignee: "Assignee 5",
        creator: "Creator 5",
        createdAt: "CreatedAt 5",
        deletedAt: "DeletedAt 5",
      },
    ],
  },
  {
    categoryId: 2,
    category: "Todo",
    tasks: [
      {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        assignee: "Assignee 3",
        creator: "Creator 3",
        createdAt: "CreatedAt 3",
        deletedAt: "DeletedAt 3",
      },
    ],
  },
  {
    categoryId: 3,
    category: "In Progress",
    tasks: [
      {
        id: 4,
        title: "Task 4",
        description: "Description 4",
        assignee: "Assignee 4",
        creator: "Creator 4",
        createdAt: "CreatedAt 4",
        deletedAt: "DeletedAt 4",
      },
    ],
  },
  { categoryId: 4, category: "Done", tasks: [] },
];
