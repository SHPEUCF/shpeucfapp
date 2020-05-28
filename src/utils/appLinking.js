import { Linking } from "react-native";
import { Alert } from "../components/general/Alert";

/**
 * Object that holds the slack team id and several channel ids.
 * The information in here is the most current as of May 28th, 2020.
 * to find the team id or channel id login in slack on a computer.
 * The url will look like this https://app.slack.com/client/{team_id}/{channel_id}
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
	}
};

/**
 * @description This function handles the action launching an app, like a mail app, from our app.
 *
 *  ** It requires to pass an url and optional warning message.**
 *  Look under URL formats to see examples of correctly formatted urls for different apps.
 *  When dealing with slack, import slackInfo to gain access of the team id and channel id.
 *
 *      @param {String}  url           The url of the app to be open.
 *      @param {Stirng=} message       Optional value for the alert. It use to populate the alert dialog box.
 *
 * @example
 *  URL formats
 *      slack:
 *              To open the chapter worspace  ->  https://www.slack.com/open?team={slackInfo.team}
 *              to send the user directly to a channel,
 *              let's say general             ->  https://www.slack.com/channel?team={slackInfo.team}&id={slackInfo.channel.general}
 *      linked:
 *              To open a profile page        ->  https://www.linkedin.com/in/{profile}
 *              To open a company page        ->  https://www.linkedin.com/company/{companyName}
 *      instagram:
 *              To open a profile page        ->  https://www.instagram.com/{profile}
 *      facebook:
 *              To open a group page          ->  https://www.facebook.com/groups/{groupName}
 *      email:
 *              To send an email              ->  mailto:{email}
 *      phone:
 *              To make a call, let's say to 407-555-5555
 *                                            ->  tel:{+14075555555}
 *      website: websites needs to end with "/"
 *                                            ->  https://www.shpeucf.com/
 *
 *  -- How to use the function --
 *  Calling the function passing both params, the url and the alert message. -> appLinkingHandler(url, message)
 *
 *  Calling the function passing one param, the url. -> appLinkingHandler(url)
 */

function appLinkingHandler(url, message) {
	// eslint-disable-next-line max-len
	const myRegex = /^(?:https?:)?(?:\/\/)?(?:www\.)?([^:\/]+)?(?:\.com\/)(.*)?(#[\w\-]+)?$|^(mailto:|tel:)?([^:\:]+)?$/;
	const matchUrl = url.match(myRegex);
	let index = 0;
	let urlScheme;

	if (/^(mailto:|tel:)$/.test(matchUrl[4])) {
		if (matchUrl[5])
			Linking.openURL(url);
		else
			Alert.alert(message ? message : "No email and/or phone number was found.");
	}
	else if (/^(linkedin|facebook|instagram|slack)$/.test(matchUrl[1])) {
		if (matchUrl[1] != "slack") {
			index = matchUrl[2].lastIndexOf("/") === -1 ? 0 : matchUrl[2].lastIndexOf("/");

			if (matchUrl[2].slice(index + 1) && matchUrl[2].slice(index + 1) != "undefined") {
				urlScheme = `${matchUrl[1]}://${matchUrl[2]}`;
				const canOpen = Linking.canOpenURL(urlScheme);

				Linking.openURL(canOpen == true ? urlScheme : url);
			}
			else {
				Alert.alert(message ? message : "The url link is missing the group, profile, or company name or is not formatted correctly.");
			}
		}
		else {
			index = matchUrl[2].indexOf("?");
			if (matchUrl[2].slice(0, index) == "open") {
				urlScheme = `${matchUrl[1]}://${matchUrl[2]}`;

				if (matchUrl[2].slice(matchUrl[2].indexOf("=") + 1) && (Linking.canOpenURL(urlScheme)))
					Linking.openURL(urlScheme);
				else
					Alert.alert(message ? message : "The url link is missing the team id or is not formatted correctly.");
			}
			else {
				index = matchUrl[2].indexOf("?team=") === -1 ? 0 : matchUrl[2].indexOf("=");
				let mIndex = matchUrl[2].lastIndexOf("&id=") === -1 ? 0 : matchUrl[2].lastIndexOf("=");

				urlScheme = `${matchUrl[1]}://${matchUrl[2]}`;

				if (((matchUrl[2].slice(index + 1, mIndex - 4) && index != 0) && (matchUrl[2].slice(mIndex + 1)
                && mIndex != 0)) && (Linking.canOpenURL(urlScheme)))
					Linking.openURL(urlScheme);
				else
					Alert.alert(message ? message : "The url link is missing the team id and/or the channel id or is not formatted correctly.");
			}
		}
	}
	else {
		Linking.openURL(url);
	}
}

export { appLinkingHandler };