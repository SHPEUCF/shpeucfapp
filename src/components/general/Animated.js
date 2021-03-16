import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import _ from 'lodash';
import { Animated as Animate, Easing, ViewStyle } from 'react-native';

/**
 * Resolve easing functions as nested or sequential animations.
 * @link https://easings.net/
 *
 * @param {string | string[]} easing  Curve functions to use for animation
 */

const resolveEasing = easing => {
	if (!easing) return;

	let ease;
	const easingFunction = ['poly', 'elastic', 'back', 'bezier', 'in', 'out', 'inOut'];

	if (_.isString(easing))
		easing = [easing];

	while (easing.length > 0) {
		let easeFn = easing.pop();

		ease = easingFunction.includes(easeFn) ? Easing[easeFn](ease || 1) : Easing[easeFn];
	}

	return ease;
};

/**
 * Determine if property is part of the transform style.
 *
 * @param {string} property Style property to check
 */

const isTransformProp = property =>
	['matrix', 'perspective', 'rotate', 'rotateX', 'rotateY', 'rotateZ',
		'scale', 'scaleX', 'scaleY', 'translateX', 'translateY', 'skewX', 'skewY'].includes(property);

/**
 * @callback Animation
 * @param {'decay' | 'timing' | 'spring'}                   animationType Type of animating function
 * @param {{ easing: string | string[] }
 *         & Omit<Animate.TimingAnimationConfig
 *              & Animate.DecayAnimationConfig
 *              & Animate.TimingAnimationConfig, 'easing'>} config        Animating function configuration
 * @returns {Animate.CompositeAnimation}
 *
 * @typedef {Object} AnimatedInner
 * @prop {Animation} animation Animating function for component
 *
 * @typedef {Object} AnimatedComponentProps
 * @prop {string}                                property     Property to animate over
 * @prop {number=}                               initial      Initial value for property
 * @prop {string}                                component    Animated component for animating
 * @prop {{ property: string, ranges: Object }=} interpolate  Interpolate values for interpolate function
 * @prop {ViewStyle}                             style        Style for animated component
 * @prop {{ current: AnimatedInner }}            ref          Reference for inner animated component functions
 */

/**
 * @type {React.FC<AnimatedComponentProps>}
 */

const AnimatedComponent = forwardRef(({ property, initial = 0, interpolate = {}, component, children, style }, ref) => {
	const animatedProperty = useRef(new Animate.Value(initial)).current;

	useImperativeHandle(ref, () => ({
		animation: (animationType, { easing, ...config }) =>
			Animate[animationType](animatedProperty,
				{ easing: resolveEasing(easing), ...config }
			)
	}));

	const AnimationComponent = props => {
		let Component = Animate[component];

		return <Component { ...props } />;
	};

	const transform = [];
	const animationStyle = {};

	if (property && isTransformProp(property))
		transform.push({ [property]: animatedProperty });
	else if (property)
		animationStyle[property] = animatedProperty;

	if (interpolate.property && isTransformProp(interpolate.property))
		transform.push({ [interpolate.property]: animatedProperty.interpolate(interpolate.ranges) });
	else if (interpolate.property)
		animationStyle[interpolate.property] = animatedProperty.interpolate(interpolate.ranges);

	return (
		<AnimationComponent style = { [style, animationStyle, { transform }] }>
			{ children }
		</AnimationComponent>
	);
});

/**
 * @typedef {Pick<Animate, 'parallel' | 'sequence' | 'stagger'>} AnimatedFunctions
 *
 * @typedef {Object} Animated
 * @prop {React.FC<AnimatedComponentProps>} Image     Animated Image
 * @prop {React.FC<AnimatedComponentProps>} Text      Animated Text
 * @prop {React.FC<AnimatedComponentProps>} View      Animated View
 * @prop {React.FC<AnimatedComponentProps>} FlatList  Animated FlatList
 */

/**
 * Must pass `ref` to access inner animation functions.
 *
 * @type {AnimatedFunctions & Animated & AnimatedInner}
 */

export const Animated = {
	parallel: Animate.parallel,
	sequence: Animate.sequence,
	stagger: Animate.stagger,
	Image: forwardRef((props, ref) => <AnimatedComponent component = 'Image' ref = { ref } { ...props } />),
	Text: forwardRef((props, ref) => <AnimatedComponent component = 'Text' ref = { ref } { ...props } />),
	View: forwardRef((props, ref) => <AnimatedComponent component = 'View' ref = { ref } { ...props } />),
	FlatList: forwardRef((props, ref) => <AnimatedComponent component = 'FlatList' ref = { ref } { ...props } />)
};