import { Node } from "@xyflow/react";
import { T_Column } from "../types/tableColumns";

interface I_Table {
  id: string;
  type: string;
  data: {
    tableName: string;
    columns: T_Column[];
  };
  position: { x: number; y: number };
}

export const createNodesFromSchemaInput = (schema: string): Node[] => {
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
