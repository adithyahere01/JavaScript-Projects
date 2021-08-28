const btns = document.querySelectorAll('.tab-btn');
const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');

about.addEventListener('click', function(e){
   const id = e.target.dataset.id;

   if(id){
       //remove active on all other buttons
       btns.forEach(function(btn){
          btn.classList.remove('active') //remove
          e.target.classList.add('active') //adding to btn which clicked
       })

       //remove content on clicked 
       articles.forEach( (article) => {
          article.classList.remove('active')
       })

       const element = document.getElementById(id); //article id are same as dataset in button
       element.classList.add('active')
   }
})