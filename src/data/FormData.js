/*
The order you put in the data reflects the order that the
fields are displayed
*/

import React from "react";
import Countries from "./Countries.json";
import Majors from "./Majors.json";
import { changeHourBy, timeVerification } from "../utils/events";
import { useSelector } from "react-redux";
import { Form } from "../components";

// data
const genderOptions = ["Female", "Male", "Other", "Do not wish to disclose"];
const eventTypeOptions = ["Committee", "Social Event", "Volunteer Event", "GBM", "Workshop", "Other"];

export const EventForm = (props) => {
	const eventTypeToPointsMap = {
		"Social Event": 3,
		"Volunteer Event": 3,
		"GBM": 5,
		"Workshop": 3,
		"Committee": 2
	};
	const committeesList = useSelector(state => Object.keys(state.committees.committeesList));

	const EventFormData = [
		{
			placeholder: "Event Type",
			camelCaseName: "type",
			type: "MultiElement",
			isRequired: true,
			options: {
				formatValue: {
					format: ({ type, committee }) => committee ? `${type}: ${committee}` : type.trim(),
					revert: ({ type }) => {
						const [eventType, , ] = type.split(": ");
						return eventType;
					}
				},
				elements: [
					{
						placeholder: "Event Type",
						camelCaseName: "type",
						type: "PickerInput",
						isRequired: true,
						conditionalValues: [{
							name: "points",
							value: (eventType) => eventTypeToPointsMap[eventType && eventType.split(": ")[0]]
						}],
						options: {
							data: eventTypeOptions
						}
					},
					{
						placeholder: "Committee Name",
						camelCaseName: "committee",
						type: "PickerInput",
						isRequired: true,
						options: {
							data: committeesList,
							parent: "type",
							showIfParentValueEquals: (parentValue) => "Committee" === parentValue
						}
					}
				]
			}
		},
		{
			placeholder: "Name",
			camelCaseName: "name",
			type: "Input",
			isRequired: true
		},
		{
			placeholder: "Description",
			camelCaseName: "description",
			type: "Input",
			isRequired: false,
			options: {
				multiline: true
			}
		},
		{
			placeholder: "Date",
			camelCaseName: "date",
			type: "DatePicker",
			isRequired: true
		},
		{
			placeholder: "Start Time",
			camelCaseName: "startTime",
			type: "TimePicker",
			conditionalValues: [{
				name: "endTime",
				value: (time) => changeHourBy(time, 1)
			}],
			isRequired: true
		},
		{
			placeholder: "End Time",
			camelCaseName: "endTime",
			type: "TimePicker",
			isRequired: true
		},
		{
			placeholder: "Location",
			camelCaseName: "location",
			type: "Input",
			isRequired: true
		},
		{
			placeholder: "Value",
			camelCaseName: "points",
			options: {
				keyboardType: "numeric"
			},
			type: "Input",
			isRequired: true
		}
	];

	return (
		<Form
			elements = { EventFormData }
			customVerification = {{
				camelCaseNames: ["startTime", "endTime"],
				verification: ([s, e]) => timeVerification(s, e)
			}}
			{ ...props }
		/>
	);
};

const editProfileFormDataRegular = [
	{
		placeholder: "Gender",
		camelCaseName: "gender",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: genderOptions
		}
	},
	{
		placeholder: "Major",
		camelCaseName: "major",
		type: "FilterList",
		isRequired: false,
		options: {
			data: Majors
		}
	},
	{
		placeholder: "Country of Origin",
		camelCaseName: "country",
		type: "FilterList",
		isRequired: false,
		options: {
			data: Countries
		}
	}
];

const editProfileFormDataPrivileged = [
	{
		placeholder: "Gender",
		camelCaseName: "gender",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: genderOptions
		}
	},
	{
		placeholder: "Major",
		camelCaseName: "major",
		type: "FilterList",
		isRequired: false,
		options: {
			data: Majors
		}
	},
	{
		placeholder: "Country of Origin",
		camelCaseName: "country",
		type: "FilterList",
		isRequired: false,
		options: {
			data: Countries
		}
	},
	{
		placeholder: "Birthday",
		camelCaseName: "birthday",
		type: "DatePicker",
		isRequired: false
	}
];

const loginFormData = [
	{
		placeholder: "Knights Email",
		camelCaseName: "email",
		type: "Input",
		isRequired: true,
		options: {
			autoCapitalize: "none"
		}
	},
	{
		placeholder: "Password",
		camelCaseName: "password",
		type: "Input",
		isRequired: true,
		options: {
			secureTextEntry: true,
			autoCapitalize: "none"
		}
	}
];

const registrationFormData = [
	{
		placeholder: "First Name",
		camelCaseName: "firstName",
		type: "Input",
		isRequired: true
	},
	{
		placeholder: "Last Name",
		camelCaseName: "lastName",
		type: "Input",
		isRequired: true
	},
	{
		placeholder: "Knights email",
		camelCaseName: "email",
		type: "Input",
		isRequired: true,
		options: {
			keyboardType: "email-address"
		}
	},
	{
		placeholder: "Password",
		camelCaseName: "password",
		type: "Input",
		isRequired: true,
		options: {
			secureTextEntry: true
		}
	},
	{
		placeholder: "Gender",
		camelCaseName: "gender",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: genderOptions
		}
	},
	{
		placeholder: "Major",
		camelCaseName: "major",
		type: "FilterList",
		isRequired: false,
		options: {
			data: Majors
		}
	},
	{
		placeholder: "Country of Origin",
		camelCaseName: "country",
		type: "FilterList",
		isRequired: false,
		options: {
			data: Countries
		}
	},
	{
		placeholder: "Birthday",
		camelCaseName: "birthday",
		type: "DatePicker",
		isRequired: false
	}
];

const upsertCommittee = [
	{
		placeholder: "Committee Name",
		camelCaseName: "title",
		type: "Input",
		isRequired: true
	},
	{
		placeholder: "Committee Description",
		camelCaseName: "description",
		type: "Input",
		isRequired: true
	},
	{
		placeholder: "Chair",
		camelCaseName: "chair",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: {
				"011": { firstName: "Steven", lastName: "Perdomo", id: "011" },
				"012": { firstName: "Haniel", lastName: "Diaz", id: "012" },
				"013": { firstName: "Idel", lastName: "Martinez", id: "013" } },
			type: "single"
		}
	}
];

export {
	editProfileFormDataPrivileged,
	editProfileFormDataRegular,
	registrationFormData,
	upsertCommittee,
	loginFormData
};

// functions

/**
 * @param {Object} obj and object with the props that match the camelcaseNames of the data
 * @returns {Array} an Array of initialValues made from the user props
 */
const convertObjectToInitialValues = (obj) => {
	let initialValues = [];

	Object.entries(obj).forEach(([key, value]) => {
		initialValues.push({ camelCaseName: key, value: value });
	});

	return initialValues;
};

export {
	convertObjectToInitialValues
};