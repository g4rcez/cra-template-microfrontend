type Nullable<T> = null | T;

type OmitKeys<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type ID = string | number;
