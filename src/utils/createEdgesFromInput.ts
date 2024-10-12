import { Edge, Node } from "@xyflow/react";

export const createEdgesFromSchemaInput = (
  nodes: Node[],
  schema: string
): Edge[] => {
  const lines = schema
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);
  const edges: Edge[] = [];
  let currentTable: string | null = null;

  lines.forEach((line) => {
    if (line.startsWith("Table")) {
      const tableName = line.match(/Table (\w+)\s*\{/)?.[1];
      if (tableName) {
        currentTable = tableName;
      }
    } else if (currentTable && line.includes("> ref")) {
      // Detect foreign key reference in the current table
      const columnMatch = line.match(/(\w+)\s+\w+\s*>\s*ref\s+(\w+)\.(\w+)/);
      if (columnMatch) {
        const sourceColumnName = columnMatch[1];
        const targetTableName = columnMatch[2];
        const targetColumnName = columnMatch[3];

        // Create the edge
        const edge: Edge = {
          id: `e-${currentTable}-${sourceColumnName}-${targetTableName}-${targetColumnName}`,
          source: currentTable,
          target: targetTableName,
          sourceHandle: `${currentTable}-${sourceColumnName}-source`,
          targetHandle: `${targetTableName}-${targetColumnName}-target`,
          type: "smoothstep",
          animated: true,
        };

        nodes
          .filter((node: Node) => node.data.tableName === targetTableName)
          .forEach((table: Node) => {
            // @ts-ignore
            table.data.columns
              .filter((column: any) => column.name === targetColumnName)
              .map((column: any) => (column.hasConnection = true));
          });

        // Push edge to the array
        edges.push(edge);
      }
    }
  });

  return edges;
};
