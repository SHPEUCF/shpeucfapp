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
		name: "Event Type",
		camelCaseName: "type",
		type: "PickerInput",
		isRequired: true,
		options: {
			data: eventTypeOptions
		}
	},
	{
		name: "Name",
		camelCaseName: "name",
		type: "Input",
		isRequired: true
	},
	{
		name: "Description",
		camelCaseName: "description",
		type: "Input",
		isRequired: false,
		options: {
			multiline: true
		}
	},
	{
		name: "Date",
		camelCaseName: "date",
		type: "DatePicker",
		isRequired: true
	},
	{
		name: "Start Time",
		camelCaseName: "startTime",
		type: "TimePicker",
		isRequired: true
	},
	{
		name: "End Time",
		camelCaseName: "endTime",
		type: "TimePicker",
		isRequired: false
	},
	{
		name: "Location",
		camelCaseName: "location",
		type: "Input",
		isRequired: true
	},
	{
		name: "Value",
		camelCaseName: "points",
		type: "Input",
		isRequired: true
	}
];

const editProfileFormDataRegular = [
	{
		name: "College",
		camelCaseName: "college",
		type: "PickerInput",
		isRequired: true,
		options: {
			data: Object.keys(Countries)
		}
	}
	// {
	// 	name: "Major",
	// 	camelCaseName: "major",
	// 	type: "PickerInput",
	// 	isRequired: true
	// }
];

const editProfileFormDataPrivileged = [
	{
		name: "First Name",
		camelCaseName: "firstName",
		type: "Input",
		isRequired: true
	},
	{
		name: "Last Name",
		camelCaseName: "lastName",
		type: "Input",
		isRequired: true
	},
	{
		name: "Gender",
		camelCaseName: "gender",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: genderOptions
		}
	},
	{
		name: "College",
		camelCasseName: "college",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: Object.keys(Colleges)
		}
	},
	// {
	// 	name: "Major",
	// 	camelCaseName: "major",
	// 	type: "PickerInput",
	// 	isRequired: false
	// },
	{
		name: "Continent of Origin",
		camelCaseName: "continent",
		type: "PickerInput",
		isRequired: false,
		options: {
			data: Object.keys(Countries)
		}
	},
	// {
	// 	name: "Country of Origin",
	// 	camelCaseName: "country",
	// 	type: "PickerInput",
	// 	isRequired: false
	// },
	{
		name: "Birthday",
		camelCaseName: "birthday",
		type: "DatePicker",
		isRequired: false
	}

];

export {
	upsertEventFormData,
	editProfileFormDataPrivileged,
	editProfileFormDataRegular
};