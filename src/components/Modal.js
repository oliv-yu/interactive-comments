import { useEffect, useState } from 'react'

function Modal({
	children,
	onSubmit,
	title = 'Delete comment',
	body = "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
	cancelText = 'No, Cancel',
	submitText = 'Yes, Delete',
}) {
	const [isOpen, setIsOpen] = useState(false)

	const _handleOpen = () => {
		document.body.style.overflow = 'hidden'
		setIsOpen(true)
	}

	const _handleClose = () => {
		document.body.style.overflow = 'auto'
		setIsOpen(false)
	}

	const _handleSubmit = () => {
		_handleClose()
		onSubmit()
	}

	useEffect(() => {
		const clickOutsideModal = (event) => {
			if (event.target.classList.contains('modal')) {
				_handleClose()
			}
		}

		const escapeModal = (event) => {
			if (event.key === 'Escape') {
				_handleClose()
			}
		}

		document.addEventListener('keydown', escapeModal, false)
		document.addEventListener('click', clickOutsideModal, false)

		return () => {
			setIsOpen(false)
		}
	}, [])

	return (
		<>
			<span onClick={_handleOpen}>{children}</span>

			{isOpen && (
				<>
					<div className="modal" tabIndex="-1" role="dialog">
						<div className="modal-dialog" role="document">
							<div className="modal-content">
								<div className="modal-header">
									<h5 className="modal-title">{title}</h5>
								</div>
								<div className="modal-body">
									<p>{body}</p>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										onClick={_handleClose}
										className="btn btn-secondary cancel"
									>
										{cancelText.toLocaleUpperCase()}
									</button>
									<button
										type="button"
										onClick={_handleSubmit}
										className="btn btn-primary submit"
									>
										{submitText.toLocaleUpperCase()}
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="modal-backdrop fade show" />
				</>
			)}
		</>
	)
}

export default Modal
