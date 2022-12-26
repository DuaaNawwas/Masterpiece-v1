import { Button, Modal } from "flowbite-react";
import React from "react";
import placeholderVid from "../../images/placeholderVid.mp4";

export default function ModalTutorial(props) {
	// if (!props.modalTutorial) return null;
	return (
		<React.Fragment>
			{/* <Button onClick={onClick}>Toggle modal</Button> */}
			<Modal show={props.show} size="3xl" onClose={props.close}>
				{/* <Modal.Header>Terms of Service</Modal.Header> */}
				<Modal.Body>
					<button
						type="button"
						className="text-white bg-myBlack hover:bg-rustySh focus:ring-4 focus:outline-none focus:ring-rusty font-medium rounded-full text-sm p-1 text-center inline-flex items-center absolute z-50 right-7 top-7"
						onClick={props.close}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<div className="space-y-3 text-center text-myBlack">
						<h4 className="mt-1 mb-0 pb-0 text-xl font-semibold capitalize leading-tight">
							Welcome to our family
						</h4>
						<p className="text-base leading-relaxed text-gray-700 capitalize dark:text-gray-400">
							let’s take you on a quick tour in our website
						</p>
						<video
							src={placeholderVid}
							width="700"
							height="240"
							controls
							className="mx-auto"
						></video>
						<p className="text-xl pt-10 pb-10 leading-relaxed text-gray-700 capitalize dark:text-gray-400">
							browse our menus, choose your meals for the week and you’re all
							set! enjoy!
						</p>
					</div>
				</Modal.Body>
				{/* <Modal.Footer>
					
					<Button color="gray" onClick={props.close}>
						Decline
					</Button>
				</Modal.Footer> */}
			</Modal>
		</React.Fragment>
		// <div
		// 	id="extralarge-modal"
		// 	tabindex="-1"
		// 	className={`${
		// 		props.show ? "block" : "hidden"
		// 	} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`}
		// >
		// 	<div className="relative p-4 w-full max-w-7xl h-full md:h-auto">
		// 		<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
		// 			<div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
		// 				<h3 className="text-xl font-medium text-gray-900 dark:text-white">
		// 					Extra Large modal
		// 				</h3>
		// 				<button
		// 					type="button"
		// 					className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
		// 					data-modal-toggle="extralarge-modal"
		// 				>
		// 					<svg
		// 						aria-hidden="true"
		// 						className="w-5 h-5"
		// 						fill="currentColor"
		// 						viewBox="0 0 20 20"
		// 						xmlns="http://www.w3.org/2000/svg"
		// 					>
		// 						<path
		// 							fillRule="evenodd"
		// 							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
		// 							clipRule="evenodd"
		// 						></path>
		// 					</svg>
		// 					<span className="sr-only">Close modal</span>
		// 				</button>
		// 			</div>

		// 			<div className="p-6 space-y-6">
		// 				<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		// 					With less than a month to go before the European Union enacts new
		// 					consumer privacy laws for its citizens, companies around the world
		// 					are updating their terms of service agreements to comply.
		// 				</p>
		// 				<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		// 					The European Union’s General Data Protection Regulation (G.D.P.R.)
		// 					goes into effect on May 25 and is meant to ensure a common set of
		// 					data rights in the European Union. It requires organizations to
		// 					notify users as soon as possible of high-risk data breaches that
		// 					could personally affect them.
		// 				</p>
		// 				<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		// 					With less than a month to go before the European Union enacts new
		// 					consumer privacy laws for its citizens, companies around the world
		// 					are updating their terms of service agreements to comply.
		// 				</p>
		// 				<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		// 					The European Union’s General Data Protection Regulation (G.D.P.R.)
		// 					goes into effect on May 25 and is meant to ensure a common set of
		// 					data rights in the European Union. It requires organizations to
		// 					notify users as soon as possible of high-risk data breaches that
		// 					could personally affect them.
		// 				</p>
		// 				<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		// 					With less than a month to go before the European Union enacts new
		// 					consumer privacy laws for its citizens, companies around the world
		// 					are updating their terms of service agreements to comply.
		// 				</p>
		// 				<p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
		// 					The European Union’s General Data Protection Regulation (G.D.P.R.)
		// 					goes into effect on May 25 and is meant to ensure a common set of
		// 					data rights in the European Union. It requires organizations to
		// 					notify users as soon as possible of high-risk data breaches that
		// 					could personally affect them.
		// 				</p>
		// 			</div>

		// 			<div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
		// 				<button
		// 					data-modal-toggle="extralarge-modal"
		// 					type="button"
		// 					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		// 				>
		// 					I accept
		// 				</button>
		// 				<button
		// 					onClick={props.close}
		// 					type="button"
		// 					className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
		// 				>
		// 					Decline
		// 				</button>
		// 			</div>
		// 		</div>
		// 	</div>
		// </div>
	);
}
