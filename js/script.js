'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!', event);

  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /*[Done] add class 'active' to thcle clicked link */

  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /*[DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }
  /*[DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log('articleSelector', articleSelector);
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  console.log('clickedElement:', targetArticle);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagSelector ='.post-tags .list';

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    console.log('show HTML', linkHTML);
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  
  for (let article of articles) {
    /* find tags wrapper */
    const TagsWrapper = article.querySelector(optArticleTagSelector);
    
    /* make html variable with empty string */
    let html =''
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray =articleTags.split(' ');
    console.log(articleTagsArray);
    
   /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      console.log('tag' , tag);
       /* generate HTML of the link */
       const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li> ';
      /* add generated code to html variable */
      html= html+ tagLinkHTML;
    /* END LOOP: for each tag */
   
    } 
    /* insert HTML of all the links into the tags wrapper */
    TagsWrapper.innerHTML = html;
    const Tags = document.querySelectorAll('.list list-horizontal');
    console.log(Tags);
  
  } 

  
  
  /* END LOOP: for every article: */
  }

generateTags();