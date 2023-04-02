// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

import * as siteDal from './site.js';


document.addEventListener('DOMContentLoaded', function () {
    //> changeSelectedNavItem();
    changeSelectedNavItem();
    loadPdf();
    initializeEvents();
});

const pdfUrls = ['./files/certificadoEdicionesAmericanas.pdf', './files/certificadoAnovo.pdf'];
function initializeEvents() {
    initializeEventsPdf();
    initializeEventDownloadCV();
    initializeEventSeeDetailProjects();
}

var tipNav = null;
function changeSelectedNavItem() {
    const menu = document.getElementById("menu");
    const selectedIndex = parseInt(sessionStorage.getItem('selectedNavItem'));
    let navItemli = [...menu.querySelectorAll('.nav-item')];

    if (!isNaN(selectedIndex)) {
        navItemli.forEach((item, index) => {
            if (index == selectedIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        })
    } else {
        navItemli[0].classList.add('selected')
    }

    const menu2 = document.getElementById("menu-dropdown")
    navItemli = menu2 != null ? [...menu2.querySelectorAll('.nav-item')] : [];
    if (navItemli.length <= 0) {
        return;
    }
    if (!isNaN(selectedIndex)) {
        navItemli.forEach((item, index) => {
            if (index == selectedIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        })
    } else {
        navItemli[0].classList.add('selected')
    }
}


//> Activa el onClick a todo los elementos con la clase linkAction que se hayan agregado antes o
//> descués de cargar el script. 
$(document).delegate('.linkAction', 'click', async function (event) {
    event.preventDefault();
    const indexNav = $(this).closest('li').index(); //> Index li
    sessionStorage.setItem('selectedNavItem', indexNav);
    const href = $(this).attr('href');
    const html = await siteDal.getView(href);
    if (html) {
        const title = $(this).text();
        updateViewAndHistory(html, title, href, indexNav);
        loadPdf();
        initializeEventDownloadCV();
        initializeEventSeeDetailProjects();
    }
    changeSelectedNavItem();
    closeMenuDropDownAndChangeToggleIcon();
});

function closeMenuDropDownAndChangeToggleIcon() {
    let menuDropdown = document.getElementById('menu-dropdown');
    if (menuDropdown != null) {
        menuDropdown.classList.remove('show-menu-toggle');
        const iconElement = $btnToggle.firstChild;
        iconElement.classList.toggle('bi-list');
        iconElement.classList.toggle('bi-x-lg');
    }
}

function updateViewAndHistory(html, title, href, indexNav) {
    document.getElementById('mainContentAspview').innerHTML = html;
    window.scrollTo(0, 0);
    document.title = title;
    history.pushState({ html, title, indexNav }, title, href);
}


window.onpopstate = async function (event) {
    event.preventDefault();
    if (event.state) {
        document.getElementById('mainContentAspview').innerHTML = event.state.html;
        document.title = event.state.title;
        updateSelectedNavItemOnpopstate(event);
        loadPdf();
    }
    else {
        const firstNavLink = document.querySelector('#menu .nav-item:first-of-type a');
        const htmlHome = await siteDal.getView(firstNavLink.href)
        document.getElementById('mainContentAspview').innerHTML = htmlHome;
        sessionStorage.setItem('selectedNavItem', 0);
        changeSelectedNavItem();
    }
    initializeEventDownloadCV();
    initializeEventSeeDetailProjects();
};


function updateSelectedNavItemOnpopstate(event) {
    var selectedIndex = event.state.indexNav;
    if (selectedIndex !== null) {
        var navItems = [...document.querySelectorAll('.nav-item')];
        navItems.forEach((item, index) => {
            if (index === selectedIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }
}


function initializeEventDownloadCV() {
    const $btnDownloadCV = document.getElementById('btnDownloadCV');
    if ($btnDownloadCV != null) {
        $btnDownloadCV.addEventListener('click', async () => {
            const blob = await siteDal.getFileCVFromAzure();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'CV_OdairHuamaniConde.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });
    }
}


const $btnToggle = document.getElementById('menu-toggle');
$btnToggle.addEventListener('click', (event) => {
    const navItems = document.getElementById('menu');
    let menuDropdown = document.getElementById('menu-dropdown');
    if (menuDropdown == null) {
        menuDropdown = document.createElement('ul');
        menuDropdown.innerHTML = navItems.innerHTML;
        menuDropdown.id = 'menu-dropdown';
        navItems.parentNode.insertBefore(menuDropdown, navItems)
    }

    menuDropdown.classList.toggle('show-menu-toggle');
    if (event.target.tagName == 'I') {
        const iconElement = event.target;
        iconElement.classList.toggle('bi-list');
        iconElement.classList.toggle('bi-x-lg');
    } else {
        const iconElement = event.target.firstChild;
        iconElement.classList.toggle('bi-list');
        iconElement.classList.toggle('bi-x-lg');
    }
});

async function updateMainContainer(href, title, indexNav) {
    const html = await siteDal.getView(href)
    document.getElementById('mainContentAspview').innerHTML = html;
    updateViewAndHistory(html, title, href, indexNav)
}

document.addEventListener('click', async (event) => {
    if (event.target.closest("#btnContact")) {
        const selectedIndex = 3;
        await updateMainContainer("/Home/Contact", "Contacto", selectedIndex)
        sessionStorage.setItem("selectedNavItem", selectedIndex);
        changeSelectedNavItem();
    }
})


function loadPdf() {
    // Obtener la URL del archivo PDF
    const container = document.getElementById('file1');
    const container2 = document.getElementById('file2');
    const containers = [container, container2];
    if (container == null || container2 == null) {
        return;
    }
    initializeEventsPdf();
    // Cargar el archivo PDF
    pdfUrls.forEach((item, index) => {
        pdfjsLib.getDocument(item).promise.then(pdf => {
            // Obtener la primera página del PDF
            pdf.getPage(1).then(page => {
                // Obtener el viewport de la página
                const viewport = page.getViewport({ scale: 1.0 });

                // Definir el tamaño deseado del canvas y la escala de vista
                const canvasWidth = 240;
                const canvasHeight = 270;
                const scale = Math.min(canvasWidth / viewport.width, canvasHeight / viewport.height);

                // Crear un canvas para renderizar la página
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;

                // Renderizar la página en el canvas con la escala de vista definida
                const renderContext = {
                    canvasContext: context,
                    viewport: page.getViewport({ scale: scale })
                };
                page.render(renderContext).promise.then(() => {
                    // Agregar el canvas al contenedor
                    containers[index].appendChild(canvas);
                });
            });
        });
    })
}

function initializeEventsPdf() {
    const $btnShowPdf = document.getElementById('file1');
    const $btnShowPdf2 = document.getElementById('file2');
    if ($btnShowPdf != null && $btnShowPdf2 != null) {
        $btnShowPdf.setAttribute('href', pdfUrls[0]);
        $btnShowPdf2.setAttribute('href', pdfUrls[1]);

        $btnShowPdf.addEventListener('click', () => {
            showPdf(pdfUrls[0])
        });
        $btnShowPdf2.addEventListener('click', () => {
            showPdf(pdfUrls[1])
        });
    }
}

function showPdf(pdfUrl) {
    window.open(pdfUrl, '_blank');
}

function initializeEventSeeDetailProjects() {
    const $container = document.querySelectorAll('.container .card');
    if ($container != null) {
        $container.forEach((action, index) => {
            action.addEventListener('click', async (event) => {
                event.preventDefault();
                if (event.target.closest('.btn')) {
                    await updateMainContainer(event.target.href, "Portafolio", 2)
                    sessionStorage.setItem("selectedNavItem", 2);
                    changeSelectedNavItem();
                }
            })
        })
    }
}
