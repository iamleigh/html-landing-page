/*!
 * Form Pages CSS (leighton-quito-aml)
 * 
 * Copyright 2023 Leighton Quito (https://iamleigh.com)
 * Licensed under MIT (https://opensource.org/license/mit/)
 */
(function () {
	// Enable strict mode.
	"use strict";

	// Define global object if it doesn't exist.
	if ("object" !== typeof window.LQ) {
		window.LQ = {};
	}

	LQ.features = [
		{
			icon: "eye",
			title: "Distraction Free<br/>Landing Pages",
			desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna.",
		},
		{
			icon: "brush",
			title: "Multiple Styles to<br/>Choose From",
			desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna.",
		},
		{
			icon: "palette",
			title: "Pre-made & Custom<br/>Color Schemes",
			desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna.",
		},
		{
			icon: "image",
			title: "Custom Logo<br/>Support",
			desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna.",
		},
		{
			icon: "smile",
			title: "No Coding Knowledge<br/>Required",
			desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna.",
		},
		{
			icon: "check",
			title: "Quick & Easy<br/>Setup",
			desc: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna.",
		},
		{
			icon: "mail",
			title: "Lead Generation",
			desc: "Make subscribing to your email list super simple for users by creating a webpage dedicated solely to signing up.",
		},
		{
			icon: "chart",
			title: "Surveys",
			desc: "Collect feedback from website visitors or customers and analyze their responses to make data-driven decisions to grow your business.",
		},
		{
			icon: "membership",
			title: "Membership Sites",
			desc: "Create a form landing web page on your site with user registration and login forms, making it easier on people to sign up and login to your site.",
		},
	];

	LQ.listFeatures = (element, limit) => {
		const $this = document.getElementById(element);
		const $limit = parseInt(limit);

		// Plugin init
		const init = () => {
			// Build list wrapper
			$this.setAttribute("role", "list");
			$this.classList.add("am-grid");

			// Get features based on limit
			const features = Number.isNaN($limit)
				? LQ.features
				: $limit >= 0
					? LQ.features.slice(0, $limit)
					: LQ.features.slice($limit);

			// Check if listed features length is odd
			if (features.length > 1 && features.length % 2 != 0) {
				$this.classList.add("am-grid--bypass");
			}

			// Build list item
			for (let feat of features) {
				const listitem = document.createElement("div");
				listitem.setAttribute("role", "listitem");
				listitem.classList.add("am-grid__item");

				const feature = document.createElement("div");
				feature.setAttribute("role", "presentation");
				feature.classList.add("am-feature");

				const icon = document.createElement("span");
				icon.setAttribute("aria-hidden", "true");
				icon.classList.add(
					"amicons",
					`amicons--${feat.icon}`,
					"amicons--lg",
					"am-feature__icon"
				);

				const title = document.createElement("p");
				title.classList.add("am-feature__title");
				title.innerHTML = feat.title;

				const desc = document.createElement("p");
				desc.classList.add("am-feature__content");
				desc.innerHTML = feat.desc;

				feature.append(icon);
				feature.append(title);
				feature.append(desc);

				listitem.append(feature);

				$this.append(listitem);
			}
		};

		init();
	};

	LQ.listFeatures("am-features-highlight", 6);
	LQ.listFeatures("am-features-upsells", -3);
})();

(function () {
	// Enable strict mode.
	"use strict";

	// Define global object if it doesn't exist.
	if ("object" !== typeof window.LQ) {
		window.LQ = {};
	}

	LQ.reviews = [
		{
			comment:
				"The user interface is very smooth, and quite quick. It does open a separate screen for form creation and editing, but I suspect it does this to improve flow and speed.",
			author: "WebEndev",
			stars: 5,
		},
		{
			comment:
				"I don't know why the existing form plugins never thought of templates. 99% of people installing this plugin want a simple contact form. Instead of you having to build it, you click the Simple Contact Form template and its built for you!",
			author: "Bill Erickson",
			stars: 5,
		},
		{
			comment:
				"I've used this plugin on several sites Ive built and its perfect  easty to use, and just works. Very grateful that this plugin exists.",
			author: "LouisePKelly",
			stars: 5,
		},
	];

	LQ.listReviews = (element, limit) => {
		const $this = document.getElementById(element);
		const $limit = parseInt(limit);

		// Plugin init
		const init = () => {
			// Build list wrapper
			$this.setAttribute("role", "list");
			$this.classList.add("am-row");

			// Get reviews based on limit
			const reviews = Number.isNaN($limit)
				? LQ.reviews
				: $limit >= 0
					? LQ.reviews.slice(0, $limit)
					: LQ.reviews.slice($limit);

			// Build list item
			for (let review of reviews) {
				const listitem = document.createElement("div");
				listitem.setAttribute("role", "listitem");
				listitem.classList.add("am-col", "am-col--4");

				// Review main wrapper
				// <blockquote class="am-testimonials" />
				const wrapper = document.createElement("blockquote");
				wrapper.classList.add("am-testimonial");

				// Review content
				// <p class="am-testimonial__text" />
				const testimonial = document.createElement("p");
				testimonial.classList.add("am-testimonial__text");
				testimonial.innerHTML = `"${review.comment}"`;

				// Review details
				// <address class="am-testimonial__details" />
				const details = document.createElement("address");
				details.setAttribute("role", "none");
				details.classList.add("am-testimonial__details");

				// Review author
				// Goes inside the "review details" container
				// <span class="am-testimonial__author" />
				const author = document.createElement("span");
				author.classList.add("am-testimonial__author");
				author.innerHTML = `<span role="none" class="am-screen-reader-only">Testimonial by </span>- ${review.author}`;

				// Review rating
				// Goes inside the "review details" container
				// <span class="am-testimonial__rating" />
				const rating = document.createElement("span");
				rating.classList.add("am-testimonial__rating");
				rating.setAttribute(
					"aria-label",
					`(${review.stars} of 5 stars rating)`
				);

				// Review rating stars
				// <span class="am-testimonial__star" />
				for (let i = 1; i < 6; i++) {
					const star = document.createElement("span");
					star.classList.add(
						"amicons",
						"amicons--star",
						"amicons--sm",
						"am-testimonial__star"
					);
					star.setAttribute("aria-hidden", "true");

					if (i <= review.stars) {
						star.classList.add("am-testimonial__star--filled");
					}

					// Insert stars inside "review rating" container
					rating.append(star);
				}

				details.append(author);
				details.append(rating);

				wrapper.append(testimonial);
				wrapper.append(details);

				listitem.append(wrapper);

				$this.append(listitem);
			}
		};

		init();
	};

	LQ.listReviews("am-list-reviews");
})();

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
