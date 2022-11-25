// this typescript helpers file
export type CheckArray<T> = T extends any[] ? T[number] : T;
export type PartialObject<T> = T extends object ? Partial<T> : T;

export type SubType<Base, Condition> = Pick<
  Base,
  {
    [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
  }[keyof Base]
>;

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

export type RecursiveObjectType<T, D extends number = 10> = [D] extends [never]
  ? never
  : T extends object
  ? {
      [K in keyof T]-?: K extends string | number
        ? `${K}` | Join<K, RecursiveObjectType<T[K]>>
        : never;
    }[keyof T]
  : "";

export enum RequestType {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  PATCH = "patch",
}

export interface IEmpty {
  [key: string]: any;
  [key: number]: any;
}
