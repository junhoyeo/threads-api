export * from './threads-api';
export * from './threads-types';

import program from './cli';
program.parse(process.argv);