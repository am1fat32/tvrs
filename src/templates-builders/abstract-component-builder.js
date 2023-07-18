export class AbstractComponentBuilder {
  constructor(fullName) {
    if (new.target === AbstractComponentBuilder) {
      throw new Error('Can\'t instantiate AbstractComponentBuilder as abstract class');
    }

    this._fullName = fullName;
  }

  getFullName() {
    return this._fullName;
  }

  createTemplates() {}
}
