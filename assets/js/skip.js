(function () {
	// Enable strict mode.
	"use strict";

	// Define global object if it doesn't exist.
	if (typeof window.LQ !== "object") {
		window.LQ = {};
	}

	LQ.skip = () => {
		// Helper functions
		const isNull = (element) => element === null;
		const isEmpty = (element) => element === "";

		// Plugin init
		const init = () => {
			const buttons = document.querySelectorAll(".am-button--skip");

			buttons.forEach((button) => {
				const id = button.getAttribute("data-skip");

				// Stop if data is null or empty
				if (isNull(id) || isEmpty(id)) {
					return;
				}

				button.addEventListener("click", () => {
					const content = document.getElementById(id);
					if (content) {
						content.focus();
					}
				});
			});
		};

		init();
	};

	LQ.skip();
})();
