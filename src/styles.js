import { useWindowDimensions, useColorScheme } from 'react';

const colorScheme = useColorScheme();
const { width, height } = useWindowDimensions();

export const styles = {};

const orientation = height > width ? 'portrait' : 'landscape';
const fontWeight = [{ lighter: 200 }, { light: 300 }, { normal: 400 }, { bold: 700 }, { bolder: 800 }];
const size = orientation === 'portrait' ? height * 0.05 : width * 0.02;
const rems = Array.from({ length: 10 }, (start = 0.875, idx) => start + 0.125 * idx);
const sizes = [0, 25, 50, 75, 100];
const flex = [1, 2];
const colors = {
	gold: '#FECB00',
	gray: '#21252B',
	black: '#000',
	white: '#FFF',
	dark: '#0c0b0b',
	light: '#e0e6ed'
};

const alignment = {
	justifyCenter: { justifyContent: 'center' },
	justifyEvenly: { justifyContent: 'space-evenly' },
	justifyBetween: { justifyContent: 'space-between' },
	flexRow: { flexDirection: 'row' },
	flexCol: { flexDirection: 'col' },
	alignItemsCenter: { alignItems: 'center' },
	alignItemsStart: { alignItems: 'flex-start' },
	alignCenter: { alignSelf: 'center' }
};

Object.entries(colors).forEach(([color, value]) => {
	const colorClass = color.charAt(0).toUpperCase() + color.slice(1);

	styles[`bg${colorClass}`] = value;
	styles[`text${colorClass}`] = value;
});

flex.forEach(flexValue => styles[`flex${flexValue}`] = flexValue);
sizes.forEach(size => {
	styles[`w${size}`] = { width: size / 100 * width };
	styles[`h${size}`] = { height: size / 100 * height };
});

rems.forEach(rem => {
	styles[`${rem}rem`] = rem * size;
});

fontWeight.forEach(weight => {
	const [key, value] = Object.entries(weight);
	const fontClass = key.charAt(0).toUpperCase() + key.slice(1);

	styles[`font${fontClass}`] = { fontWeight: value };
});