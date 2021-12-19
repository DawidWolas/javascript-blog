'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTagLink: Handlebars.compile(document.querySelector('#template-article-tag-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#template-article-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}



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
  optArticleTagSelector ='.post-tags .list',
  optArticleAuthorSelector='.post-author',
  optTagsListSelector='.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list',
  optCloudClassCountAuthor = 5,
  optCloudClassPrefixAuthor ='author-size-';

function generateTitleLinks( customSelector ='') {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(articles);
  let html = '';
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* get the title from the title element */

    /* create HTML of the link */
    // const linkHTML ='<li><a href="#' +articleId +'"><span>' +articleTitle +'</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData); 
      
      
      
      
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
function calculateTagsParams(tags) {
  /*CREATE nefw variable with object max value , min value */ 
  const params = { max : 0 , min : 999999};
  /*START LOOP: for each tag in tags*/
  for (let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times ');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }else if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
   return params; 
  }
function calculateTagClass(count ,params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return optCloudClassPrefix + classNumber;
}

 
function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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
      const tagHTMLData = {id:TagsWrapper, title:articleTags};
    const tagLinkHTML = templates.articleTagLink(tagHTMLData); 
      /* add generated code to html variable */
      html= html+ tagLinkHTML;

      
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
   
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
     } 
    
    /* insert HTML of all the links into the tags wrapper */
    TagsWrapper.innerHTML = html;
    const Tags = document.querySelectorAll('.list list-horizontal');
    console.log(Tags);
  
 

  
  
  /* END LOOP: for every article: */
 }
 /* [NEW] find list of tags in right column */
 const tagList = document.querySelector(optTagsListSelector);
/* [NEW] create variable for all links HTML code */
const tagsParams = calculateTagsParams(allTags);
console.log('tagsparams' , tagsParams)
const allTagsData = {tags:[]};

/*[NEW] START LOOP: for each tag in allTags: */
for (let tag in allTags){
  
   const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a>(' + allTags[tag] +')</li>';
  allTagsData.tags.push({
    tag: tag,
    count: allTags[tag],
    className: calculateTagClass(allTags[tag], tagsParams)
  });
}
/*[NEW] add html from allTagsHTML to taglist*/
tagList.innerHTML = templates.tagCloudLink(allTagsData);
console.log(allTagsData);
  
}
 
 
generateTags();
function tagClickHandler(event){
  
  event.preventDefault();
 
    const clickedElement= this;
    const href =clickedElement.getAttribute('href')
    const tag =href.replace('#tag-', '');
    const activeTagLinks =document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTagLink of activeTagLinks){
      activeTagLink.classList.remove('active');
    }  
  
    const linksToHrefTag= document.querySelectorAll('a[href="' + href + '"]');
 
    for (let linkToHrefTag of linksToHrefTag){
     linkToHrefTag.classList.add('active'); 
    };
  generateTitleLinks('[data-tags~="' + tag + '"]');

  
  
}

function addClickListenersToTags(){
  /* find all links to tags */
    const LinksToTag= document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
    for(let link of LinksToTag){

     /* add tagClickHandler as event listener for that link */
      link.addEventListener('click',tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function calculateAuthorsParams(authors) {
  /*CREATE nefw variable with object max value , min value */ 
  const authorParams = { max : 0 , min : 999999};
  /*START LOOP: for each tag in tags*/
  for (let author in authors){
    console.log(author + ' is used ' + authors[author] + ' times ');
    if(authors[author] > authorParams.max){
      authorParams.max = authors[author];
    }else if(authors[author] < authorParams.min){
      authorParams.min = authors[author];
    }
  }
   return authorParams;
  }
  function calculateAuthorClass(countAuthor ,authorParams) {
    const normalizedCount = countAuthor - authorParams.min;
    const normalizedMax = authorParams.max - authorParams.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCountAuthor - 1) + 1 );
    return optCloudClassPrefixAuthor + classNumber;
  }


function generateAuthors() {

    let allAuthors = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  
  for (let article of articles) {
    /* find tags wrapper */
    const authorList = article.querySelector(optArticleAuthorSelector);
    console.log(authorList);
    /* make html variable with empty string */
    let html =''
    /* get tags from data-tags attribute */
    const authorTag = article.getAttribute('data-author');
    console.log(authorTag);
  
   /* START LOOP: for each tag */
    
       /* generate HTML of the link */
      //  const authorLinkHTML = '<li><a href="#author-' + authorTag + '"><span>' + authorTag + '</span></a></li> ';
      const authorHTMLData = {id: authorList, title: authorTag};
    const authorLinkHTML = templates.articleAuthorLink(authorHTMLData); 
      /* add generated code to html variable */
      authorList.innerHTML=authorLinkHTML;
    /* END LOOP: for each tag */
   /* [NEW] check if this link is NOT already in allTags */
   if(!allAuthors.hasOwnProperty(authorTag)) {
    /* [NEW] add generated code to allTags array */
    allAuthors[authorTag] = 1;

  } else {
    allAuthors[authorTag]++;
  }
   
    /* insert HTML of all the links into the tags wrapper */
 

  
  
  /* END LOOP: for every article: */ 
} 
  /* Find list of authors in right column*/
  const authorList =document.querySelector(optAuthorsListSelector);
  /* [NEW] create variable for all links HTML code */
const authorsParams = calculateAuthorsParams(allAuthors);
console.log('AuthorsParams' , authorsParams)
 const allAuthorsData= {authors:[]};

/*[NEW] START LOOP: for each tag in allTags: */
for (let authorTag in allAuthors){
   const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[authorTag], authorsParams) + '" href="#author-' + authorTag + '">' + authorTag + '</a>(' + allAuthors[authorTag] +')</li>';
  allAuthorsData.authors.push({
    author:authorTag,
    count: allAuthors[authorTag],
    className:calculateAuthorClass(allAuthors[authorTag], authorsParams)
  });
}
/*[NEW] add html from allTagsHTML to taglist*/
authorList.innerHTML = templates.authorCloudLink(allAuthorsData);

 } 
 generateAuthors(); 

 function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement= this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href =clickedElement.getAttribute('href')
  /* make a new constant "tag" and extract tag from the "href" constant */
    const author =href.replace('#author-', '');
  /* find all tag links with class active */
    const activeAuthorLinks =document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */
    for (let activeAuthorLink of activeAuthorLinks){
    /* remove class active */
      activeAuthorLink.classList.remove('active');
  /* END LOOP: for each active tag link */
    }  
  /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks= document.querySelectorAll('a[href="' + href + '"]');
  /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks){
       /* add class active */
     authorLink.classList.add('active'); 
    /* END LOOP: for each found tag link */
    };
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

  
  
}

function addClickListenersToAuthor(){
  /* find all links to tags */
    const LinksToTag= document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
    for(let link of LinksToTag){

     /* add tagClickHandler as event listener for that link */
      link.addEventListener('click',authorClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToAuthor();

function titleListReset() {
  const resetButton = document.querySelector('button.reset-button');
  resetButton.addEventListener('click' ,()=>generateTitleLinks());
}
titleListReset();