import util from 'util';
import * as childProcess from 'child_process';

/**
 * Asynchronous version of `child_process.exec`.
 */
export const execAsync = util.promisify(childProcess.exec);

/**
 * List of all the packages.
 */
export const packages = ['carta-md', 'plugin-katex'];
