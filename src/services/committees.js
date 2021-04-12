import firebase from 'firebase';
import { Alert } from '@/components';

export const getAllCommittees = update =>
	firebase.database().ref('/committees/').on('value', snapshot => update(snapshot.val()));

export const upsertCommittee = ({ title, description, chair, oldTitle, level }) => {
	const committeeStatus = oldTitle ? 'edited' : 'added';
	const updatedCommittee = { title, description, chair, level };

	if (!oldTitle) updatedCommittee.joinOpened = false;

	firebase.database().ref(`/committees/${title}`).update(updatedCommittee)
		.then(() => oldTitle && firebase.database().ref(`/committees/${oldTitle}`).remove())
		.then(() => Alert.alert(`Committee ${committeeStatus}!`, { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert(`Committee could not be ${committeeStatus}!`, { type: 'error', title: 'Failure' }));
};

export const deleteCommittee = ({ title: committeeTitle, chair }) => {
	firebase.database().ref(`/users/${chair.id}/board`).remove()
		.then(() => firebase.database().ref(`/privileges/${chair.id}/`).update({ board: false }))
		.then(() => firebase.database().ref(`/committees/${committeeTitle}`).remove())
		.then(() => Alert.alert('Committee deleted!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Committee could not be deleted!', { type: 'error', title: 'Failure' }));
};

export const changeLevelsCommittees = committees => {
	firebase.database().ref('committees').once('value', snapshot => {
		const committeesObject = snapshot.val();

		committees.forEach((committee, index) => committeesObject[committee.title].level = index);
		firebase.database().ref('/committees/').update(committeesObject);
	})
		.then(() => Alert.alert('Order set!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Order could not be set!', { type: 'error', title: 'Failure' }));
};

/*
 * export const pendingJoin = (committee, memberId) => {
 * 	firebase.database().ref(`/committees/${committee}/pendingMembers/`).update({ [memberId]: true })
 * 		.then(() => Alert.alert('Pending approval!', { type: 'success', title: 'Successful' }))
 * 		.catch(() => Alert.alert('Not successful!', { type: 'error', title: 'Failure' }));
 * };
 *
 * export const approveJoin = (committee, memberId, dateStr, board) => {
 * 	firebase.database().ref(`/committees/${committee}/joinedMembers/`).update({ [memberId]: true })
 * 		.then(() => firebase.database().ref(`points/${valId}/points`).once('value', snapshot => {
 * 			points = parseInt(snapshot.val()) + 3;
 * 			firebase.database().ref(`points/${valId}/points`).set(points)
 * 				.then(() => firebase.database().ref(`points/${valId}/breakdown/${committee}/`).push({
 * 					board,
 * 					points: 3,
 * 					name: 'Join Committee',
 * 					date: dateStr,
 * 					committee
 * 				}))
 * 				.then(() => firebase.database().ref(`users/${valId}/points`).set(points));
 * 		})
 * 			.then(() => Alert.alert('Member Approved!', { type: 'success', title: 'Successful' }))
 * 			.catch(() => Alert.alert('Member could not be Approved!', { type: 'error', title: 'Failure' }))
 * 		);
 * };
 *
 * export const deleteCommitteeMember = (committee, memberId, status) => {
 * 	firebase.database().ref(`/committees/${committee}/${status}Members/`).update({ [memberId]: null })
 * 		.then(() => Alert.alert('Member removed!', { type: 'success', title: 'Successful' }))
 * 		.catch(() => Alert.alert('Member could not be removed!', { type: 'error', title: 'Failure' }));
 * };
 *
 * export const openJoin = (committee, state) => {
 * 	const joinStatus = state ? 'opened' : 'closed';
 *
 * 	firebase.database().ref(`/committees/${committee}/`).update({ joinedOpened: state })
 * 		.then(() => Alert.alert(`Committee registration has been ${joinStatus}`, { type: 'success', title: 'Successful' }))
 * 		.catch(() => Alert.alert(`Committee registration could not be ${joinStatus}!`, { type: 'error', title: 'Failure' }));
 * };
 */