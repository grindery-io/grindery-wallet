export type Connector = {
  key: string;
  name: string;
  version: string;
  platformVersion: string;
  triggers?: Trigger[];
  actions?: Action[];
  authentication?: Authentication;
  icon?: string;
  pricing?: string;
};

// Triggers

export type Trigger = {
  key: string;
  name: string;
  display: Display;
  operation?: TriggerOperation; // TODO: make required
};

export type TriggerOperation =
  | ChainEventOperation
  | HookOperation
  | PollingOperation;

export type ChainEventOperation = {
  type: string; //"blockchain:event"; // Can't use literals in JSON file: https://github.com/microsoft/TypeScript/issues/26552
  chains: Chain[];
  signature: string;
  filters: ChainEventOperationFilter;
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

export type ChainEventOperationFilter = {
  fromBlock?: string | number;
  toBlock?: string | number;
  address?: string | string[];
  topics?: string[];
};

export type HookOperation = {
  type: string; //"hook";
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

export type PollingOperation = {
  type: string; //"polling";
  operation?: Request; // TODO: make required
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

// End Triggers

// Actions

export type Action = {
  key: string;
  name: string;
  display: Display;
  operation?: ActionOperation; // TODO: make required
};

export type ActionOperation = ChainCallOperation | APICallOperation;

export type APICallOperation = {
  type: string; //"api";
  operation: Request;
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

export type ChainCallOperation = {
  type: string; //"blockchain:call";
  accounts?: ChainAccount[];
  signature?: string; // TODO: make required
  arguments?: ChainCallOperationArgs[]; // TODO: make required
  inputFields?: Field[];
  inputFieldProviderUrl?: string;
  outputFields?: Field[];
  sample?: { [key: string]: string | number | boolean | (string | number)[] };
};

export type ChainCallOperationArgs = {
  type: string;
  value: number | string;
};

// END Actions

// Authentication

export type Authentication = {
  type: string; //"basic" | "custom" | "digest" | "oauth1" | "oauth2" | "session";
  test: Request;
  fields?: Field[];
  label?: string | Request;
  oauth1Config?: AuthenticationOAuth1Config;
  oauth2Config?: AuthenticationOAuth2Config;
  sessionConfig?: AuthenticationSessionConfig;
};

export type AuthenticationOAuth1Config = {
  getRequestToken: Request;
  authorizeUrl: Request;
  getAccessToken: Request;
};

export type AuthenticationOAuth2Config = {
  authorizeUrl: Request;
  getAccessToken: Request;
  refreshAccessToken?: Request;
  codeParam?: string;
  scope?: string;
  autoRefresh?: boolean;
};

export type AuthenticationSessionConfig = {
  operation: Request;
};

// END Authentication

// Shared

export type Chain = string;

export type ChainAccount = string;

export type DID = string;

export type Display = {
  label: string;
  description: string;
  instructions?: string;
  icon?: string;
};

export type Field = {
  key: string;
  label?: string;
  helpText?: string;
  type?: string;
  /*| "string"
    | "text"
    | "integer"
    | "number"
    | "boolean"
    | "datetime"
    | "file"
    | "password"
    | "copy"
    | "code";*/
  required?: boolean;
  placeholder?: string;
  default?: string;
  choices?: FieldChoice[];
  list?: boolean;
  children?: Field[];
  dict?: boolean;
  computed?: boolean;
  updateFieldDefinition?: boolean;
  inputFormat?: string;
};

export type FieldChoice =
  | string
  | {
      value: string;
      label: string;
      sample: string;
    };

export type FieldProviderRequest = {
  inputFields: Field[];
};

export type Request = {
  method?: string; //"GET" | "PUT" | "POST" | "PATCH" | "DELETE" | "HEAD";
  url?: string;
  body?: null | string | object | (string | number | boolean | object)[];
  params?: { [key: string]: any };
  headers?: { [key: string]: any };
  auth?: string[] | object;
};

// END Shared
