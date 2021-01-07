import React, { Component } from 'react';
import { Animated, Easing, Dimensions } from 'react-native';

const dimension = Dimensions.get('screen');

/**
 * @classdesc Component to render different types of animations with the timing() function.
 */

class Animation extends Component {
	constructor(props) {
		super(props);

		this.state = { animated: new Animated.Value(
			this.props.initial.ratio * dimension[this.props.initial.screen]
			|| this.props.initial
		) };
	}

	timing(animatedObject, callback) {
		Animated.timing(this.state.animated, animatedObject).start(() => callback && callback());
	}

	render() {
		const { containerStyle, children, type, property } = this.props;

		switch (type) {
			case 'View':
				return (
					<Animated.View style = { [containerStyle, { [property]: this.state.animated }] }>
						{ children }
					</Animated.View>
				);
		}
	}
}

/**
 * @classdesc Utility class for Animation component. Used to start a transition with the Animation class and
 *            static sliding() function.
 *
 * @typedef {Object} Anim
 *		@property {number}                toValue          Maximum value the animated value will reach.
 *		@property {number=}               duration         Duration of animation.
 *		@property {number=}               delay            Delay for animation to start.
 *		@property {(string | string[])=}  easing           Easing function for animation.
 *		@property {(number | Object)=}    easeValue        Value for easing function.
 *		@property {Object}                relative         toValue with respect to device screen.
 *		@property {number}                relative.ratio   Ratio to scale.
 *		@property {string}                relative.screen  Screen dimension to scale ratio with. ['height', 'width']
 */

export class Animate {
	/**
	 * @description Animation component that animates a View based on the static animation() function.
	 *
	 * @param {string}           type            Type of Animation. ['View']
	 * @param {Object}           containerStyle  Style of Animation component.
	 * @param {string}           property        Property to modify with animation methods.
	 * @param {number | Object}  initial         Initial value for property.
	 * @param {number}           initial.ratio   Ratio to scale with respect to device screen.
	 * @param {string}           initial.screen  Screen dimension to scale ratio with. ['height', 'width']
	 */

	static Animate = props => (
		<Animation { ...props } ref = { animated => (this.Animation = animated) }>
			{ props.children }
		</Animation>
	)

	static resolveEasing(easing, value) {
		if (!easing) return;

		let easingFunction = new Set(['poly', 'elastic', 'back', 'bezier', 'in', 'out', 'inOut']);
		let ease;

		if (typeof easing === 'string')
			easing = [easing];

		while (easing.length > 0) {
			let easeFn = easing.pop();

			if (easingFunction.has(easeFn))
				ease = Easing[easeFn](ease || value);
			else
				ease = Easing[easeFn];
		}

		return ease;
	}

	/**
	 * @description Static function to execute an animation with the timing Animated function.
	 *
	 * @param {Anim}       animation  Animated object for timing function.
	 * @param {Function=}  callback   (Optional) Function to execute after animation is done.
	 */

	static animation({ toValue, relative: { ratio = 0.5, screen = 'height' }, duration, delay, easing, easeValue }, callback) {
		this.Animation.timing({
			toValue: toValue || dimension[screen] * ratio,
			easing: this.resolveEasing(easing, easeValue),
			duration,
			delay
		}, callback);
	}
}