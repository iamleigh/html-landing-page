# Challenge Notes

Brief introduction here...

## Skip buttons

I was trained in accessibility by my good friend and expert in accessibility,
Alex Stine. One of the first things he taught me was to always include an skip
button for sections.

For screen reader users this is highly important since it helps them navigate
faster through the content.

However, every rule has its exception, so strategically "forget" an skip button
at the beginning of a section is good when we want the user to interact with
certain content.

For example, on the Landing Page created for the Challenge #2, we can skip the
testimonials section, however is important to let the user read the **Highlights**
section since this contain important features from the plugin that user needs
to read in order to be persuaded into buying the product. The same thing happens
with the **Upsells** section.

## `<blockquote>` for testimonials

To have properly accessible testimonials, is better to wrap them inside
a `blockquote` tag.\

For the author, is always better to use `<cite>` tag.

For the rating stars, is better to have a legend or `aria-label` as I did
and hide the stars for screen readers. The legend or label will notify user
about the rating number, so having the stars accessible by the screen reader
won't be necessary and actually might feel confusing.

## Box Shadow vs Drop Shadow

Making a quick research around WPForms, I noticed you use `drop-shadow()`
filter as it appears on Figma for shadows on images.\

Even when it filters are amazing and give a nice look, most of the times
are not necessarily, specially when if you consider that filters
ralentize the performance.\

Figma uses `filter` property with `drop-shadow()` instead of `box-shadow`
property because graphics inserted are interpreated as SVGs.\

Having that in mind, the `filter` property is a requirement. However, if
you select the **Inner Shadow** option, they wrap it inside a `div` to be
able to apply `box-shadow` since `filter` doesn't support inner/inset
shadows.
