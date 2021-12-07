// crapy solution (I know) but it gets the job done

const navigationNodesCurrentPage = Array.from(
  window.document.getElementsByClassName(page.toLowerCase())
);
const navigationNodesCurrentPageMobile = Array.from(
  window.document.getElementsByClassName(page.toLowerCase() + "Mobile")
);

for (const element of navigationNodesCurrentPage) {
  // clear the class list
  element.classList.remove(...element.classList);
  // add the classes for the current element
  element.classList.add("bg-gray-900");
  element.classList.add("text-white");
  element.classList.add("px-3");
  element.classList.add("py-2");
  element.classList.add("text-sm");
  element.classList.add("font-medium");
  element.classList.add("rounded-md");
}

for (const element of navigationNodesCurrentPageMobile) {
  // clear the class list
  element.classList.remove(...element.classList);
  // add the classes for the current element
  element.classList.add("bg-gray-900");
  element.classList.add("text-white");
  element.classList.add("px-3");
  element.classList.add("py-2");
  element.classList.add("text-base");
  element.classList.add("font-medium");
  element.classList.add("rounded-md");
  element.classList.add("block");
}
