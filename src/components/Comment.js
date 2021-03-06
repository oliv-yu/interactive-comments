import { useContext, useState } from 'react'
import Modal from './Modal'
import TextEditor from './TextEditor'
import plusIcon from '../icons/icon-plus.svg'
import minusIcon from '../icons/icon-minus.svg'
import deleteIcon from '../icons/icon-delete.svg'
import editIcon from '../icons/icon-edit.svg'
import replyIcon from '../icons/icon-reply.svg'
import { CurrentUserContext } from '../utils/Context'
import { USERS } from '../utils/data'
import { formatMentionText, timeSince } from '../utils/utils'

function Comment({ score, user, content, created, onDelete, onEdit, onReply }) {
	const currentUser = useContext(CurrentUserContext)

	const [isEditing, setIsEditing] = useState(false)

	const _handleDownVote = () => {
		onEdit({ score: score - 1 })
	}

	const _handleUpVote = () => {
		onEdit({ score: score + 1 })
	}

	const _handleEdit = (content) => {
		onEdit({ content })
		setIsEditing(false)
	}

	const isAuthor = user.username === currentUser.username

	return (
		<div className="comment">
			<div className="comment-left">
				<div className="comment-score">
					<button className="btn btn-light btn-sm" onClick={_handleUpVote}>
						<img src={plusIcon} alt="plus-icon" />
					</button>
					<div className={`comment-score-number ${score < 0 && 'negative'}`}>
						{score.toString()}
					</div>
					<button className="btn btn-light btn-sm" onClick={_handleDownVote}>
						<img src={minusIcon} alt="minus-icon" />
					</button>
				</div>
			</div>

			<div className="comment-right">
				<div className="comment-header">
					<span className="comment-user-icon">
						<img
							src={require(`../images/avatars/image-${user.username}.webp`)}
							alt={user.username}
						/>
					</span>
					<span className="comment-username">{user.username}</span>
					{isAuthor && <span className="comment-self-you">you</span>}
					<span className="comment-time-ago">
						{timeSince(created) + ' ago'}
					</span>
					<span className="comment-actions">
						{isAuthor ? (
							<>
								<Modal onSubmit={onDelete}>
									<button className="btn btn-link delete">
										<img src={deleteIcon} alt="delete-icon" />
										<span className="btn-text">Delete</span>
									</button>
								</Modal>

								<button
									className="btn btn-link edit"
									disabled={isEditing}
									onClick={() => setIsEditing(true)}
								>
									<img src={editIcon} alt="edit-icon" />
									<span className="btn-text">Edit</span>
								</button>
							</>
						) : (
							<button onClick={onReply} className="btn btn-link reply">
								<img src={replyIcon} alt="reply-icon" />
								<span className="btn-text">Reply</span>
							</button>
						)}
					</span>
				</div>

				{isEditing ? (
					<TextEditor
						onCancel={() => setIsEditing(false)}
						initialContent={content}
						onSubmit={_handleEdit}
						type="update"
					/>
				) : (
					<div className="comment-content">
						{formatMentionText(content, Object.keys(USERS))}
					</div>
				)}
			</div>
		</div>
	)
}

export default Comment
