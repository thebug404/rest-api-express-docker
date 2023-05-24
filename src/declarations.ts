export interface Query {}

export interface ServiceMethods<T = unknown> {
  list(): Promise<T[]>
  create(data: T, query?: Query): Promise<T>
}
