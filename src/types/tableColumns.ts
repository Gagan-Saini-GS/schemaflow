export type T_Column = {
  name: string;
  type: string;
  length?: number;
  isPrimaryKey?: boolean;
  constraints?: string[];
  defaultValue?: string;
  note?: string;
  hasConnection: boolean;
};

export type T_Enum = {
  value: string;
  note?: string;
};
