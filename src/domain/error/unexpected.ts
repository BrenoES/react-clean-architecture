export class UnexpectedError extends Error {
  constructor() {
    super('Algo de errado acontenceu. Tente novamente em breve.')
    this.name = 'UnexpectedError'
  }
}
