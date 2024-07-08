import { Template } from "./types";

export abstract class ComponentBuilder {
  private readonly _fullName: string;

  protected constructor(fullName: string) {
    this._fullName = fullName;
  }

  public getFullName(): string {
    return this._fullName;
  }

  public abstract createTemplates(): Template[];
}
