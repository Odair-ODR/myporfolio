// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

import * as siteDal from './site.js'


//document.querySelectorAll('.nav-item a').forEach((a, index) => {
//    a.addEventListener('click', (event) => {
//        /*event.preventDefault();*/
//        sessionStorage.setItem('selectedNavItem', index);
//        /*window.location.href = a.href;*/
//        const state = { selectedIndex: index, href: a.href };
//        history.pushState(state, '', a.href);
//    });
//});


document.addEventListener('DOMContentLoaded', function () {
    changeSelectedNavItem();
    changeSelectedNavItemAfterRefresh();
});

const menu = document.getElementById("menu");
function changeSelectedNavItem() {
    const links = [...menu.getElementsByTagName("a")];
    links.forEach((a, index) => {
        a.addEventListener('click', (event) => {
            sessionStorage.setItem('selectedNavItem', index); //> Index li
            var navItems = document.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                item.classList.remove('selected');
            });

            const currentA = event.target;
            currentA.parentElement.classList.toggle('selected')
            
        })
    })
}

function changeSelectedNavItemAfterRefresh() {
    const selectedIndex = parseInt(sessionStorage.getItem('selectedNavItem'));
    const navItemli = [...menu.querySelectorAll('.nav-item')];
    if (!isNaN(selectedIndex)) {
        navItemli.forEach((item, index) => {
            if (index == selectedIndex) {
                item.classList.toggle('selected');
            } else {
                item.classList.remove('selected');
            }
        })
    } else {
        navItemli[0].classList.add('selected')
    }
}


//function changeSelectedMenuOption() {
//    var selectedIndex = sessionStorage.getItem('selectedNavItem');
//    if (selectedIndex !== null) {
//        var navItems = document.querySelectorAll('.nav-item');
//        navItems.forEach((item, index) => {
//            if (index === parseInt(selectedIndex)) {
//                item.classList.add('selected');
//            } else {
//                item.classList.remove('selected');
//            }
//        });
//    }

//}


//// agregar evento popstate
//window.addEventListener('popstate', function (event) {
//    // obtener el índice del menú seleccionado del estado de la historia
//    var state = event.state;
//    if (state != null) {
//        sessionStorage.setItem('selectedNavItem', state.selectedIndex);
//        window.location.href = state.href;
//    } else {
//        sessionStorage.setItem('selectedNavItem', 0);
//        window.location.href = links[0].href;
//    }
//});

//document.querySelectorAll('.linkAction').forEach((a, index) => {
//    a.addEventListener('click', async (event) => {
//        event.preventDefault();
//        const href = a.getAttribute('href');
//        const html = await siteDal.getView(href);
//        document.getElementById('mainContentAspview').innerHTML = html;
//        console.log(html)
//    });
//});

//> Activa el onClick a todo los elementos con la clase linkAction que se hayan agregado antes o
//> descués de cargar el script. 
$(document).delegate('.linkAction', 'click', async function (event) {
    event.preventDefault();
    const indexNav = $(this).closest('li').index(); //> Index li
    const href = $(this).attr('href');
    const html = await siteDal.getView(href);
    if (html) {
        const title = $(this).text();
        updateViewAndHistory(html, title, href, indexNav);
    }
});

function updateViewAndHistory(html, title, href, indexNav) {
    document.getElementById('mainContentAspview').innerHTML = html;
    window.scrollTo(0, 0);
    document.title = title;
    history.pushState({ html, title, indexNav }, title, href);
}

const links = menu.getElementsByTagName("a");
window.onpopstate = function (event) {
    if (event.state) {
        document.getElementById('mainContentAspview').innerHTML = event.state.html;
        document.title = event.state.title;
    }
    else {
        window.location.href = links[0].href;
    }

    updateSelectedNavItemOnpopstate(event);
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

const $btnDownloadCV = document.getElementById('btnDownloadCV')
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
})