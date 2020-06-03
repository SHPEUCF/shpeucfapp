import { Linking } from "react-native";
import { Alert } from "../components/general/Alert";

/**
 * @description Object that holds the slack team id and several channel ids.
 * The information in here is the most current as of May 28th, 2020.
 * To find the team id or channel id login in slack on a computer.
 * @typedef {{team: String, channel: String, fbGroupshpeucf: String}} slackInfo
 * @const {slackInfo} slackInfo
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
 * @description A  shorthand function that returns the uri scheme and universal for opening an app and pass parameters to navigate
 * in the app if parameters are included.
 * @param {String}    inquiry  The value of the query.
 * @param {String=}   intent   The vlalue that specify the type of query.
 * @example Call the function like this formatUrl[name of the app](inquiry, intent)
 */

const formatUrl = {
	email: (inquiry) => (inquiry) = ({ uri: `mailto:${inquiry}`, url: `mailto:${inquiry}` }),

	facebook: (inquiry, intent) => (intent == "groups" && inquiry) ? ({ uri: `https://facebook.com/groups/${inquiry}`, url: `https://www.facebook.com/groups/${inquiry}/` }) :
		(intent == "profile" && inquiry) ? ({ uri: `https://facebook.com/${inquiry}`, url: `https://www.facebook.com/${inquiry}` }) : ({ uri: "fb://", url: "https://www.facebook.com/" }),

	instagram: (inquiry) => (inquiry) ? ({ uri: `instagram://user?username=${inquiry}`, url: `https://www.instagram.com/_u/${inquiry}/` }) :
		({ uri: "instagram://", url: "https://www.instagram.com" }),

	linkedin: (inquiry, intent) => (intent === "profile" && inquiry) ? ({ uri: `linkedin://in/${inquiry}`, url: `https://www.linkedin.com/in/${inquiry}` }) :
		(intent === "company" && inquiry) ? ({ uri: `linkedin://company/${inquiry}`, url: `https://www.linkedin.com/company/${inquiry}` }) :
			({ uri: "linkedin://", url: "https://www.linkedin.com" }),

	slack: (inquiry, intent) => (intent === "channel" && (inquiry = inquiry in slackInfo.channel ? slackInfo.channel[inquiry] : inquiry)) ?
		({ uri: `slack://channel?team=${slackInfo.team}&id=${inquiry}` }) : ({ uri: `slack://open?team=${slackInfo.team}` }),

	phone: (inquiry) => (inquiry) = ({ uri: `tel:+${inquiry}`, url: `tel:+${inquiry}` }),

	web: (inquiry) => (inquiry) = ({ uri: `${inquiry}`, url: `${inquiry}` })
};

/**
 * @summary
 * @description This function handles the action launching an app, like a mail app, from our app.
 * It uses uri schemes and universal liks to do deep linking in both platforms.
 *
 *  ** It requires three parameters and an optional warning message. **
 *  Look under func call to see examples of how to call the function for different apps.
 *  When dealing with slack,  you can write the name of the channel or if not sure of the name import slackInfo to see the channels available.
 *
 *      @param {("email"|"facebook"|
 * 				 "instagram"|"linkedin"
 *               |"slack"|"phone"|"web")}  	appName         	The app name to be open.
 *      @param {("groups"|"profile"|
 * 				 "company"|"channel"|
 * 			     "open")} 				    intent        		The intent of the search.
 *      @param {("announcements"|
 * 				 "fundraisingCommitte"|
 * 				 "general"|"motorshpe"|
 * 				 "projects"|"shpejr")} 		inquiry   			The value for the query search. Slack channels are shown here for easiness.
 *      @param {String=} 				    warningMessage		Optional value for the alert. It use to populate the alert dialog box.
 *
 * @example
 *  func call
 *      slack:
 *              To open the chapter worspace
 * 			    openAppOrWebsite({"slack"}, {"open"}, {"team" | slackInfo.team}, "Optional error  msg");
 *
 *              to send the user directly to a channel, let's say general
 *              openAppOrWebsite({"slack"}, {"channel"}, {"general" | slackInfo.channel.general}, "Optional error  msg");
 *      linkedin (profile or comapny):
 *              To open a profile page.
 * 			    openAppOrWebsite({"linkedin"}, {"profile"}, {activeUser.linkedin | "companyProfile"}, " something ...")
 *
 *      instagram (profile), facebook (profile or group):
 *              To open a profile or group page
 * 				openAppOrWebsite({"appName"}, {"profile" | "group"}, {userProfile}, " something ...")
 *
 *      email, phone or website:
 *				openAppOrWebsite({"mail" | "phone"}, {"open"}, {activeUser.email | "14075551010"}, " something ...")
 *      		openAppOrWebsite("web", "open", {"https://www.example.com/"}, " something ...")
 *
 *  -- How to use the function --
 *  Calling the function passing 4 params, the name of the app, the action, what you are looking and the
 *  alert message.(appName, intent, inquiry, Warningmessage)
 *
 *  Calling the function passing 3 param, the app name, the action, and what you are looking.(appName, intent, inquiry)
 */

export function openAppOrWebsite(appName, intent, inquiry, warningMessage) {
	warningMessage = (warningMessage) ? warningMessage : "Oops! Something went wrong.\nContact Tech Director if problem persist.";

	if (!inquiry) {
		Alert.alert(warningMessage);
	}
	else {
		const { uri, url } = formatUrl[appName](inquiry, intent);

		if (Linking.canOpenURL(uri))
			Linking.openURL(uri);
		else if (Linking.canOpenURL(url))
			Linking.openURL(url);
		else
			Alert.alert(warningMessage);
	}
}
