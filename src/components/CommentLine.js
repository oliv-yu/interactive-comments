import { useContext, useState } from 'react'
import { CurrentUserContext } from '../utils/Context'
import Comment from './Comment'
import TextEditor from './TextEditor'

function CommentLine({
	id,
	score,
	user,
	content,
	created,
	onDelete,
	onEdit,
	replies,
}) {
	const currentUser = useContext(CurrentUserContext)

	const [addingReply, setAddingReply] = useState(false)

	const _handleAddReply = (replyContent) => {
		onEdit({
			replies: [
				...replies,
				{
					id: `${id}-${replies.length}`,
					content: replyContent,
					created: Date.now(),
					user: currentUser,
					score: 0,
					replies: [],
				},
			],
		})

		setAddingReply(false)
	}

	const _handleEditReply = (replyId, edits = {}) => {
		onEdit({
			replies: replies.map((reply) => {
				if (reply.id === replyId) {
					return { ...reply, ...edits }
				}
				return reply
			}),
		})
	}

	const _handleDeleteReply = (replyId) => {
		onEdit({
			replies: replies.filter((reply) => reply.id !== replyId),
		})
	}

	return (
		<div className="comment-line">
			<Comment
				score={score}
				user={user}
				content={content}
				created={created}
				onDelete={onDelete}
				onEdit={onEdit}
				onReply={() => setAddingReply(true)}
			/>

			<div className="comment-replies">
				{!!replies.length &&
					replies.map((reply) => (
						<CommentLine
							key={reply.id}
							id={reply.id}
							score={reply.score}
							user={reply.user}
							content={reply.content}
							created={reply.created}
							onDelete={() => _handleDeleteReply(reply.id)}
							onEdit={(edits) => _handleEditReply(reply.id, edits)}
							replies={reply.replies}
						/>
					))}

				{addingReply && (
					<TextEditor
						className="white reply"
						placeholder="Add a reply..."
						onSubmit={_handleAddReply}
						type="reply"
					>
						<button
							className="btn btn-light btn-sm"
							onClick={() => setAddingReply(false)}
						>
							x
						</button>
					</TextEditor>
				)}
			</div>
		</div>
	)
}

export default CommentLine
