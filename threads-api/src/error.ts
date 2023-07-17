export class ThreadsAPIError extends Error {
  data: any;

  constructor(message: string, data: any) {
      super(message);
      this.name = this.constructor.name;
      this.data = data;
  }
}