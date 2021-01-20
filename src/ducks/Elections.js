import firebase from 'firebase';
import { createActionTypes } from '@/utils/actions';
import { Alert } from '@/components';

// Handle all things related to Elections
const ACTIONS = createActionTypes([
	'OPEN_ELECTION',
	'CLOSE_ELECTION',
	'OPEN_APPLICATIONS',
	'CLOSE_APPLICATIONS',
	'CANDIDATE_ID_CHANGED',
	'ADD_POSITION',
	'DELETE_POSITION',
	'EDIT_POSITION',
	'ADD_APPLICATION',
	'CHANGE_POSITION',
	'APPROVE_APPLICATION',
	'DELETE_APPLICATION',
	'EDIT_CANDIDATES',
	'CANDIDATE_FNAME_CHANGED',
	'CANDIDATE_LNAME_CHANGED',
	'CANDIDATE_PLAN_CHANGED',
	'CANDIDATE_POSITION_CHANGED',
	'POSITION_TITLE_CHANGED',
	'POSITION_DESCRIPTION_CHANGED',
	'GET_POSITIONS',
	'GET_VOTES',
	'UPDATE_ELECTION',
	'PAGE_LOAD'
]);

const INITIAL_STATE = {
	election: false,
	apply: false,
	numOfVotes: 0,
	candidateFName: '',
	candidateId: '',
	candidateLName: '',
	candidatePosition: '',
	candidatePlan: '',
	positionTitle: '',
	positionDescription: '',
	title: 'ADD',
	positions: [],
	applyPosition: '',
	approved: false,
	votes: []
};

export default (state = INITIAL_STATE, action) => {
	const {
		payload
	} = action;

	switch (action.type) {
		case ACTIONS.OPEN_ELECTION:
			return {
				...state,
				election: payload
			};
		case ACTIONS.CLOSE_ELECTION:
			return {
				...state,
				election: payload
			};
		case ACTIONS.OPEN_APPLICATIONS:
			return {
				...state,
				apply: payload
			};
		case ACTIONS.CLOSE_APPLICATIONS:
			return {
				...state,
				apply: payload
			};
		case ACTIONS.CANDIDATE_ID_CHANGED:
			return {
				...state,
				candidateId: payload
			};
		case ACTIONS.APPROVE_APPLICATION:
			return state;

		case ACTIONS.ADD_APPLICATION:
			return state;

		case ACTIONS.DELETE_POSITION:
			return {
				...state,
				positionTitle: '',
				positionDescription: ''
			};
		case ACTIONS.EDIT_POSITION:
			return state;
		case ACTIONS.DELETE_APPLICATION:
			return {
				...state,
				candidateFName: '',
				candidateName: '',
				candidatePlan: '',
				candidatePosition: ''
			};
		case ACTIONS.EDIT_CANDIDATES:
			return state;
		case ACTIONS.CANDIDATE_FNAME_CHANGED:
			return {
				...state,
				candidateFName: payload
			};
		case ACTIONS.CANDIDATE_LNAME_CHANGED:
			return {
				...state,
				candidateLName: payload
			};
		case ACTIONS.CANDIDATE_PLAN_CHANGED:
			return {
				...state,
				candidatePlan: payload
			};
		case ACTIONS.CANDIDATE_POSITION_CHANGED:
			return {
				...state,
				candidatePosition: payload
			};
		case ACTIONS.POSITION_TITLE_CHANGED:
			return {
				...state,
				positionTitle: payload
			};
		case ACTIONS.POSITION_DESCRIPTION_CHANGED:
			return {
				...state,
				positionDescription: payload
			};
		case ACTIONS.CHANGE_POSITION:
			return {
				...state,
				applyPosition: payload
			};
		case ACTIONS.GET_POSITIONS:
			return {
				...state,
				positions: payload
			};
		case ACTIONS.GET_VOTES:
			return {
				...state,
				votes: payload
			};
		case ACTIONS.UPDATE_ELECTION:
			return {
				...state,
				apply: payload.apply,
				election: payload.election,
				numOfVotes: payload.votes
			};
		default:
			return state;
	}
};

export const openElection = () => {
	return () => {
		firebase.database().ref('/election/votes/').once('value', snapshot => {
			firebase.database().ref('/election/').update({
				votes: snapshot.val() ? snapshot.val() : 0,
				election: true
			})
				.then(() => Alert.alert('Election Started!', { type: 'success', title: 'Successful' }))
				.catch(() => Alert.alert('Election could not be Started!', { type: 'error', title: 'Failure' }));
		});
	};
};

export const closeElection = () => {
	return (dispatch) => {
		firebase.database().ref('/election/').update({
			election: false
		})
			.then(() => {
				dispatch({
					type: ACTIONS.CLOSE_ELECTION,
					payload: false
				});
			})
			.then(() => Alert.alert('Election Closed!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Election could not be Closed!', { type: 'error', title: 'Failure' }));
	};
};

export const openApplications = () => {
	return (dispatch) => {
		firebase.database().ref('/election/').update({
			apply: true
		})
			.then(() => {
				dispatch({
					type: ACTIONS.OPEN_APPLICATIONS,
					payload: true
				});
			})
			.then(() => Alert.alert('Applications Started!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Applications could not be Started!', { type: 'error', title: 'Failure' }));
	};
};

export const closeApplications = () => {
	return (dispatch) => {
		firebase.database().ref('/election/').update({
			apply: false
		})
			.then(() => {
				dispatch({
					type: ACTIONS.CLOSE_APPLICATIONS,
					payload: false
				});
			})
			.then(() => Alert.alert('Applications Closed!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Applications could not be Closed!', { type: 'error', title: 'Failure' }));
	};
};

export const addPosition = (title, description, length) => {
	return () => {
		firebase.database().ref(`/election/positions/${title}`).set({
			title: title,
			description: description,
			level: length
		})
			.then(() => Alert.alert('Position Added!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Position could not be Added!', { type: 'error', title: 'Failure' }));
	};
};

export const updateElection = () => {
	return (dispatch) => {
		firebase.database().ref('/election/')
			.on('value', snapshot => {
				if (snapshot.exists()) {
					const info = snapshot.val();

					dispatch({
						type: ACTIONS.UPDATE_ELECTION,
						payload: info
					});
				}
			});
	};
};

export const deletePosition = (text) => {
	return (dispatch) => {
		firebase.database().ref(`/election/positions/${text}`).remove()
			.then(() => {
				dispatch({
					type: ACTIONS.DELETE_POSITION
				});
			})
			.then(() => Alert.alert('Position Deleted!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Position could not be deleted!', { type: 'error', title: 'Failure' }));
	};
};

export const editPosition = (title, description, oldTitle) => {
	if (oldTitle) {
		let level;

		firebase.database().ref(`/election/positions/${oldTitle}/level`).once('value', snapshot => {
			level = snapshot.val();
		});

		return (dispatch) => {
			firebase.database().ref(`/election/positions/${oldTitle}`).remove()
				.then(() => {
					dispatch({
						type: ACTIONS.DELETE_POSITION
					});
				})
				.then(() => firebase.database().ref(`/election/positions/${title}`).set({
					title: title,
					description: description,
					level: level
				}))
				.then(() => Alert.alert('Position edited!', { type: 'success', title: 'Successful' }))
				.catch(() => Alert.alert('Position could not be edited!', { type: 'error', title: 'Failure' }));
		};
	}
	else {
		return (dispatch) => {
			firebase.database().ref(`/election/positions/${title}`).update({
				title: title,
				description: description
			})
				.then(() => {
					dispatch({
						type: ACTIONS.EDIT_POSITION
					});
				})
				.then(() => Alert.alert('Position edited!', { type: 'success', title: 'Successful' }))
				.catch(() => Alert.alert('Position could not be edited!', { type: 'error', title: 'Failure' }));
		};
	}
};

export const addApplication = (fName, lName, plans, position, picture) => {
	const {
		uid
	} = firebase.auth().currentUser;

	firebase.database().ref(`/election/positions/${position}/candidates/${uid}`).set({
		firstName: fName,
		lastName: lName,
		plan: plans,
		id: uid,
		position: position,
		picture: picture,
		approved: false
	})
		.then(() => firebase.database().ref(`/users/${uid}/applied/`).set(true))
		.then(() => Alert.alert('Application added!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Application could not be added!', { type: 'error', title: 'Failure' }));
};

export const editApplication = ({ plan, position, picture, firstName, lastName }) => {
	const {
		uid
	} = firebase.auth().currentUser;

	firebase.database().ref(`/election/positions/${position}/candidates/${uid}`).update({
		 plan,
		 picture,
		 firstName,
		 lastName
	})
		.then(() => Alert.alert('Candidate edited!', { type: 'success', title: 'Successful' }))
		.catch((error) => {
			console.error(error);
			Alert.alert('Candidate could not be edited!', { type: 'error', title: 'Failure' });
		});
};

export const approveApplication = (position, candidateId, fName, lName) => {
	return (dispatch) => {
		// this needs to find the person but it needs to check for duplicates somehow

		// Alert.alert(candidateId);
		firebase.database().ref(`/election/positions/${position}/candidates/${candidateId}`).update({
			approved: true
		})
			.then(() => {
				firebase.database().ref(`/voting/${position}/${candidateId}`).set({
					votes: 0,
					firstName: fName,
					lastName: lName

				});
			})
			.then(() => {
				dispatch({
					type: ACTIONS.APPROVE_APPLICATION
				});
			})
			.then(() => Alert.alert('Candidate Approved!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Candidate could not be Approved!', { type: 'error', title: 'Failure' }));
	};
};

export const deleteApplication = (position, candidateId) => {
	return (dispatch) => {
		// this needs to find the person but it needs to check for duplicates somehow

		// Alert.alert(candidateId);
		firebase.database().ref(`/election/positions/${position}/candidates/${candidateId}`).remove()
			.then(() => {
				dispatch({
					type: ACTIONS.DELETE_APPLICATION
				});
			})
			.then(() => firebase.database().ref(`/users/${candidateId}`).update({
				applied: false
			}))
			.then(() => firebase.database().ref(`/voting/${position}/${candidateId}`).remove())
			.then(() => Alert.alert('Candidate Removed!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Candidate could not be removed!', { type: 'error', title: 'Failure' }));
	};
};

export const editCandidates = () => {
	return {
		type: ACTIONS.EDIT_CANDIDATES
	};
};

export const candidateIdChanged = (text) => {
	return {
		type: ACTIONS.CANDIDATE_ID_CHANGED,
		payload: text
	};
};

export const candidateFNameChanged = (text) => {
	return {
		type: ACTIONS.CANDIDATE_FNAME_CHANGED,
		payload: text
	};
};

export const candidateLNameChanged = (text) => {
	return {
		type: ACTIONS.CANDIDATE_LNAME_CHANGED,
		payload: text
	};
};

export const candidatePlanChanged = (text) => {
	return {
		type: ACTIONS.CANDIDATE_PLAN_CHANGED,
		payload: text
	};
};

export const candidatePositionChanged = (text) => {
	return {
		type: ACTIONS.CANDIDATE_POSITION_CHANGED,
		payload: text
	};
};

export const positionTitleChanged = (text) => {
	return {
		type: ACTIONS.POSITION_TITLE_CHANGED,
		payload: text
	};
};

export const positionDescriptionChanged = (text) => {
	return {
		type: ACTIONS.POSITION_DESCRIPTION_CHANGED,
		payload: text
	};
};

export const vote = (candidateObj) => {
	const {
		uid
	} = firebase.auth().currentUser;

	let votes;
	let candidateList = Object.entries(candidateObj);

	return () => {
		firebase.database().ref('/voting/').once('value', snapshot => {
			let obj = snapshot.val();

			candidateList.forEach(([position, candidateID]) => {
				obj[position][candidateID][uid] = true;
				obj[position][candidateID].votes = snapshot.val()[position][candidateID].votes + 1;
			});

			firebase.database().ref('/voting/').update(obj);
		})
			.then(() => firebase.database().ref('/election/votes').once('value', snapshot => {
				votes = parseInt(snapshot.val()) + 1;
				firebase.database().ref('/election/votes').set(votes);
			}))
			.then(() => firebase.database().ref(`/users/${uid}/voted/`).set(true))
			.then(() => Alert.alert('Vote cast!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Vote could not be cast!', { type: 'error', title: 'Failure' }));
	};
};

export const getPositions = () => {
	return (dispatch) => {
		firebase.database().ref('/election/positions')
			.on('value', snapshot => {
				const positions = snapshot.val();

				dispatch({
					type: ACTIONS.GET_POSITIONS,
					payload: positions
				});
			});
	};
};

export const changeLevels = (positions) => {
	return () => {
		firebase.database().ref('/election/').once('value', snapshot => {
			let obj = snapshot.val();

			positions.forEach(function (item, index) {
				obj.positions[item.position.title].level = index;
			});
			firebase.database().ref('/election/').update(obj);
		})
			.then(() => Alert.alert('Order Set!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Order could not be set!', { type: 'error', title: 'Failure' }));
	};
};

export const getVotes = () => {
	return (dispatch) => {
		firebase.database().ref('voting')
			.on('value', snapshot => {
				const votes = snapshot.val();

				dispatch({
					type: ACTIONS.GET_VOTES,
					payload: votes
				});
			});
	};
};