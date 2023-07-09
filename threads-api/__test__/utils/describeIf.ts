export const describeIf = (condition: boolean) => (condition ? describe : describe.skip);
