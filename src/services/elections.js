import firebase from 'firebase';
import { Alert } from '@/components';

export const toggleElection = canVote => {
	const updatedElection = { election: canVote };
	const electionStatus = canVote ? 'started' : 'closed';

	if (canVote)
		firebase.database().ref('/election/votes/').once('value', snapshot => updatedElection.votes = snapshot.val() || 0);

	firebase.database().ref('/election/').update(updatedElection)
		.then(() => Alert.alert(`Election ${electionStatus}!`, { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert(`Election could not be ${electionStatus}!`, { type: 'error', title: 'Failure' }));
};

export const toggleApplications = canApply => {
	const electionApplicationStatus = canApply ? 'started' : 'closed';

	firebase.database().ref('/election/').update({ apply: canApply })
		.then(() => Alert.alert(`Applications ${electionApplicationStatus}!`, { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert(`Applications could not be ${electionApplicationStatus}!`, { type: 'error', title: 'Failure' }));
};

export const addPosition = (title, description, level) => {
	firebase.database().ref(`/election/positions/${title}`).set({ title, description, level })
		.then(() => Alert.alert('Position added!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Position could not be added!', { type: 'error', title: 'Failure' }));
};

export const deletePosition = positionTitle => {
	firebase.database().ref(`/election/positions/${positionTitle}`).remove()
		.then(() => Alert.alert('Position deleted!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Position could not be deleted!', { type: 'error', title: 'Failure' }));
};

export const editPosition = (title, description, oldTitle) => {
	if (oldTitle) {
		firebase.database().ref(`/election/positions/${oldTitle}/level`).once('value')
			.then(snapshot => firebase.database().ref(`/election/positions/${oldTitle}`).remove()
				.then(() => firebase.database().ref(`/election/positions/${title}`).set({ title, description, level: snapshot.val() }))
				.then(() => Alert.alert('Position edited!', { type: 'success', title: 'Successful' })))
			.catch(() => Alert.alert('Position could not be edited!', { type: 'error', title: 'Failure' }));
	}
	else {
		firebase.database().ref(`/election/positions/${title}`).update({ title, description })
			.then(() => Alert.alert('Position edited!', { type: 'success', title: 'Successful' }))
			.catch(() => Alert.alert('Position could not be edited!', { type: 'error', title: 'Failure' }));
	}
};

export const editApplication = ({ firstName, lastName, plan, position, picture, applied }) => {
	const { uid } = firebase.auth().currentUser;
	const applicationStatus = applied ? 'edited' : 'started';

	firebase.database().ref(`/election/positions/${position}/candidates/${uid}`).update(
		{ firstName, lastName, plan, position, picture, id: uid }
	)
		.then(() => !applied && firebase.database().ref(`/users/${uid}/applied/`).set(true))
		.then(() => Alert.alert(`Application ${applicationStatus}!`, { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert(`Application could not be ${applicationStatus}!`, { type: 'error', title: 'Failure' }));
};

export const approveApplication = (position, candidateId, firstName, lastName) => {
	firebase.database().ref(`/election/positions/${position}/candidates/${candidateId}`).update({ approved: true })
		.then(() => firebase.database().ref(`/voting/${position}/${candidateId}`).set({ votes: 0, firstName, lastName }))
		.then(() => Alert.alert('Candidate approved!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Candidate could not be approved!', { type: 'error', title: 'Failure' }));
};

export const deleteApplication = (position, candidateId) => {
	firebase.database().ref(`/election/positions/${position}/candidates/${candidateId}`).remove()
		.then(() => firebase.database().ref(`/users/${candidateId}`).update({ applied: false }))
		.then(() => firebase.database().ref(`/voting/${position}/${candidateId}`).remove())
		.then(() => Alert.alert('Candidate removed!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Candidate could not be removed!', { type: 'error', title: 'Failure' }));
};

export const vote = candidateObj => {
	const { uid } = firebase.auth().currentUser;
	const candidateList = Object.entries(candidateObj);

	firebase.database().ref('/voting/').once('value', snapshot => {
		const electionObject = snapshot.val();

		candidateList.forEach(([position, candidateID]) => {
			electionObject[position][candidateID][uid] = true;
			electionObject[position][candidateID].votes++;
		});
		firebase.database().ref('/voting/').update(electionObject);
	})
		.then(() => firebase.database().ref('/election/votes').once('value', snapshot => {
			firebase.database().ref('/election/votes').set(parseInt(snapshot.val()) + 1);
		}))
		.then(() => firebase.database().ref(`/users/${uid}/voted/`).set(true))
		.then(() => Alert.alert('Vote cast!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Vote could not be cast!', { type: 'error', title: 'Failure' }));
};

export const changeLevelsPosition = positions => {
	firebase.database().ref('election').once('value', snapshot => {
		const electionObject = snapshot.val();

		positions.forEach((position, index) => electionObject.positions[position.title].level = index);
		firebase.database().ref('election').update(electionObject);
	})
		.then(() => Alert.alert('Order set!', { type: 'success', title: 'Successful' }))
		.catch(() => Alert.alert('Order could not be set!', { type: 'error', title: 'Failure' }));
};

export const getAllPositions = update =>
	firebase.database().ref('/election/positions').on('value', snapshot => update(snapshot.val()));

export const getAllVotes = update =>
	firebase.database().ref('voting').on('value', snapshot => update(snapshot.val()));

export const updateElectionStatus = update =>
	firebase.database().ref('election').on('value', snapshot => update(snapshot.val()));