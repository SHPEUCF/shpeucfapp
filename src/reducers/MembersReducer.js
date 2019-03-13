// handle all things related to data for all members
import {
  FIRST_NAME_CHANGED_MEMBER,
  LAST_NAME_CHANGED_MEMBER,
  EMAIL_CHANGED_MEMBER,
  COLLEGE_CHANGED_MEMBER,
  MAJOR_CHANGED_MEMBER,
  POINTS_CHANGED_MEMBER,
  PRIVILEGE_CHANGED_MEMBER,
  PICTURE_CHANGED_MEMBER,
  PASSWORD_CHANGED_MEMBER,
  CONFIRM_PASSWORD_CHANGED_MEMBER,
  FETCH_MEMBERS_POINTS,
  FETCH_MEMBER_PROFILE,
  QUOTE_CHANGED_MEMBER,
  EDIT_MEMBER,
  GO_TO_OTHER_PROFILE,
  GO_TO_EDIT_OTHER_PROFILE_FORM,
  FETCH_FILTERS,
  FETCH_ALL_USERS,
  NATIONALITY_CHANGED_MEMBER,
  DATE_BIRTH_CHANGED_MEMBER,
} from '../actions/types';

const INITIAL_STATE = {
  membersPoints: [],
  firstName: '',
  lastName: '',
  email: '',
  college: '',
  major: '',
  quote: '',
  // Using URL below to avoid RN warning of empty source.uri as there's a delay fetching.
  // Will improve fetching later, just need to get rid of the warning for now.
  picture: 'https://cdn0.iconfinder.com/data/icons/superuser-web-kit/512/686909-user_people_man_human_head_person-512.png',
  points: 0,
  privilege: {},
  password: '',
  confirmPassword: '',
  nationality: '',
  date_of_birth: '',
  user: null,
  loggedIn: null,
  loading: false,
  error: '',
  id: '',
  filters: {},
  userList: {}
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;

  switch (action.type) {
    case FIRST_NAME_CHANGED_MEMBER:
      return { ...state,
        firstName: payload
      };
    case LAST_NAME_CHANGED_MEMBER:
      return { ...state,
        lastName: payload
      };
    case EMAIL_CHANGED_MEMBER:
      return { ...state,
        email: payload
      };
    case COLLEGE_CHANGED_MEMBER:
      return { ...state,
        college: payload
      };
    case MAJOR_CHANGED_MEMBER:
      return { ...state,
        major: payload
      };
    case PASSWORD_CHANGED_MEMBER:
      return { ...state,
        password: payload
      };
    case POINTS_CHANGED_MEMBER:
      return { ...state,
        points: payload
      };
    case PRIVILEGE_CHANGED_MEMBER:
      return { ...state,
        privilege: payload
      };
    case PICTURE_CHANGED_MEMBER:
      return { ...state,
        picture: payload
      };
      case NATIONALITY_CHANGED_MEMBER:
      return { ...state,
        nationality: payload
      };
      case DATE_BIRTH_CHANGED_MEMBER:
      return { ...state,
        date_of_birth: payload
      };
    case CONFIRM_PASSWORD_CHANGED_MEMBER:
      return { ...state,
        confirmPassword: payload
      };
    case QUOTE_CHANGED_MEMBER:
      return { ...state,
        quote: payload
     };
    case FETCH_MEMBERS_POINTS:
      return { ...state,
        membersPoints: payload,
      }
    case FETCH_FILTERS:
      return { ...state,
        filters: payload,
      }
    default:
      return state;
    case FETCH_MEMBER_PROFILE:
      return { ...state,
        ...INITIAL_STATE,
        firstName: payload.firstName,
        lastName: payload.lastName,
        college: payload.college,
        email: payload.email,
        major: payload.major,
        quote: payload.quote,
        points: payload.points,
        picture: payload.picture,
        nationality: payload.nationality,
        date_of_birth: payload.date_of_birth,
        privilege: payload.privilege,
      };
    case FETCH_ALL_USERS:
      return { ...state,
        userList: payload
      }
    case EDIT_MEMBER:
      return state;
    case GO_TO_OTHER_PROFILE:
      return state;
    case GO_TO_EDIT_OTHER_PROFILE_FORM:
      return state;
  }
};
