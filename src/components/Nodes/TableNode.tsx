import { T_Column } from "../../types/tableColumns";
import ColumnNode from "./ColumnNode";

type TableNodeProps = {
  data: {
    tableName: string;
    columns: T_Column[];
  };
};

const TableNode: React.FC<TableNodeProps> = ({ data }) => {
  return (
    <div className="w-60 bg-White shadow-md rounded-md">
      <div className="text-lg font-bold bg-Blue text-White text-center py-2 rounded-t-md">
        {data.tableName}
      </div>
      <div className="">
        {data.columns.map((column, index) => (
          <div
            key={column.name}
            className={`${index % 2 !== 0 ? "bg-Gray" : "bg-White"} ${
              index === data.columns.length - 1
                ? "rounded-b-md"
                : "border-b border-gray-300"
            } hover:bg-Blue/20`}
          >
            <ColumnNode column={column} tableName={data.tableName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableNode;
