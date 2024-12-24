/* ======= FAVICON ======= */

/**
 * Creates favicon and adds it to the header
 * @param   {String}    favImg  Image href
 */
function setFavicon(favImg){
    let head = document.querySelector('head');
    let favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = favImg;
    head.appendChild(favicon);
};

setFavicon('assets/images/favicon.svg');

/* ======= WRAPPER ======= */

const body = document.querySelector('body');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section[id]');
const footer = document.querySelector('footer');

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

body.prepend(wrapper);
wrapper.appendChild(header);
sections.forEach(section => {
    wrapper.appendChild(section);
});
wrapper.appendChild(footer);

/* ======= HEADER ======= */

/* Add span elements wrapping texts of the links */
const listItems = document.querySelectorAll('#main-nav ul li');
const linkNames = [
    {"textContent": "Intro"},
    {"textContent": "Science"},
    {"textContent": "Spheres"},
    {"textContent": "Celebs"},
    {"textContent": "Tradions"},
    {"textContent": "Recap"}
];

listItems.forEach((item, id) => {
    const link = item.querySelector('a');
    // const linkText = link.textContent.trim();
    const linkText = linkNames[id].textContent;

    const span = document.createElement('span');
    span.textContent = linkText;

    link.textContent = '';
    link.appendChild(span);
});

listItems[0].firstChild.classList.add('active-link');

// ICON
/**
    * Creates icons and add them before a-elements in the list of the links
    * @param    {String}    classname   Type of Icon
    * @param    {String}    id          Icon id
    * @return   {HTML element}          <i></i> Element
*/
function createIcon(classname, id, targetElement) {
    const icon = document.createElement("i");
    icon.classList.add(classname);
    icon.id = id;
    targetElement.prepend(icon);
    return icon;
};

const icons = [
    {classname: "ri-home-5-line", id: "i0"},
    {classname: "ri-aliens-line", id: "i1"},
    {classname: "ri-global-fill", id: "i2"},
    {classname: "ri-sparkling-fill", id: "i3" },
    {classname: "ri-ancient-pavilion-line", id: "i4"},
    {classname: "ri-file-chart-line", id: "i5"},
    // {classname: "ri-arrow-up-double-line", id: "i6"}
];

const aElements = document.querySelectorAll("#main-nav ul li a");
icons.forEach((icon, index) => {
    createIcon(icon.classname, icon.id, aElements[index]);
});

// Create an SVG element from SVG file
document.addEventListener("DOMContentLoaded", function() {
    fetch("assets/images/indicator.svg")
    .then(response => response.text())
    .then(svgData => {
        var parser = new DOMParser();
        var svgElement = parser.parseFromString(svgData, "image/svg+xml").querySelector("svg");
        svgElement.classList.add("indicator");
        var ulList = document.querySelector("#main-nav ul");
        ulList.appendChild(svgElement);
    });
});

// Add helper text when hover nav icons
// document.addEventListener("DOMContentLoaded", function() {
//     var listItems = document.querySelectorAll("ul li a");

//     listItems.forEach(function(item) {
//         var text = item.textContent;
//         item.setAttribute("data-title", text);
//     });
// });

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

function scrollActive() {
    const scrollY = window.scrollY; // The number of pixels the document has scrolled from the upper left corner of the window
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('ul li a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('ul li a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
};
window.addEventListener('scroll', scrollActive);

/* ======= SECTION IMAGES ======= */

/**
 * Creates an image element in section and article selectors
 * @param   {String}    sectionId   Section ID
 * @param   {String}    articleId   Article ID
 * @param   {String}    imgSrc      Image href
 * @param   {String}    imageSource Image source
 * @param   {String}    imageTitle  Image title
 * @param   {String}    side        Image left/right position to text desc
 */
function createImage(sectionId, articleId, imgSrc, imageSource, imageTitle, side) {
    const section = document.querySelector(`#${sectionId}`);

    if (articleId == '') {
        const article = document.querySelector(`#${sectionId} article`);
        const h2 = document.querySelector(`#${sectionId} h2`);
        const p = document.querySelector(`#${sectionId} p`);

        const img = document.createElement('img');
        const div = document.createElement('div');

        img.src = imgSrc;
        img.alt = h2.textContent;
        
        const aSource = document.createElement('a');
        aSource.textContent = `Image credit: ${imageTitle}`;
        aSource.href = imageSource;
        aSource.rel = 'noopener noreferrer';
        aSource.target = '_blank';
        aSource.classList.add('source');
        
        div.appendChild(h2);
        div.appendChild(p);

        if (article) {
            section.prepend(div);
            section.appendChild(img);
            section.appendChild(aSource);
        } else {
            section.appendChild(img);
            section.appendChild(aSource);
            section.appendChild(div);
        }
    } else {
        const article = document.querySelector(`#${sectionId} #${articleId}`);
        const h3 = document.querySelector(`#${sectionId} #${articleId} h3`);
        const p = document.querySelector(`#${sectionId} #${articleId} p`);

        const img = document.createElement('img');
        const div_img = document.createElement('div');
        const div_txt = document.createElement('div');

        img.src = imgSrc;
        img.alt = h3.textContent;
        img.classList.add('img_celebration');

        const aSource = document.createElement('a');
        aSource.textContent = `Image credit: ${imageTitle}`;
        aSource.href = imageSource;
        aSource.rel = 'noopener noreferrer';
        aSource.target = '_blank';
        aSource.classList.add('source');

        div_txt.appendChild(h3);
        div_txt.appendChild(p);
        div_img.append(aSource);
        div_img.prepend(img);

        if (side === 'left') {
            article.appendChild(div_img);
            article.appendChild(div_txt);
        } else {
            article.appendChild(div_txt);
            article.appendChild(div_img);
        }
    }
};

// Fetch images data from images.json
const i = fetch("./assets/data/images.json")
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => console.error("Error loading JSON file", error));

const showImage = async () => {
    const images = await i;
    images.forEach(img => {
        createImage(img.sectionId, img.articleId, img.imgSrc, img.imageSource, img.imageTitle, img.side);
    });

    /* ======= ENLARGE IMAGE on Click  ======= */

    const imgs = document.querySelectorAll('img');
    imgs.forEach(img => {
        img.addEventListener('click', () => {
            if (img.classList.contains('zoomed')) {
                img.classList.remove('zoomed');
            } else {
                img.classList.add('zoomed');
            }
        });
    });
};

showImage();

/* ======= SECTION YOUTUBE VIDEOS ======= */

/**
 * @param   {String}    sectionId   Section ID
 * @param   {String}    videoSrc    Video href
 * @param   {String}    videoTitle  Video title
 */
function uploadVideo(sectionId, videoSrc, videoTitle) {
    const section = document.querySelector(`#${sectionId}`);
    const iframe = document.createElement('iframe');
    iframe.width = '560';
    iframe.height = '315';
    iframe.src = videoSrc;
    iframe.title = videoTitle
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    section.appendChild(iframe);
};

const videos = [
    {
        "sectionId": "science",
        "videoSrc": "https://www.youtube.com/embed/btcTfor-j-c?si=HxcZFWR_IhyN2lDR",
        "videoTitle": "What is a Solstice? | National Geographic"
    },
    {
        "sectionId": "traditions",
        "videoSrc": "https://www.youtube.com/embed/z-4KMxjLFes?si=KYrnRZpjb1eGtxGE",
        "videoTitle": "How Winter Solstice Is Celebrated Across Different Cultures | Mashable"
    },
];

videos.forEach(video => {
    uploadVideo(video.sectionId, video.videoSrc, video.videoTitle);
});

/* ======= FOOTER ======= */

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.clientHeight) {
        footer.style.visibility = 'visible';
    } else {
        footer.style.visibility = 'hidden';
    }
});

var contactLink = document.querySelector('a[href="#contact"]');

if (contactLink) {
    contactLink.textContent = "Made by seriu";
    contactLink.href = "https://seriu.vercel.app/";
    contactLink.rel = 'noopener noreferrer';
    contactLink.target = '_blank';
};