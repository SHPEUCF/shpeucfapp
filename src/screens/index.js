<<<<<<< HEAD
/*

All Screen Exports here grouped by folder

*/

/** Export Admin **/
import AdminHub from "./Admin/AdminHub";
import CommitteesAdmin from "./Admin/CommitteesAdmin";
import ElectionAdmin from "./Admin/ElectionAdmin";
import MemberAdmin from "./Admin/MemberAdmin";
export {
	AdminHub,
	CommitteesAdmin,
	ElectionAdmin,
	MemberAdmin
};

/** Export Committees **/
import CommitteePage from "./Committees/CommitteePage";
import Committees from "./Committees/Committees";
export {
	CommitteePage,
	Committees
};

/** Export Election **/
import ElectionApplication from "./Election/ElectionApplication";
import ElectionBallot from "./Election/ElectionBallot";
import ElectionCandidates from "./Election/ElectionCandidates";
import ElectionPositions from "./Election/ElectionPositions";
export {
	ElectionApplication,
	ElectionBallot,
	ElectionCandidates,
	ElectionPositions
};

/** Export Events **/
import Events from "./Events/Events";
import EventDetails from "./Events/EventDetails";
export {
	Events,
	EventDetails
};

/** Export General **/
import Dashboard from "./General/Dashboard";
import Leaderboard from "./General/Leaderboard";
import More from "./General/More";
export * from "./General/About";
export * from "./General/Splash";
export * from "./General/Welcome";
export {
	Dashboard,
	Leaderboard,
	More
};

/** Export User **/
import Login from "./User/Login";
import OtherProfile from "./User/OtherProfile";
import PointsBreakDown from "./User/PointsBreakDown";
import Profile from "./User/Profile";
import ResetPassword from "./User/ResetPassword";
export {
	Login,
	OtherProfile,
	PointsBreakDown,
	Profile,
	ResetPassword
};
=======
// Export Admin
export { default as AdminHub } from "./Admin/AdminHub";
export { default as CommitteesAdmin } from "./Admin/CommitteesAdmin";
export { default as ElectionAdmin } from "./Admin/ElectionAdmin";
export { default as MemberAdmin } from "./Admin/MemberAdmin";

// Export Committees
export { default as CommitteePage } from "./Committees/CommitteePage";
export { default as Committees } from "./Committees/Committees";

// Export Election
export { default as ElectionApplication } from "./Election/ElectionApplication";
export { default as ElectionBallot } from "./Election/ElectionBallot";
export { default as ElectionCandidates } from "./Election/ElectionCandidates";
export { default as ElectionPositions } from "./Election/ElectionPositions";

// Export Events
export { default as Events } from "./Events/Events";
export { default as EventDetails } from "./Events/EventDetails";

// Export General
export { default as Leaderboard } from "./General/Leaderboard";
export { default as More } from "./General/More";
export { About } from "./General/About";
export { Dashboard } from "./General/Dashboard";

// Export User
export { default as Login } from "./User/Login";
export { default as OtherProfile } from "./User/OtherProfile";
export { default as PointsBreakDown } from "./User/PointsBreakDown";
export { default as Profile } from "./User/Profile";
export { default as ResetPassword } from "./User/ResetPassword";
>>>>>>> 928f8c474c25f8b24c31c61be0fc32efedacd5e4
