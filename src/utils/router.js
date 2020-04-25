import { Actions } from "react-native-router-flux";

export const goToViewEvent = (screen) => {

	if (screen === "dashboard") Actions["eventDetailsD"]({ screen: screen });
	else if (screen === "events") Actions["eventDetails"]({ screen: screen });
	else if (screen === "dashboard" + "committeepage") Actions["eventDetailsCPD"]({ screen: screen });
	else if (screen === "committees" + "committeepage") Actions["eventDetailsC"]({ screen: screen });
};