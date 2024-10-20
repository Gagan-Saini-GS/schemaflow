import { Node } from "@xyflow/react";
import { T_Column, T_Enum } from "../types/tableColumns";

interface I_Table {
  id: string;
  type: string;
  data: {
    tableName: string;
    columns: T_Column[];
  };
  position: { x: number; y: number };
}

interface I_Enum {
  id: string;
  type: string;
  data: {
    enumName: string;
    values: T_Enum[];
  };
  position: { x: number; y: number };
}

export const createNodesFromSchemaInput = (schema: string): Node[] => {
  const nodes: Node[] = [];
  const enums: I_Enum[] = [];

  const position = {
    x: 100,
    y: 100,
  };

  let currentTable: I_Table | null = null;
  let currentEnum: I_Enum | null = null;

  const lines = schema
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  lines.forEach((line) => {
    // Detect Enums
    if (line.startsWith("Enum")) {
      const enumName = line.match(/Enum (\w+)\s*\{/)?.[1];
      if (enumName) {
        currentEnum = {
          id: enumName,
          type: "EnumNode",
          data: {
            enumName,
            values: [],
          },
          position: { x: position.x, y: position.y },
        };
      }
    } else if (line.startsWith("Table")) {
      // Detect Tables
      const tableName = line.match(/Table (\w+)\s*\{/)?.[1];
      if (tableName) {
        currentTable = {
          id: tableName,
          type: "TableNode",
          data: {
            tableName,
            columns: [],
          },
          position: { x: position.x, y: position.y },
        };
      }
    } else if (line.startsWith("}")) {
      // Close Enum or Table Definition
      if (currentTable) {
        nodes.push(currentTable);
        position.x += 300;
        if (nodes.length % 3 === 0) {
          position.x = 100;
          position.y += 500;
        }
        currentTable = null;
      }
      if (currentEnum) {
        enums.push(currentEnum);
        position.x += 300;
        currentEnum = null;
      }
    } else if (currentTable) {
      const columnMatch = line.match(
        /(\w+)\s+(\w+)(\s*\[(.*?)\])?/ // Match column name, type, and optional constraints in []
      );

      if (columnMatch) {
        const columnName = columnMatch[1];
        const columnType = columnMatch[2];
        const columnOptions = columnMatch[4]; // Capture contents inside []

        const columnDetails: T_Column = {
          name: columnName,
          type: columnType,
          hasConnection: false, // Default to no connection
        };

        // Check for additional options like [primary_key], length, constraints
        if (columnOptions) {
          const options = columnOptions
            .split(",")
            .map((opt) => opt.trim().toLowerCase());

          // Handle Primary Key
          if (options.includes("primary_key")) {
            columnDetails.isPrimaryKey = true;
          }

          // Handle Length for strings/varchar
          const lengthMatch = options.find((opt) => /^\d+$/.test(opt));
          if (lengthMatch) {
            columnDetails.length = parseInt(lengthMatch);
          }

          // Handle Constraints (NOT NULL, UNIQUE, DEFAULT)
          // I converted everything to lowercase before checking to include both case (unique & UNIQUE...)
          const constraints = options.filter(
            (opt) => opt === "not null" || opt === "unique"
          );
          if (constraints.length > 0) {
            columnDetails.constraints = constraints;
          }

          // Handle Default Values
          const defaultMatch = options.find((opt) =>
            opt.startsWith("default=")
          );
          if (defaultMatch) {
            columnDetails.defaultValue = defaultMatch
              .split("=")[1]
              .replace(/"/g, "");
          }

          // Handle Note Value
          const noteMatch = options.find((opt) => opt.startsWith("note="));
          if (noteMatch) {
            columnDetails.note = noteMatch.split("=")[1].replace(/"/g, "");
          }
        }

        // Check for Foreign Key References (hasConnection)
        const hasReferenceMatch = line.match(/>\s*ref\s+(\w+)\.(\w+)/);
        if (hasReferenceMatch) {
          columnDetails.hasConnection = true;
        }

        currentTable.data.columns.push(columnDetails);
      }
    } else if (currentEnum) {
      // Process Enum Values
      const enumMatch = line.match(/(\w+)\s*(?:\[(.*?)\])?/);

      if (enumMatch) {
        const value = enumMatch[1];
        const enumOptions = enumMatch[2]; // Capture contents inside []

        const enumDetails: T_Enum = {
          value: value,
        };

        if (enumOptions) {
          const options = enumOptions
            .split(",")
            .map((opt) => opt.trim().toLowerCase());

          // Handle Note Value
          const noteMatch = options.find((opt) => opt.startsWith("note="));
          if (noteMatch) {
            enumDetails.note = noteMatch.split("=")[1].replace(/"/g, "");
          }
        }

        currentEnum.data.values.push(enumDetails);
      }
    }
  });

  return [...nodes, ...enums]; // Merge nodes and enums into the final array
};

export const createNodesFromSchemaInput2 = (schema: string): Node[] => {
  const nodes: Node[] = [];
  const position = { x: 100, y: 100 };

  let currentTable: I_Table | null = null;

  const lines = schema
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  lines.forEach((line) => {
    if (line.startsWith("Table")) {
      const tableName = line.match(/Table (\w+)\s*\{/)?.[1];
      if (tableName) {
        currentTable = {
          id: tableName,
          type: "TableNode",
          data: {
            tableName,
            columns: [],
          },
          position: { x: position.x, y: position.y },
        };
      }
    } else if (line.startsWith("}")) {
      if (currentTable) {
        nodes.push(currentTable);
        position.x += 300;
        if (nodes.length % 3 === 0) {
          position.x = 100;
          position.y += 400;
        }
        currentTable = null;
      }
    } else if (currentTable) {
      const columnMatch = line.match(
        /(\w+)\s+(\w+)(\s*\[(.*?)\])?/ // Match column name, type, and optional constraints in []
      );

      if (columnMatch) {
        const columnName = columnMatch[1];
        const columnType = columnMatch[2];
        const columnOptions = columnMatch[4]; // Capture contents inside []

        const columnDetails: T_Column = {
          name: columnName,
          type: columnType,
          hasConnection: false, // Default to no connection
        };

        // Check for additional options like [primary_key], length, constraints
        if (columnOptions) {
          const options = columnOptions
            .split(",")
            .map((opt) => opt.trim().toLowerCase());

          // Handle Primary Key
          if (options.includes("primary_key")) {
            columnDetails.isPrimaryKey = true;
          }

          // Handle Length for strings/varchar
          const lengthMatch = options.find((opt) => /^\d+$/.test(opt));
          if (lengthMatch) {
            columnDetails.length = parseInt(lengthMatch);
          }

          // Handle Constraints (NOT NULL, UNIQUE, DEFAULT)
          // I converted everything to lowercase before checking to include both case (unique & UNIQUE...)
          const constraints = options.filter(
            (opt) => opt === "not null" || opt === "unique"
          );
          if (constraints.length > 0) {
            columnDetails.constraints = constraints;
          }

          // Handle Default Values
          const defaultMatch = options.find((opt) =>
            opt.startsWith("default=")
          );
          if (defaultMatch) {
            columnDetails.defaultValue = defaultMatch
              .split("=")[1]
              .replace(/"/g, "");
          }

          // Handle Note Value
          const noteMatch = options.find((opt) => opt.startsWith("note="));
          if (noteMatch) {
            columnDetails.note = noteMatch.split("=")[1].replace(/"/g, "");
          }
        }

        // Check for Foreign Key References (hasConnection)
        const hasReferenceMatch = line.match(/>\s*ref\s+(\w+)\.(\w+)/);
        if (hasReferenceMatch) {
          columnDetails.hasConnection = true;
        }

        currentTable.data.columns.push(columnDetails);
      }
    }
  });

  return nodes;
};
