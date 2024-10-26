import { randomUUID } from "crypto"

export class BaseEntity<T> {
  private props: T
  private id: string

  constructor(props: T, id?: string) {
    this.props = props
    this.id = id || randomUUID()
  }

  get(key: "id"): string
  get(): T
  get<K extends keyof T>(key: K): T[K]
  get<K extends keyof T>(key?: K | "id"): T[K] | T | string {
    if (!key) return { ...this.props, id: this.id }
    if (key === "id") return this.id
    return this.props[key]
  }

  protected set<K extends keyof T>(key: K, value: T[K]): void {
    this.props[key] = value
  }
}