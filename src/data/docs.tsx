import { ReactNode } from "react";
import { FaUnderline } from "react-icons/fa";
import { FaRegNoteSticky } from "react-icons/fa6";
import { MdDoNotDisturbAlt, MdOutlineKey } from "react-icons/md";

type T_Docs = {
  id: string;
  title: string;
  description: string[];
  code: string;
  example: string;
};

type T_Symbol = {
  label: string;
  value: string;
  symbol: string | ReactNode;
};

type T_NodeStyle = {
  id: string;
  type: string;
  boxColor: string;
};

export const docs: T_Docs[] = [
  {
    id: "tables",
    title: "How to create Tables?",
    description: [
      "TableName, Replace it with the name of the table you want to create. A table will contain columns that define its structure.",
    ],
    code: `Table TableName {
        
}`,
    example: `Table Users {
    id int,
    name string,
    email string,
}`,
  },
  {
    id: "columns",
    title: "How to Create Columns?",
    description: [
      "Columns are defined within a table, and each column has a name and a data type.",
    ],
    code: `column_name data_type`,
    example: `Table Users {
    id int,
    name string,
    email string,
}`,
  },
  {
    id: "primary_key",
    title: "How to mark a column as Primary Key?",
    description: [
      "To mark a column as a primary key, add [primary_key] after the column definition.",
    ],
    code: `column_name data_type [primary_key]`,
    example: `Table Users {
    id int [primary_key],
    name string,
    email string,
}`,
  },
  {
    id: "foreign_key",
    title: "How to Mark Relations Using Foreign Key?",
    description: [
      "To define a relationship between tables, you can use the foreign key syntax. Use the '> ref' operator to reference a column from another table.",
    ],
    code: `column_name data_type > ref target_table.target_column`,
    example: `Table Posts {
    id int [primary_key],
    title string,
    user_id int > ref Users.id,
}`,
  },
  {
    id: "constraints",
    title: "How to Use Constraints (UNIQUE, NOT NULL)?",
    description: [
      "Constraints add rules to columns, ensuring that the data follows specific conditions.",
      "UNIQUE: Ensures all values in the column are distinct.",
      "NOT NULL: Ensures the column must have a value (cannot be left empty).",
    ],
    code: `column_name data_type [UNIQUE, NOT NULL]`,
    example: `Table Users {
    id int [primary_key],
    name string [NOT NULL],
    email string [UNIQUE, NOT NULL],
}`,
  },
  {
    id: "maximum_length",
    title: "How to Set Maximum Length to Columns?",
    description: [
      "You can specify the maximum length of a string or varchar type column by adding the length in square brackets after the data type.",
    ],
    code: `column_name string [length]`,
    example: `Table Users {
    id int [primary_key],
    name string [100],
    email varchar [150, NOT NULL],
}`,
  },
  {
    id: "default_value",
    title: "How to Give a DEFAULT Value to a Column?",
    description: [
      "You can assign a default value to a column by using the DEFAULT keyword in square brackets.",
    ],
    code: `column_name data_type [DEFAULT=default_value]`,
    example: `Table Users {
    id int [primary_key],
    created_at Date [DEFAULT="Date.now()"],
}`,
  },
  {
    id: "notes",
    title: "How to Add a NOTE to a Column?",
    description: [
      "You can add additional information to any column using the NOTE keyword in square brackets.",
    ],
    code: `column_name data_type [NOTE="some note here"]`,
    example: `Table Users {
    id int [primary_key, NOTE="Unique identifier for each user."],
    email string [UNIQUE],
}`,
  },
  {
    id: "enums",
    title: "How to create Enum?",
    description: [
      "EnumName, Replace it with the name of the Enum you want to create. A Enum will contain columns that define its structure.",
      "Give all the values in enum in different line and each line ends with comma.",
    ],
    code: `Enum EnumName {
        
}`,
    example: `Enum UserStatus{
    online,
    offline,
    available,
}`,
  },
  {
    id: "enum-notes",
    title: "How to Add a NOTE to an Enum?",
    description: [
      "You can add additional information to any column using the NOTE keyword in square brackets.",
    ],
    code: `column_name EnumName [NOTE="some note here"]`,
    example: `Enum UserStatus{
    online,
    offline,
    available,
    do_not_distrub [Note="DND"],
    on_leave [Note="Holiday"],
}`,
  },
];

export const symbols: T_Symbol[] = [
  {
    label: "Primary Key",
    value: "Marks a column as the primary key.",
    symbol: <MdOutlineKey className="w-4 h-4" />,
  },
  {
    label: "Length",
    value: "Sets the maximum length for a string column.",
    symbol: "[Length]",
  },
  {
    label: "UNIQUE",
    value: "Ensures column values are unique.",
    symbol: <FaUnderline className="w-4 h-4" />,
  },
  {
    label: "NOT NULL",
    value: "Ensures column values are not empty.",
    symbol: <MdDoNotDisturbAlt className="w-4 h-4 text-Red/80" />,
  },
  {
    label: "NOTE",
    value: "Adds a comment or explanation to a column.",
    symbol: <FaRegNoteSticky className="w-4 h-4" />,
  },
];

export const nodeStyles: T_NodeStyle[] = [
  {
    id: "table",
    type: "Table Node",
    boxColor: "bg-Blue",
  },
  {
    id: "enum",
    type: "Enum Node",
    boxColor: "bg-Coral",
  },
];
