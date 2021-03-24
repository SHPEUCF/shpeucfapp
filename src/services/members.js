import firebase from 'firebase';
import { Alert } from '@/components';
import _ from 'lodash';

export const editMember = user => {
	const { firstName, lastName, points, id } = user;

	firebase.database().ref(`/users/${id}/`).update(user)
		.then(() => firebase.database().ref(`/points/${id}/`).update({
			firstName,
			lastName,
			points
		}))
		.then(() => firebase.database().ref(`/privileges/${id}/`).update({
			firstName,
			lastName,
			user: true,
			board: false,
			eboard: false,
			president: false
		}))
		.then(() => Alert.alert('Account Updated'));
};

export const assignPosition = (title, types, id, oldChair) => {
	if (oldChair) {
		firebase.database().ref(`/users/${oldChair.id}/${types}`).remove()
			.then(() => firebase.database().ref(`/privileges/${oldChair.id}/`).update({ [types]: false }));
	}

	firebase.database().ref(`/users/${id}/`).update({ [types]: title })
		.then(() => firebase.database().ref(`/privileges/${id}/`).update({ [types]: true }));
};

/*
 *members: should have list of IDs -> Array<String>
 *privilegeChanged: should have the privilege type that should be changed -> string
 *value: Value that privilege should be changed to -> boolean
 */

export const changePrivilegeOfMembers = (members, privilegeChanged, value) => {
	firebase.database().ref('/privileges/').once('value', snapshot => {
		let updates = snapshot.val();

		members.forEach(memberId => {
			if (!updates[memberId]) updates[memberId] = {};
			updates[memberId][privilegeChanged] = value;
		});

		firebase.database().ref('/privileges/').update(updates)
			.then(() =>Alert.alert('Changes successful', { type: 'success' }))
			.catch(() =>Alert.alert('Changes were not successful', { type: 'error' }));
	});

	if (privilegeChanged === 'paidMember') {
		firebase.database().ref('/users/').once('value', snapshot => {
			let updates = snapshot.val();

			members.forEach(memberId => {
				updates[memberId][privilegeChanged] = value;
			});

			firebase.database().ref('/users/').update(updates)
				.catch(() =>Alert.alert('Changes were not successful', { type: 'error' }));
		});
	}
};

export const getAllMemberAccountsAndRankings = (listener, update) =>
	firebase.database().ref('/users/')[listener ? 'on' : 'once']('value', snapshot => {
		const allMemberAccounts = _.orderBy(snapshot.val(), ['lastName', 'firstName'], ['asc', 'asc'])
			.reduce((allMembers, member) => ({ ...allMembers, [member.id]: member }), {});
		const rankedIDs = _.orderBy(allMemberAccounts, ['points'], ['desc']).map(({ id }) => id);
		let pastPoints = 0;
		let pastRank = 1;

		rankedIDs.forEach((id, index) => {
			const member = allMemberAccounts[id];

			member.rank = member.points !== 0 ? index + 1 : rankedIDs.length;
			if (member.points === pastPoints) member.rank = pastRank;

			pastRank = member.rank;
			pastPoints = member.points;
		});

		update({ allMemberAccounts, rankedIDs });
	});

export const getAllMemberPoints = (listener, update) =>
	firebase.database().ref('/points')[listener ? 'on' : 'once']('value', snapshot => update(snapshot.val()));