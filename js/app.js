/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * The navBar to hold the navigation bar element 
 * the sectionLists to hold all sections that exist on the page
 *  the docFragement to improve the performance of the page
*/


const sectionLists = document.querySelectorAll('section');



/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//  A helper function to determine if an element is in the view port; i.e in the visible part of the screen
// An element is visible on the scrren if its boundaries are within the borders of the screen
// reference: https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/ 
function isInViewPort(element)
{
    let bounding = element.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    const navBar = document.querySelector('nav');
    const docFragement = document.createDocumentFragment();
    // First Method: used an ordinary for loop
/**
    * for(let i = 0 ; i < sectionLists.length; i++)
    {
        let listItem = document.createElement('li');
        let linkToCurrentSection = document.createElement('a')
        linkToCurrentSection.textContent = sectionLists[i].getAttribute('data-nav');
        linkToCurrentSection.href = '#' + sectionLists[i].id;
        linkToCurrentSection.classList.add('menu__link');
        listItem.appendChild(linkToCurrentSection);
        docFragement.appendChild(listItem);
    }
*/
    // Second Method: used a for of loop, I think this is way cleaner
    for (let section of sectionLists)
    {
        // Create a List item
        let listItem = document.createElement('li');
        // Creating an anchor element
        let linkToCurrentSection = document.createElement('a')
        // Setting the text of the anchor element
        linkToCurrentSection.textContent = section.getAttribute('data-nav');
        // Setting the link for the anchor element
        linkToCurrentSection.href = '#' + section.id;
        // Adding menu__link class 
        linkToCurrentSection.classList.add('menu__link');
        // Appending the anchor as a child to the list element
        listItem.appendChild(linkToCurrentSection);
        // Appending the finished list item to the document fragment
        docFragement.appendChild(listItem);
    }
    // Appending the fragment to the navbar
    navBar.appendChild(docFragement);

}
// Add class 'active' to section when near top of viewport
function setActiveSection()
{
    // On scrolling, remove your-active-class from all sections and setting it to the only one in viewport
    document.addEventListener('scroll', () => {
        for (let section of sectionLists)
        {
            section.classList.remove('your-active-class');
            if(isInViewPort(section))
                section.classList.add('your-active-class');

        }

    });
}

// Scroll to anchor ID using scrollTO event

function scrollToSection(){
    // Getting all anachor elements in the navbar
    let listItems = document.getElementsByClassName('menu__link');
    for(let listItem of listItems){
        // Adding an event listener to every link to stop default action and use scroll Into view
        listItem.addEventListener('click', (event) => {
            event.preventDefault();
            // Getting the target section by omitting the # sign from the value of the href attribute of the clicked anchor element
            let element = document.getElementById(listItem.getAttribute('href').slice(1));
            element.scrollIntoView({behavior: 'smooth', block: 'center', inline: 'start'});
        });
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/
// When document is loaded, execute above logic
document.addEventListener('DOMContentLoaded', function(){
    // Build menu 
    buildNav();
    // Scroll to section on link click
    scrollToSection();
    // Set sections as active
    setActiveSection();

});


