/**
 * Copyright © 2021 Province of British Columbia
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { errorWithCode } from '@bcgov/common-nodejs-utils';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description check if it can be seen empty as a database field
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (value === 'undefined' || value === undefined) {
    return true;
  } else if (typeof value === 'object' && !Object.keys(value).length) {
    return true;
  }
  return false;
};

export const checkIfEmpty = (value: string | number | object, name: string, code: number) => {
  if (
    value === null ||
    value === 'undefined' ||
    value === undefined ||
    (typeof value !== 'number' && value === '') ||
    (typeof value === 'object' && !Object.keys(value).length)
  ) {
    throw errorWithCode(`'${name} is not set`, code);
  }
};

/**
 * @param {Number} timeout
 * @description delay timeout in milliseconds
 */
export const sleep = (timeout: number): Promise<void> => {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), timeout);
  });
};