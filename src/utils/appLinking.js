import { Linking } from "react-native";
import { Alert } from "../components";

/**
 * @description Object that holds the slack team id and several channel ids.
 *              The information in here is the most current as of May 28th, 2020.
 *              To find the team id or channel id login in slack on a computer.
 *
 * @typedef {{team: String, channel: String, fbGroupshpeucf: String}} slackInfo
 */

export const slackInfo = {
	team: "TC61JSPUZ",
	channel: {
		general: "CPRDXHHD4",
		announcements: "CC5S86GHE",
		fundraisingCommittee: "CCUUWRU1Y",
		motorshpe: "CP5HC76TD",
		projects: "CNATZRD9C",
		shpejr: "GCWFE5630"
	},
	fbGroupshpeucf: "120691161371846"
};

/**
 * @description Function that returns the URI scheme and universal link for opening
 *              an app, along with parameters, if included. Should not be changed
 *              unless the apps change the universal links and/or URI schemas.
 *
 * @param {String}  inquiry  The value of the query.
 * @param {String=} intent   The value that specifies the type of query.
 *
 * @example
 * // How to call the function
 * formatUrl[name_of_the_app](inquiry, intent);
 */

const formatUrl = {
	email: inquiry => ({ uri: `mailto:${inquiry}`, url: `mailto:${inquiry}` }),
	phone: inquiry => ({ uri: `tel:+${inquiry}`, url: `tel:+${inquiry}` }),
	web: inquiry => ({ uri: `${inquiry}`, url: `${inquiry}` }),
	facebook: (inquiry, intent) => (
		(intent == "groups" && inquiry)
			? { uri: `https://facebook.com/groups/${inquiry}`, url: `https://www.facebook.com/groups/${inquiry}/` }
			: (intent == "profile" && inquiry)
				? { uri: `https://facebook.com/${inquiry}`, url: `https://www.facebook.com/${inquiry}` }
				: { uri: "fb://", url: "https://www.facebook.com/" }
	),
	instagram: inquiry => (
		(inquiry)
			? { uri: `instagram://user?username=${inquiry}`, url: `https://www.instagram.com/_u/${inquiry}/` }
			: { uri: "instagram://", url: "https://www.instagram.com" }
	),
	linkedin: (inquiry, intent) => (
		(intent === "profile" && inquiry)
			? { uri: `linkedin://in/${inquiry}`, url: `https://www.linkedin.com/in/${inquiry}` }
			: (intent === "company" && inquiry)
				? { uri: `linkedin://company/${inquiry}`, url: `https://www.linkedin.com/company/${inquiry}` }
				: { uri: "linkedin://", url: "https://www.linkedin.com" }
	),
	slack: (inquiry, intent) => (
		(intent === "channel" && (inquiry = (inquiry in slackInfo.channel) ? slackInfo.channel[inquiry] : inquiry))
			? { uri: `slack://channel?team=${slackInfo.team}&id=${inquiry}` }
			: { uri: `slack://open?team=${slackInfo.team}` }
	)
};

const defIntentVal = (appName, intent) => {
	if (!intent) {
		const names = ["facebook", "instagram", "linkedin"];

		intent = (names.includes(appName)) ? "profile" : "open";
	}

	return intent;
};

/**
 * @description This function handles the action launching an app, like a mail app, from our app.
 *              It uses uri schemes and universal links to do deep linking in both platforms.
 *              **Requires two parameters and two optionals, action and warning message**.
 *              With Slack, write the name of the channel or use slackInfo to see the channels available.
 *
 * @param {("email"|"facebook"
 *         |"instagram"|"linkedin"
 *         |"slack"|"phone"|"web")} appName  The app name to be opened.
 * @param {("announcements"
 *         |"fundraisingCommittee"
 *         |"general"|"motorshpe"
 *         |"projects"|"shpejr")}   inquiry  The value for the query search.
 * @param { {intent: ("groups"
 *            |"profile"|"company"
 *            |"channel"|"open"),
 *          warning: String}=}      config   (Optional) Intent for opening app and warning for alert.
 *
 * How to use
 * ---
 * 2 params: (appName, inquiry), pass the app name and what you are looking.
 *
 * 3 params: (appName, inquiry, { intent, warning }), pass the app name, what you are looking for,
 *           action, and/or the alert message.
 *
 * @example
 * // Slack: To open the chapter workspace
 * openAppOrWebsite("slack", "team" | slackInfo.team, { warning: "Optional error message" });
 * // Slack: To send the user directly to a channel
 * openAppOrWebsite("slack", "general" | slackInfo.channel.general, { intent: "channel", warning: "Optional error message" });
 *
 * // LinkedIn (profile or company): To open a profile page
 * openAppOrWebsite("linkedin", activeUser.linkedin | "companyProfile", { intent: "profile" | "company", warning: "Oops" })
 *
 * // Instagram (profile), Facebook (profile or group): To open a profile or group page
 * openAppOrWebsite("appName", userProfile, { intent: "profile" | "group", warning: "Oops"})
 *
 * // Email, phone or website:
 * openAppOrWebsite("mail" | "phone", activeUser.email | "14075551010", { warning: "Oops" })
 * openAppOrWebsite("web", "https://www.example.com/", { warning: "Oops" })
 */

export function openAppOrWebsite(appName, inquiry, { intent, warning }) {
	if (!inquiry) {
		const name = appName[0].toUpperCase() + appName.slice(1);

		Alert.alert(warning, { title: `Missing ${name} information.`, submit: { title: "Close" } });
	}
	else {
		intent = intent || defIntentVal(appName, intent);
		warning = warning || "Oops! Something went wrong. Contact the Tech Directors if problem persists.";
		const { uri, url } = formatUrl[appName](inquiry, intent);

		if (Linking.canOpenURL(uri))
			Linking.openURL(uri);
		else if (Linking.canOpenURL(url))
			Linking.openURL(url);
		else
			Alert.alert(warning, { title: "Warning", type: "error", submit: { title: "Close" } });
	}
}