// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
// select span
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();

const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');


navToggle.addEventListener('click', () => {
   // linksContainer.classList.toggle('show-links')
   const containerHeight = linksContainer.getBoundingClientRect().height;
   const linksHeight = links.getBoundingClientRect().height;

   if(containerHeight === 0){
       linksContainer.style.height = `${linksHeight}px` /*this is inline style so need to style !important for larger screens */
   }
   else{
       linksContainer.style.height = 0
   }
})

//fixed navbar
const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function(){
    //scroll height
    const scrollHeight = window.pageYOffset;

    //first have to get height of navbar 
    const navHeight = navbar.getBoundingClientRect().height;

    if(scrollHeight > navHeight){
        navbar.classList.add('fixed-nav')
    }else{
        navbar.classList.remove('fixed-nav')
    }

    //top-link JS
    if(scrollHeight > 300){
        topLink.classList.add('show-link')
    }else{
        topLink.classList.remove('show-link')
    }
})

//Fixed navbar + scroll section problem fixing
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
       e.preventDefault(); //preventing links to scroll
    
       //navigate to specific spot
       const id = e.currentTarget.getAttribute('href').slice(1); //slice removes # from id
       const element = document.getElementById(id); //passing id

       
       //calculate heights
       const navHeight = navbar.getBoundingClientRect().height;
       const containerHeight = linksContainer.getBoundingClientRect().height;
       const fixedNav = navbar.classList.contains('fixed-nav'); //say whether navbar is fixed or not

       let position = element.offsetTop - navHeight; //postion of section from tops

       if(!fixedNav){
           position = position - navHeight; 
       }

       //for mobile screens
       if(navHeight > 82){ 
          position = position + containerHeight;
       }
       window.scrollTo({
           left: 0,
           top: position 
       })

       //close navbar once selected
       linksContainer.style.height = 0;
       
    }) 
})
