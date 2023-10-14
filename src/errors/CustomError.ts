export class CustomError extends Error {
  statusCode: number;
  constructor(message: string, name: string, statusCode: number) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }

  serializeError() {
    return {
      statusCode: this.statusCode,
      name: this.name,
      messag: this.message,
    };
  }
}
