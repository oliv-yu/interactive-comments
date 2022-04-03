/*
 * Determine how long it has been since a given date.
 * @param {Date} date - The date to return the difference from.
 * @return {string} - The difference in time (e.g. "2 days ago").
 *
 * Source: https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
 */
export const timeSince = (date) => {
	const seconds = Math.floor((new Date() - date) / 1000)

	let interval = seconds / 31536000

	if (interval > 1) {
		return Math.floor(interval) + ' years'
	}
	interval = seconds / 2592000
	if (interval > 1) {
		return Math.floor(interval) + ' months'
	}
	interval = seconds / 604800
	if (interval > 1) {
		return Math.floor(interval) + ' weeks'
	}
	interval = seconds / 86400
	if (interval > 1) {
		return Math.floor(interval) + ' days'
	}
	interval = seconds / 3600
	if (interval > 1) {
		return Math.floor(interval) + ' hours'
	}
	interval = seconds / 60
	if (interval > 1) {
		return Math.floor(interval) + ' minutes'
	}
	return 'Less than a minute'
}

/**
 * Find and highlight mention given a matching pattern within a block of text
 * @param {string} text - The text to parse
 * @param {array} values - Values to highlight
 * @param {RegExp} regex - The search pattern to highlight
 * @return {object} A JSX object containing an array of alternating strings and JSX
 *
 * Source: https://github.com/facebook/react/issues/3386
 */
export const formatMentionText = (
	text,
	values,
	regex = new RegExp(/@([\w\d]+)/g),
	prefix = '@'
) => {
	if (!values.length) return text

	return (
		<div>
			{text.split(regex).reduce((prev, current, i) => {
				if (!i) return [current]

				return prev.concat(
					values.includes(current) ? (
						<span className="mention" key={i + current}>
							{`@${current}`}
						</span>
					) : (
						current
					)
				)
			}, [])}
		</div>
	)
}
