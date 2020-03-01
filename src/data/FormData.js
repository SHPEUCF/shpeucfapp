/*
The order you put in the data reflects the order that the
fields are displayed
*/

import Countries from "./Countries.json";
import Colleges from "./Colleges.json";

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
		placeholder: "College",
		camelCaseName: "college",
		type: "PickerInput",
		isRequired: true,
		options: {
			data: Object.keys(Countries)
		}
	}
	// {
	// placeholder: "Major",
	// 	camelCaseName: "major",
	// 	type: "PickerInput",
	// 	isRequired: true
	// }
];

const editProfileFormDataPrivileged = [
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
		placeholder: "Gender",
		camelCaseName: "gender",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: genderOptions
		}
	},
	{
		placeholder: "College",
		camelCasseName: "college",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: Object.keys(Colleges)
		}
	},
	// {
	// placeholder: "Major",
	// 	camelCaseName: "major",
	// 	type: "PickerInput",
	// 	isRequired: false
	// },
	{
		placeholder: "Continent of Origin",
		camelCaseName: "continent",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: Object.keys(Countries)
		}
	},
	// {
	// placeholder: "Country of Origin",
	// 	camelCaseName: "country",
	// 	type: "PickerInput",
	// 	isRequired: false
	// },
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
	upsertCommittee
};