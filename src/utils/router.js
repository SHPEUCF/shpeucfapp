import { Actions } from "react-native-router-flux";

/**
 * @description A helper function to help you maintain the correct stack when going to eventDetails page.
 *
 * @param {String} screen The screen you are currently in.
 */
export function goToViewEvent(screen) {
	if (screen === "dashboard") Actions["eventDetailsD"]({ screen: screen });
	else if (screen === "events") Actions["eventDetails"]({ screen: screen });
	else if (screen === "dashboard" + "committeepage") Actions["eventDetailsCPD"]({ screen: screen });
	else if (screen === "committees" + "committeepage") Actions["eventDetailsC"]({ screen: screen });
}