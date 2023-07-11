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
