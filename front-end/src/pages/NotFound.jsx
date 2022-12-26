import React from "react";

export default function NotFound() {
	return (
		<div className="grid h-screen place-content-center">
			<div className="text-center">
				<strong className="text-9xl font-black text-darkRed">404</strong>

				<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Uh-oh!
				</h1>

				<p className="mt-4 text-gray-500">We can't find that page.</p>

				<a
					href="/"
					className="mt-6 inline-block rounded bg-darkYellow px-5 py-3 text-sm font-medium text-main hover:bg-lemonSh focus:outline-none focus:ring"
				>
					Go Back Home
				</a>
			</div>
		</div>
	);
}
