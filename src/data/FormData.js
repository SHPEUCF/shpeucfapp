/*
The order you put in the data reflects the order that the
fields are displayed
*/

import Countries from "./Countries.json";
import Majors from "./Majors.json";

// data

const genderOptions = ["Female", "Male", "Other", "Do not wish to disclose"];
const eventTypeOptions = ["Committee", "Social Event", "Volunteer Event", "GBM", "Workshop", "Other"];

const upsertEventFormData = [
	{
		placeholder: "Event Type",
		camelCaseName: "type",
		type: "PickerInput",
		isRequired: true,
		options: {
			data: eventTypeOptions
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
		isRequired: true
	},
	{
		placeholder: "End Time",
		camelCaseName: "endTime",
		type: "TimePicker",
		isRequired: false
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
		type: "Input",
		isRequired: true
	}
];

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
	upsertEventFormData,
	editProfileFormDataPrivileged,
	editProfileFormDataRegular,
	registrationFormData,
	upsertCommittee
};

// functions

/**
 * @param {Object} user a user object
 * @returns {Array} an Array of initialValues made from the user props
 */
const convertUserToInitialValues = (user) => {
	let initialValues = [];

	Object.entries(user).forEach(([key, value]) => {
		initialValues.push({
			camelCaseName: key,
			value: value
		});
	});

	return initialValues;
};

export {
	convertUserToInitialValues
};