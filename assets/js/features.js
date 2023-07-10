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
})();
