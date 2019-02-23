import firebase, { auth } from 'firebase';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';

import {
    PAGE_LOAD
} from './types';

export const pageLoad = () => {
  return {
    type: PAGE_LOAD,
    payload: true
  };
};
