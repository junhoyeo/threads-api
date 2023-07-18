// This type simplifies a complex type into an object literal for better readability.
export type Simplify<T> = {} & { [P in keyof T]: T[P] };

// This takes a union of object types and ensures all of them contain the same properties. This
// helps in strict enforcement of the following rule: The object provided by the user cannot be
// assignable to more than one of the allowed object types.
export type StrictUnion<T> = CombineUnion<T> extends infer U
  ? T extends any
    ? Simplify<T & { [K in Exclude<keyof U, keyof T>]?: undefined }>
    : never
  : never;

// This turns a union of object types into a single object type. Any property that doesn't exist in
// all of the objects will be optional. Any property that exists in all of the objects will have its
// optionality preserved.
export type CombineUnion<T> = Pick<T, keyof T> &
  Partial<(T extends any ? (x: T) => any : never) extends (x: infer U) => any ? U : never>;
