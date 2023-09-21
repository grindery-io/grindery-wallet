export type Workflow = {
  key?: any;
  title: string;
  trigger: Operation;
  actions: Operation[];
  creator: string;
  state?: any;
  source?: string;
};

export type Operation = {
  type: "action" | "trigger";
  connector: string;
  operation: string;
  input: { [key: string]: any };
  display?: { [key: string]: string };
  authentication?: string;
  credentials?: { [key: string]: string | number | boolean };
};
