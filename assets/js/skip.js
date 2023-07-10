(function ($) {
	// Enable strict mode.
	"use strict";

	// Define global object if it doesn't exist.
	if ("object" !== typeof window.LQ) {
		window.LQ = {};
	}

	LQ.skip = () => {
		const isNull = (element) => {
			if (null === element) {
				return true;
			}

			return false;
		};

		const isEmpty = (element) => {
			if ("" !== element) {
				return false;
			}

			return true;
		};

		// Plugin init
		const init = () => {
			const $this = $(".am-button--skip");

			$this.each((index, button) => {
				const $this = $(button);
				const $id = button.getAttribute("data-skip");

				// Stop if data is null or empty
				if (isNull($id) || isEmpty($id)) {
					return;
				}

				$this.on("click", function () {
					const content = $(`#${$id}`);
					$(content).trigger("focus");
				});
			});
		};

		init();
	};

	LQ.skip();
})(jQuery);
