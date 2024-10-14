declare module "typewriter-effect/dist/core" {
    export default class Typewriter {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(element: HTMLElement, options?: any);
      typeString(string: string): Typewriter;
      start(): Typewriter;
      stop(): Typewriter;
      pauseFor(duration: number): Typewriter;
      deleteAll(): Typewriter;
      deleteChars(count: number): Typewriter;
      changeDelay(newDelay: number): Typewriter;
      
    }
  }
  declare interface CreateUserParams {
    name: string;
    email: string;
    phone: string;
  }