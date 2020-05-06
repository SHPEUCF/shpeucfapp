import React, { Component } from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import XDate from "xdate";

import dateutils from "../dateutils";
import { xdateToData, parseDate } from "../interface";
import styleConstructor from "./style";
import Day from "./day/basic";
import UnitDay from "./day/period";
import MultiDotDay from "./day/multi-dot";
import MultiPeriodDay from "./day/multi-period";
import SingleDay from "./day/custom";
import CalendarHeader from "./header";
import shouldComponentUpdate from "./updater";
import { SELECT_DATE_SLOT } from "../testIDs";

// Fallback when RN version is < 0.44
const viewPropTypes = ViewPropTypes || View.propTypes;
const EmptyArray = [];

/**
 * @description: Calendar component
 * @example: https://github.com/wix/react-native-calendars/blob/master/example/src/screens/calendars.js
 * @gif: https://github.com/wix/react-native-calendars/blob/master/demo/calendar.gif
 */
class Calendar extends Component {
	static displayName = "Calendar";

	static propTypes = {
		/** Specify theme properties to override specific styles for calendar parts. Default = {} */
		theme: PropTypes.object,
		/** Collection of dates that have to be marked. Default = {} */
		markedDates: PropTypes.object,
		/** Specify style for calendar container element. Default = {} */
		style: viewPropTypes.style,
		/** Initially visible month. Default = Date() */
		current: PropTypes.any,
		/** Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined */
		minDate: PropTypes.any,
		/** Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined */
		maxDate: PropTypes.any,
		/** If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday. */
		firstDay: PropTypes.number,
		/** Date marking style [simple/period/multi-dot/multi-period]. Default = 'simple' */
		markingType: PropTypes.string,
		/** Hide month navigation arrows. Default = false */
		hideArrows: PropTypes.bool,
		/** Display loading indicator. Default = false */
		displayLoadingIndicator: PropTypes.bool,
		/** Do not show days of other months in month page. Default = false */
		hideExtraDays: PropTypes.bool,
		/** Handler which gets executed on day press. Default = undefined */
		onDayPress: PropTypes.func,
		/** Handler which gets executed on day long press. Default = undefined */
		onDayLongPress: PropTypes.func,
		/** Handler which gets executed when month changes in calendar. Default = undefined */
		onMonthChange: PropTypes.func,
		/** Handler which gets executed when visible month changes in calendar. Default = undefined */
		onVisibleMonthsChange: PropTypes.func,
		/** Replace default arrows with custom ones (direction can be 'left' or 'right') */
		renderArrow: PropTypes.func,
		/** Provide custom day rendering component */
		dayComponent: PropTypes.any,
		/** Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting */
		monthFormat: PropTypes.string,
		/** Disables changing month when click on days of other months (when hideExtraDays is false). Default = false */
		disableMonthChange: PropTypes.bool,
		/**	Hide day names. Default = false */
		hideDayNames: PropTypes.bool,
		/** Disable days by default. Default = false */
		disabledByDefault: PropTypes.bool,
		/** Show week numbers. Default = false */
		showWeekNumbers: PropTypes.bool,
		/** Handler which gets executed when press arrow icon left. It receive a callback can go back month */
		onPressArrowLeft: PropTypes.func,
		/** Handler which gets executed when press arrow icon left. It receive a callback can go next month */
		onPressArrowRight: PropTypes.func,
		/** Disable left arrow. Default = false */
		disableArrowLeft: PropTypes.bool,
		/** Disable right arrow. Default = false */
		disableArrowRight: PropTypes.bool,
		/** Style passed to the header */
		headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
		/** Provide aria-level for calendar heading for proper accessibility when used with web (react-native-web) */
		webAriaLevel: PropTypes.number
	};

	constructor(props) {
		super(props);

		this.style = styleConstructor(this.props.theme);

		this.state = {
			currentMonth: props.current ? parseDate(props.current) : XDate()
		};

		this.updateMonth = this.updateMonth.bind(this);
		this.addMonth = this.addMonth.bind(this);
		this.pressDay = this.pressDay.bind(this);
		this.longPressDay = this.longPressDay.bind(this);
		this.shouldComponentUpdate = shouldComponentUpdate;
	}

	componentWillReceiveProps(nextProps) {
		const current = parseDate(nextProps.current);
		if (current && current.toString("yyyy MM") !== this.state.currentMonth.toString("yyyy MM")) {
			this.setState({
				currentMonth: current.clone()
			});
		}
	}

	updateMonth(day, doNotTriggerListeners) {
		if (day.toString("yyyy MM") === this.state.currentMonth.toString("yyyy MM"))
			return;

		this.setState({
			currentMonth: day.clone()
		}, () => {
			if (!doNotTriggerListeners) {
				const currMont = this.state.currentMonth.clone();
				if (this.props.onMonthChange)
					this.props.onMonthChange(xdateToData(currMont));

				if (this.props.onVisibleMonthsChange)
					this.props.onVisibleMonthsChange([xdateToData(currMont)]);
			}
		});
	}

	_handleDayInteraction(date, interaction) {
		const day = parseDate(date);
		const minDate = parseDate(this.props.minDate);
		const maxDate = parseDate(this.props.maxDate);
		if (!(minDate && !dateutils.isGTE(day, minDate)) && !(maxDate && !dateutils.isLTE(day, maxDate))) {
			const shouldUpdateMonth = this.props.disableMonthChange === undefined || !this.props.disableMonthChange;
			if (shouldUpdateMonth)
				this.updateMonth(day);

			if (interaction)
				interaction(xdateToData(day));
		}
	}

	chooseToday(day) {
		this.pressDay(day);
	}

	pressDay(date) {
		this._handleDayInteraction(date, this.props.onDayPress);
	}

	longPressDay(date) {
		this._handleDayInteraction(date, this.props.onDayLongPress);
	}

	addMonth(count) {
		this.updateMonth(this.state.currentMonth.clone().addMonths(count, true));
	}

	renderDay(day, id) {
		const minDate = parseDate(this.props.minDate);
		const maxDate = parseDate(this.props.maxDate);
		let state = "";
		if (this.props.disabledByDefault)
			state = "disabled";
		else if (minDate && !dateutils.isGTE(day, minDate) || maxDate && !dateutils.isLTE(day, maxDate))
			state = "disabled";
		else if (!dateutils.sameMonth(day, this.state.currentMonth))
			state = "disabled";
		else if (dateutils.sameDate(day, XDate()))
			state = "today";

		const DayComp = this.getDayComponent();
		const date = day.getDate();
		const dateAsObject = xdateToData(day);
		const accessibilityLabel = `${state === "today" ? "today" : ""} ${day.toString("dddd MMMM d")} ${this.getMarkingLabel(day)}`;

		if (!dateutils.sameMonth(day, this.state.currentMonth) && this.props.hideExtraDays) {
			return <View style = {{ width: "8%" }} key = { id }>
				<DayComp
					testID = { `${SELECT_DATE_SLOT}-${dateAsObject.dateString}` }
					state = { state }
					theme = { this.props.theme }
					onPress = { this.pressDay }
					onLongPress = { this.longPressDay }
					date = { dateAsObject }
					marking = { this.getDateMarking(day) }
				>
					{ date }
				</DayComp>
			</View>;
		}

		return (
			<View style = {{ width: "8%" }} key = { id }>
				<DayComp
					testID = { `${SELECT_DATE_SLOT}-${dateAsObject.dateString}` }
					state = { state }
					theme = { this.props.theme }
					onPress = { this.pressDay }
					onLongPress = { this.longPressDay }
					date = { dateAsObject }
					marking = { this.getDateMarking(day) }
					accessibilityLabel = { accessibilityLabel }
				>
					{ date }
				</DayComp>
			</View>
		);
	}

	getMarkingLabel(day) {
		let label = "";
		const marking = this.getDateMarking(day);

		if (marking.accessibilityLabel)
			return marking.accessibilityLabel;

		if (marking.selected) {
			label += "selected ";
			if (!marking.marked)
				label += "You have no entries for this day ";
		}
		if (marking.marked)
			label += "You have entries for this day ";

		if (marking.startingDay)
			label += "period start ";

		if (marking.endingDay)
			label += "period end ";

		if (marking.disabled || marking.disableTouchEvent)
			label += "disabled ";

		return label;
	}

	getDayComponent() {
		if (this.props.dayComponent)
			return this.props.dayComponent;

		switch (this.props.markingType) {
			case "period":
				return UnitDay;
			case "multi-dot":
				return MultiDotDay;
			case "multi-period":
				return MultiPeriodDay;
			case "custom":
				return SingleDay;
			default:
				return Day;
		}
	}

	getDateMarking(day) {
		if (!this.props.markedDates)
			return false;

		const dates = this.props.markedDates[day.toString("yyyy-MM-dd")] || EmptyArray;
		if (dates.length || dates)
			return dates;
		else
			return false;
	}

	renderWeekNumber(weekNumber) {
		return (
			<Day
				key = { `week-${weekNumber}` }
				theme = { this.props.theme }
				marking = {{ disableTouchEvent: true }}
				state = 'disabled'
			>
				{ weekNumber }
			</Day>
		);
	}

	renderWeek(days, id) {
		const week = [];
		days.forEach((day, id2) => {
			week.push(this.renderDay(day, id2));
		}, this);

		if (this.props.showWeekNumbers)
			week.unshift(this.renderWeekNumber(days[days.length - 1].getWeek()));

		return <View style = { this.style.week } key = { id }>{ week }</View>;
	}

	render() {
		const days = dateutils.page(this.state.currentMonth, this.props.firstDay);
		const weeks = [];
		while (days.length)
			weeks.push(this.renderWeek(days.splice(0, 7), weeks.length));

		let indicator;
		const current = parseDate(this.props.current);
		if (current) {
			const lastMonthOfDay = current.clone().addMonths(1, true).setDate(1).addDays(-1).toString("yyyy-MM-dd");
			if (this.props.displayLoadingIndicator
					&& !(this.props.markedDates && this.props.markedDates[lastMonthOfDay]))
				indicator = true;
		}

		return (
			<View
				style = { [this.style.container, this.props.style] }
				accessibilityElementsHidden = { this.props.accessibilityElementsHidden } // iOS
				importantForAccessibility = { this.props.importantForAccessibility } // Android
			>
				<CalendarHeader
					testID = { this.props.testID }
					ref = { c => this.header = c }
					style = { this.props.headerStyle }
					theme = { this.props.theme }
					hideArrows = { this.props.hideArrows }
					month = { this.state.currentMonth }
					addMonth = { this.addMonth }
					showIndicator = { indicator }
					firstDay = { this.props.firstDay }
					renderArrow = { this.props.renderArrow }
					monthFormat = { this.props.monthFormat }
					hideDayNames = { this.props.hideDayNames }
					weekNumbers = { this.props.showWeekNumbers }
					onPressArrowLeft = { this.props.onPressArrowLeft }
					onPressArrowRight = { this.props.onPressArrowRight }
					webAriaLevel = { this.props.webAriaLevel }
					disableArrowLeft = { this.props.disableArrowLeft }
					disableArrowRight = { this.props.disableArrowRight }
				/>
				<View style = { this.style.monthView }>{ weeks }</View>
			</View>);
	}
}

export default Calendar;