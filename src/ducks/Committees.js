import { createActionTypes } from "../utils/actions";
import { Actions } from "react-native-router-flux";
import firebase from "firebase";
import { Alert } from "../components";

// handle all things related to Elections
const ACTIONS = createActionTypes([
	"GET_COMMITTEES",
	"GO_TO_COMMITTEE_FORM",
	"EDIT_COMMITTEE",
	"DELETE_COMMITTEE",
	"COMMITTEE_DESCRIPTION_CHANGED",
	"COMMITTEE_TITLE_CHANGED",
	"CHAIR_PERSON_CHANGED",
	"LOAD_COMMITTEE"
]);

const INITIAL_STATE = {
	committeesList: [],
	committeeEvents: {},
	title: "ADD",
	committeeTitle: "",
	committeeDescription: "",
	joinOpened: false,
	chair: {},
	pendingMembers: {},
	joinedMembers: {},
	links: {}
};

export default (state = INITIAL_STATE, action) => {
	const {
		payload
	} = action;

	switch (action.type) {
		case ACTIONS.GET_COMMITTEES:
			return {
				...state,
				committeesList: payload
			};
		case ACTIONS.GO_TO_COMMITTEE_FORM:
			return {
				...state,
				title: payload
			};
		case ACTIONS.DELETE_COMMITTEE:
			return {
				...state,
				chair: "",
				committeeTitle: "",
				committeeDescription: ""
			};
		case ACTIONS.COMMITTEE_TITLE_CHANGED:
			return {
				...state,
				committeeTitle: payload
			};
		case ACTIONS.COMMITTEE_DESCRIPTION_CHANGED:
			return {
				...state,
				committeeDescription: payload
			};
		case ACTIONS.CHAIR_PERSON_CHANGED:
			return {
				...state,
				chair: payload
			};
		case ACTIONS.EDIT_COMMITTEE:
			return state;
		case ACTIONS.LOAD_COMMITTEE:
			return {
				...state,
				committeeTitle: payload.title,
				committeeEvents: payload.events,
				chair: payload.chair,
				pendingMembers: payload.pendingMembers,
				joinedMembers: payload.joinedMembers,
				links: payload.links,
				joinOpened: payload.joinOpened
			};
		default:
			return state;
	}
};

export const getCommittees = () => {
	return (dispatch) => {
		firebase.database().ref("/committees/")
			.on("value", snapshot => {
				const committtees = snapshot.val();

				dispatch({
					type: ACTIONS.GET_COMMITTEES,
					payload: committtees
				});
			});
	};
};

export const goToCommitteeForm = (text) => {
	Actions.CommitteeForm();

	return {
		type: ACTIONS.GO_TO_COMMITTEE_FORM,
		payload: text
	};
};

export const addCommittee = (title, description, chair, length) => {
	return () => {
		firebase.database().ref(`/committees/${title}`).set({
			title: title,
			description: description,
			chair: chair,
			level: length,
			joinOpened: false
		})
			.then(() => Alert.alert("Committee Added!", { type: "success", title: "Successful" }))
			.catch(() => Alert.alert("Committee could not be Added!", { type: "error", title: "Failure" }));
	};
};

export const editCommittee = (title, description, chair, oldTitle) => {
	if (oldTitle)
		return (dispatch) => {
			let level;

			firebase.database().ref(`/committees/${oldTitle}/level`).once("value", snapshot => {
				level = snapshot.val();
				firebase.database().ref(`/committees/${oldTitle}`).remove()
					.then(() => {
						dispatch({
							type: ACTIONS.DELETE_COMMITTEE
						});
					})
					.then(() => firebase.database().ref(`/committees/${title}`).set({
						title: title,
						description: description,
						chair: chair,
						level: level
					}))
					.then(() => Alert.alert("Committee Edited!", { type: "success", title: "Successful" }))
					.catch(() => Alert.alert("Committee could not be Edited!", { type: "error", title: "Failure" }));
			});
		};
	else
		return (dispatch) => {
			firebase.database().ref(`/committees/${title}`).update({
				title: title,
				description: description,
				chair: chair
			})
				.then(() => {
					dispatch({
						type: ACTIONS.EDIT_COMMITTEE
					});
				})
				.then(() => Alert.alert("Committee Edited!", { type: "success", title: "Successful" }))
				.catch(() => Alert.alert("Committee could not be Edited!", { type: "error", title: "Failure" }));
		};
};

export const loadCommittee = (committee) => {
	return (dispatch) => {
		dispatch({
			type: ACTIONS.LOAD_COMMITTEE,
			payload: committee
		});
	};
};

export const deleteCommittee = (text, chair) => {
	return (dispatch) => {
		firebase.database().ref(`/users/${chair.id}/board`).remove()
			.then(() => firebase.database().ref(`/privileges/${chair.id}/`).update({
				board: false
			}));

		firebase.database().ref(`/committees/${text}`).remove()
			.then(() => {
				dispatch({
					type: ACTIONS.DELETE_COMMITTEE
				});
			})
			.then(() => Alert.alert("Committee Deleted!", { type: "success", title: "Successful" }))
			.catch(() => Alert.alert("Committee could not be deleted!", { type: "error", title: "Failure" }));
	};
};

export const committeeTitleChanged = (text) => {
	return {
		type: ACTIONS.COMMITTEE_TITLE_CHANGED,
		payload: text
	};
};

export const committeeDescriptionChanged = (text) => {
	return {
		type: ACTIONS.COMMITTEE_DESCRIPTION_CHANGED,
		payload: text
	};
};

export const chairPersonChanged = (person) => {
	return {
		type: ACTIONS.CHAIR_PERSON_CHANGED,
		payload: person
	};
};

export const changeLevelsCom = (committees) => {
	return () => {
		firebase.database().ref("/committees/").once("value", snapshot => {
			let obj = snapshot.val();

			committees.forEach(function(item, index) {
				obj[item.committee.title].level = index;
			});
			firebase.database().ref("/committees/").update(obj);
		})
			.then(() => Alert.alert("Order Set!", { type: "success", title: "Successful" }))
			.catch(() => Alert.alert("Order could not be set!", { type: "error", title: "Failure" }));
	};
};

// export const pendingJoin = (committee, memberId) => {
// 	return (dispatch) => {
// 		// this needs to find the person but it needs to check for duplicates somehow

// 		// Alert.alert(candidateId);
// 		firebase.database().ref(`/committees/${committee}/pendingMembers/`).update({
// 			[memberId]: true
// 		})
// 			.then(() => Alert.alert("Pending Approval!", { type: "success", title: "Successful" }))
// 			.catch(() => Alert.alert("Not successful!", { type: "error", title: "Failure" }));
// 	};
// };

// export const approveJoin = (committee, memberId, dateStr, board) => {
// 	return (dispatch) => {
// 		// this needs to find the person but it needs to check for duplicates somehow

// 		// Alert.alert(candidateId);
// 		firebase.database().ref(`/committees/${committee}/joinedMembers/`).update({
// 			[memberId]: true
// 		})
// 			.then(() => {
// 				firebase.database().ref(`points/${valId}/points`).once("value", snapshot => {
// 					points = parseInt(snapshot.val()) + 3;
// 					firebase.database().ref(`points/${valId}/points`).set(points)
// 						.then(() => firebase.database().ref(`points/${valId}/breakdown/${committee}/`).push({
// 							board: board,
// 							points: 3,
// 							name: "Join Committee",
// 							date: dateStr,
// 							committee: committee
// 						}))
// 						.then(() => firebase.database().ref(`users/${valId}/points`).set(points));
// 				})
// 					.then(() => Alert.alert("Member Approved!", { type: "success", title: "Successful" }))
// 					.catch(() => Alert.alert("Member could not be Approved!", { type: "error", title: "Failure" }));
// 			});
// 	};
// };

// export const deleteMemberFromCom = (committee, memberId, status) => {
// 	return (dispatch) => {
// 		// this needs to find the person but it needs to check for duplicates somehow

// 		// Alert.alert(candidateId);

// 		if (status === "pending")
// 			firebase.database().ref(`/committees/${committee}/pendingMembers/`).update({
// 				[memberId]: null
// 			})
// 				.then(() => Alert.alert("Member Removed!", { type: "success", title: "Successful" }))
// 				.catch(() => Alert.alert("Member could not be Removed!", { type: "error", title: "Failure" }));

// 		if (status === "joined")
// 			firebase.database().ref(`/committees/${committee}/joinedMembers/`).update({
// 				[memberId]: null
// 			})
// 				.then(() => Alert.alert("Member Removed!", { type: "success", title: "Successful" }))
// 				.catch(() => Alert.alert("Member could not be Removed!", { type: "error", title: "Failure" }));
// 	};
// };

// export const openJoin = (committee, state) => {
// 	return (dispatch) => {
// 		// this needs to find the person but it needs to check for duplicates somehow

// 		// Alert.alert(candidateId);

// 		if (state)
// 			firebase.database().ref(`/committees/${committee}/`).update({
// 				joinOpened: true
// 			})
// 				.then(() => Alert.alert("Committee registration has been opened!", { type: "success", title: "Successful" }))
// 				.catch(() => Alert.alert("Could not open committee registration!", { type: "error", title: "Failure" }));

// 		else
// 			firebase.database().ref(`/committees/${committee}/`).update({
// 				joinOpened: false
// 			})
// 				.then(() => Alert.alert("Committee registration has been closed!", { type: "success", title: "Successful" }))
// 				.catch(() => Alert.alert("Could not close committee registration!", { type: "error", title: "Failure" }));
// 	};
// };