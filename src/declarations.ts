export interface ServiceMethods<T = unknown> {
  list(): Promise<T[]>
}
