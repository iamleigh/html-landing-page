(function () {
	// Enable strict mode.
	"use strict";

	// Define global object if it doesn't exist.
	if ("object" !== typeof window.LQ) {
		window.LQ = {};
	}

	/**
	 * Handle click events on the video thumbnails
	 * @param  {Event} event The event object
	 */
	LQ.videoPlayer = () => {
		/**
		 * Handle click events on the video thumbnails
		 * @param  {Event} event The event object
		 */
		const clickHandler = (event) => {
			// Get the video link
			const link = event.target.closest("[data-youtube]");

			// Stop event if there's no link
			if (!link) return;

			// Prevent the URL from redirecting users
			event.preventDefault();

			// Get the video ID
			const id = link.getAttribute("data-youtube");

			// Create the player wrapper
			const wrapper = document.createElement("div");
			wrapper.setAttribute("role", "presentation");
			wrapper.classList.add("am-video");

			// Create the player
			const player = document.createElement("div");
			player.setAttribute("role", "presentation");
			player.classList.add("am-video__player", "am-image");

			// Insert iframe
			player.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="YouTube video player" frameborder="0" class="am-video__iframe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" allowfullscreen></iframe>`;

			// Insert player into wrapper
			wrapper.append(player);

			// Inject the player into the UI
			link.replaceWith(wrapper);
		};

		// Plugin init
		const init = () => {
			const videos = document.querySelectorAll("[data-youtube]");

			for (let video of videos) {
				const id = new URL(video.href).searchParams.get("v");

				video.setAttribute("data-youtube", id);
				video.setAttribute("role", "button");
				video.removeAttribute("rel");
				video.removeAttribute("target");

				// Create icon
				const icon = document.createElement("span");
				icon.classList.add(
					"amicons",
					"amicons--play-circle",
					"am-video__icon"
				);
				icon.setAttribute("aria-hidden", "true");

				// Create thumbnail
				const thumbnail = document.createElement("img");
				thumbnail.setAttribute(
					"src",
					"./assets/images/video-thumbnail.png"
				);
				thumbnail.setAttribute(
					"srcset",
					"./assets/images/video-thumbnail.png 1x, ./assets/images/video-thumbnail@2x.png 2x"
				);
				thumbnail.setAttribute("alt", "Form Pages");
				thumbnail.classList.add("am-image");
				thumbnail.setAttribute("aria-hidden", "true");

				// Create label
				const label = document.createElement("span");
				label.classList.add("am-screen-reader-only");
				label.innerHTML = video.textContent;

				// Clear content from video link
				video.innerHTML = "";

				// Append content
				video.append(icon);
				video.append(thumbnail);
				video.append(label);
			}

			// Detect clicks on the video thumbnails
			document.addEventListener("click", clickHandler);
		};

		init();
	};

	LQ.videoPlayer();
})();
