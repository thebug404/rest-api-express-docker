export type Query = Record<string, unknown>

export type Id = string | number

export interface ServiceMethods<T = unknown> {
  list(query?: Query): Promise<T[]>
  get(id: Id, query?: Query): Promise<T | null | undefined>
  create(data: T, query?: Query): Promise<T>
  patch(id: Id, data: T, query?: Query): Promise<T>
  remove(id: Id, query?: Query): Promise<T>
}
