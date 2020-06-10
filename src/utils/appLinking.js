import { Linking } from "react-native";
import { Alert } from "../components";

/**
 * 	@description Object that holds the slack team id and several channel ids.
 * 	The information in here is the most current as of May 28th, 2020.
 * 	To find the team id or channel id login in slack on a computer.
 *
 * 	@typedef {{team: String, channel: String, fbGroupshpeucf: String}} slackInfo
 * 	@const {slackInfo} slackInfo
 */

export const slackInfo = {
	team: "TC61JSPUZ",
	channel: {
		general: "CPRDXHHD4",
		announcements: "CC5S86GHE",
		fundraisingCommitte: "CCUUWRU1Y",
		motorshpe: "CP5HC76TD",
		projects: "CNATZRD9C",
		shpejr: "GCWFE5630"
	},
	fbGroupshpeucf: "120691161371846"
};

/**
 * @description A  shorthand function that returns the uri scheme and universal for opening an app
 * and pass parameters to navigate in the app if parameters are included. It is a helper function for
 * openApporWebsite and should not be change unless the apps changes the universal links and/or uri schemas.
 * In iOS the apps need to be added under "LSApplicationQueriesSchemes". (e.g.) Facebook uses fb while slack is as same as their name.
 *
 * @param {String}  inquiry  The value of the query.
 * @param {String=} intent   The vlalue that specify the type of query.
 * @example Call the function like this formatUrl[appName](inquiry, intent)
 */

const formatUrl = {
	email: (inquiry) => (inquiry) = ({ uri: `mailto:${inquiry}`, url: `mailto:${inquiry}` }),

	facebook: (inquiry, intent) => (intent == "groups" && inquiry) ? ({ uri: `https://facebook.com/groups/${inquiry}`, url: `https://www.facebook.com/groups/${inquiry}/` })
		: (intent == "profile" && inquiry) ? ({ uri: `https://facebook.com/${inquiry}`, url: `https://www.facebook.com/${inquiry}` })
			: ({ uri: "fb://", url: "https://www.facebook.com/" }),

	instagram: (inquiry) => (inquiry) ? ({ uri: `instagram://user?username=${inquiry}`, url: `https://www.instagram.com/_u/${inquiry}/` }) :
		({ uri: "instagram://", url: "https://www.instagram.com" }),

	linkedin: (inquiry, intent) => (intent === "profile" && inquiry) ? ({ uri: `linkedin://in/${inquiry}`, url: `https://www.linkedin.com/in/${inquiry}` })
		: (intent === "company" && inquiry) ? ({ uri: `linkedin://company/${inquiry}`, url: `https://www.linkedin.com/company/${inquiry}` })
			: ({ uri: "linkedin://", url: "https://www.linkedin.com" }),

	slack: (inquiry, intent) => (intent === "channel" && (inquiry = inquiry in slackInfo.channel ? slackInfo.channel[inquiry] : inquiry))
		? ({ uri: `slack://channel?team=${slackInfo.team}&id=${inquiry}` }) : ({ uri: `slack://open?team=${slackInfo.team}` }),

	phone: (inquiry) => (inquiry) = ({ uri: `tel:+${inquiry}`, url: `tel:+${inquiry}` }),

	web: (inquiry) => (inquiry) = ({ uri: `${inquiry}`, url: `${inquiry}` })
};

/**
 * @description This function handles the action launching an app, like a mail app, from our app.
 * It uses uri schemes and universal liks to do deep linking in both platforms.
 *
 * **It requires three parameters and an optional warning message.**
 * Look under func call to see examples of how to call the function for different apps.
 * When dealing with slack, you can write the name of the channel or if not sure of the name import
 * slackInfo to see the channels available.
 *
 * @param {("email"|"facebook"|
 *          "instagram"|"linkedin"
 *          |"slack"|"phone"|"web")} appName        The app name to be open.
 * @param {("groups"|"profile"|
 *          "company"|"channel"|
 *          "open")} 				 intent         The intent of the search.
 * @param {("announcements"|
 *          "fundraisingCommitte"|
 *          "general"|"motorshpe"|
 *          "projects"|"shpejr")} 	 inquiry   	    The value for the query search. Slack channels are shown here for easiness.
 * @param {String=} 				 warningMessage Optional value for the alert. It use to populate the alert dialog box.
 *
 * -- How to use the function --
 * 4 params: (appName, intent, inquiry, warningMessage), pass the app name, action, what you are looking for,
 * and the alert message (respectively) to the function.
 *
 * 3 params: (appName, intent, inquiry, WarningMessage), pass the app name, action, and what you are looking for (respectively) to the function.
 *
 * @example
 * func call
 *  Slack: To open the chapter workspace openAppOrWebsite({"slack"}, {"open"}, {"team" | slackInfo.team}, "Optional error  msg");
 *            To send the user directly to a channel, let's say general,
 *            openAppOrWebsite({"slack"}, {"channel"}, {"general" | slackInfo.channel.general}, warningMsg);
 *
 *  LinkedIn (profile or company): To open a profile/company page,
 *                                 openAppOrWebsite({"linkedin"}, {"profile" | "company"}, {activeUser.linkedin | "companyProfile"}, warningMsg);
 *
 *  Instagram (profile), facebook (profile or group): To open a profile or group page,
 *                                                    openAppOrWebsite({"appName"}, {"profile" | "group"}, {"userProfile or groupName"}, warningMsg);
 *
 *  email, phone or website: To open maiil or phone app, openAppOrWebsite({"mail" | "phone"}, {"open"}, {activeUser.email | "14075551010"}, warningMsg);
 *      		             To open web browser app, openAppOrWebsite("web", "open", {"https://www.example.com/"}, warningMsg);
 */

export function openAppOrWebsite(appName, intent, inquiry, warningMessage) {
	const warning = (warningMessage) ? warningMessage : "Oops! Something went wrong.\nContact Tech Director if problem persist.";

	if (!inquiry) {
		Alert.alert(warning);
	}
	else {
		const { uri, url } = formatUrl[appName](inquiry, intent);

		if (Linking.canOpenURL(uri))
			Linking.openURL(uri);
		else if (Linking.canOpenURL(url))
			Linking.openURL(url);
		else
			Alert.alert(warning);
	}
}