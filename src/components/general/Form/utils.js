import _ from 'lodash';

/**
 * Returns cloned object with null values of all keys.
 *
 * @param {Object} obj Object to be cloned.
 */

export const nullifyObjectValues = obj => _.deepCloneWith(obj, value => _.isObject(value) ? undefined : null);