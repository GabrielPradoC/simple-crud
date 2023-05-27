export type TTupleToObject<T extends [string, any]> = { [key in T[0]]: Extract<T, [key, any]>[1] };
