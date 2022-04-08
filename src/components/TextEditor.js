import { useContext, useEffect, useRef, useState } from 'react'
import enterIcon from '../icons/icon-enter.svg'
import { CurrentUserContext } from '../utils/Context'

function TextEditor({
	onSubmit,
	className = '',
	initialContent = '',
	placeholder = 'Add a comment...',
	replyTo,
	type = 'send',
	children,
}) {
	const currentUser = useContext(CurrentUserContext)

	const textAreaRef = useRef(null)
	const [content, setContent] = useState(
		replyTo ? `@${replyTo} ${initialContent}` : `${initialContent}`
	)

	const [parentHeight, setParentHeight] = useState('auto')
	const [textAreaHeight, setTextAreaHeight] = useState('auto')

	const _handleChange = (event) => {
		setTextAreaHeight('auto')
		setParentHeight(`${textAreaRef.current.scrollHeight}px`)

		setContent(event.target.value)
	}

	const _handleSubmit = (event) => {
		event.preventDefault()
		if (content.trim()) {
			onSubmit(content.trim())
			_clearContent()
		}
	}

	const _clearContent = () => {
		setContent('')
		setParentHeight('auto')
		setTextAreaHeight('auto')
	}

	useEffect(() => {
		setParentHeight(`${textAreaRef.current.scrollHeight}px`)
		setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`)
	}, [content])

	return (
		<form className={`text-editor ${className}`} onSubmit={_handleSubmit}>
			{type !== 'update' && (
				<div className="text-editor-user-icon">
					<img
						src={require(`../images/avatars/image-${currentUser.username}.webp`)}
						alt={currentUser.username}
					/>
				</div>
			)}

			<div
				className="text-editor-textarea"
				style={{
					height: parentHeight,
				}}
			>
				<textarea
					ref={textAreaRef}
					value={content}
					placeholder={placeholder}
					onChange={_handleChange}
					style={{
						height: textAreaHeight,
					}}
				/>
			</div>

			<button type="submit" className="btn btn-light btn-sm text-editor-submit">
				<img src={enterIcon} alt="enter-icon" />
				<span className="btn-text">{type.toLocaleUpperCase()}</span>
			</button>

			{children}
		</form>
	)
}

export default TextEditor
