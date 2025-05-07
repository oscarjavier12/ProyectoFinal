

document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = "/src/html/login.html"; // Redirige al login si no está autenticado
        return; // evita que el resto del código se ejecute
    }
    cargarHeaderFooter('/src/html/components.html')
        .then(() => {
            console.log('Header y footer cargados correctamente');
            if (sessionStorage.getItem('isAdmin') === 'true') {
                document.getElementById('admin').style.display = 'block'; // Muestra el botón de admin
            }
            const cerrar = document.getElementById('cerrar');
            cerrar.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('isAdmin');
                sessionStorage.removeItem('isProgrammer');
                window.location.href = "/src//html/login.html"; // Redirige al login

            });
            

        })
        .catch(error => {
            console.error('Error:', error);
        });
});
function cargarHeaderFooter(ruta) {
    const headerPrincipal = document.querySelector('header');
    const footerPrincipal = document.querySelector('footer');

    if (!headerPrincipal && !footerPrincipal) {
        console.error('No se encontraron elementos header o footer en el documento');
        return Promise.reject(new Error('No se encontraron elementos header o footer'));
    }

    // Función para resolver URLs relativas basadas en la ruta del archivo cargado
    function resolverURL(url, baseUrl) {
        // Si la URL ya es absoluta, devolverla tal cual
        if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/')) {
            return url;
        }

        // Extraer el directorio base de la URL base
        const basePath = baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1);
        return basePath + url;
    }

    return fetch(ruta)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            // Crear un DOM temporal usando DOMParser
            const parser = new DOMParser();
            const docTemporal = parser.parseFromString(html, 'text/html');

            // Extraer los elementos header y footer del documento temporal
            const headerTemporal = docTemporal.querySelector('header');
            const footerTemporal = docTemporal.querySelector('footer');

            // Función para procesar un elemento (header o footer)
            function procesarElemento(elementoTemporal, elementoPrincipal) {
                if (!elementoTemporal || !elementoPrincipal) {
                    return Promise.resolve(); // No hacer nada si alguno no existe
                }

                // Limpiar el elemento antes de cargar nuevo contenido
                while (elementoPrincipal.firstChild) {
                    elementoPrincipal.removeChild(elementoPrincipal.firstChild);
                }

                // Extraer scripts y todos los estilos (incluyendo en <head>)
                const scripts = Array.from(elementoTemporal.querySelectorAll('script'));

                // Extraer tanto estilos inline como links de CSS
                const inlineStyles = Array.from(elementoTemporal.querySelectorAll('style'));
                const styleLinks = Array.from(docTemporal.querySelectorAll('link[rel="stylesheet"]'));

                // También buscar estilos en el <head> del documento temporal
                const headStyles = Array.from(docTemporal.head.querySelectorAll('style, link[rel="stylesheet"]'));

                // Combinar todos los estilos
                const allStyles = [...inlineStyles, ...styleLinks, ...headStyles];

                // Crear un fragmento para insertar el contenido de forma eficiente
                const fragmento = document.createDocumentFragment();

                // Transferir todos los nodos hijos excepto scripts y estilos al fragmento
                Array.from(elementoTemporal.childNodes).forEach(nodo => {
                    // Ignoramos scripts y estilos ya que los procesaremos por separado
                    if (nodo.nodeName !== 'SCRIPT' && nodo.nodeName !== 'STYLE' &&
                        !(nodo.nodeName === 'LINK' && nodo.getAttribute && nodo.getAttribute('rel') === 'stylesheet')) {
                        fragmento.appendChild(nodo.cloneNode(true));
                    }
                });

                // Insertar el contenido en el elemento principal
                elementoPrincipal.appendChild(fragmento);

                // Procesar todos los estilos CSS primero
                const stylePromises = [];

                allStyles.forEach(style => {
                    if (style.nodeName === 'STYLE') {
                        // Para elementos <style> inline
                        const newStyle = document.createElement('style');
                        newStyle.textContent = style.textContent;

                        // Copiar atributos
                        Array.from(style.attributes).forEach(attr => {
                            newStyle.setAttribute(attr.name, attr.value);
                        });

                        // Añadimos un ID único para debugging
                        newStyle.setAttribute('data-source', 'header-footer-loader');

                        // Añadir el estilo al <head> para asegurar que se aplique globalmente
                        document.head.appendChild(newStyle);
                        stylePromises.push(Promise.resolve());
                    } else if (style.nodeName === 'LINK' && style.getAttribute('rel') === 'stylesheet') {
                        // Para hojas de estilo externas
                        const linkCSS = document.createElement('link');
                        linkCSS.rel = 'stylesheet';

                        // Copiar todos los atributos
                        Array.from(style.attributes).forEach(attr => {
                            linkCSS.setAttribute(attr.name, attr.value);
                        });

                        // Resolver la URL del CSS correctamente
                        if (linkCSS.href) {
                            // Resolver URL relativa si es necesario
                            linkCSS.href = resolverURL(linkCSS.href, ruta);

                            // Añadir parámetro anti-caché
                            const cacheBustUrl = linkCSS.href + (linkCSS.href.includes('?') ? '&' : '?') + 't=' + Date.now();
                            linkCSS.href = cacheBustUrl;
                        }

                        // Crear promesa para manejar la carga del CSS
                        const cssPromise = new Promise((resolve) => {
                            linkCSS.onload = resolve;
                            linkCSS.onerror = () => {
                                console.error(`Error al cargar CSS: ${linkCSS.href}`);
                                resolve(); // Resolvemos incluso con error para continuar
                            };
                        });

                        stylePromises.push(cssPromise);
                        // Añadir al head para asegurar que se aplique correctamente
                        document.head.appendChild(linkCSS);
                    }
                });

                // Procesar scripts después de que los estilos se hayan cargado
                return Promise.all(stylePromises).then(() => {
                    const scriptPromises = [];

                    scripts.forEach(script => {
                        const scriptElement = document.createElement('script');

                        // Copiar todos los atributos
                        Array.from(script.attributes).forEach(attr => {
                            scriptElement.setAttribute(attr.name, attr.value);
                        });

                        // Crear promesa para manejar la carga del script
                        const loadPromise = new Promise((resolve) => {
                            scriptElement.onload = resolve;
                            scriptElement.onerror = () => {
                                console.error(`Error al cargar script: ${script.src || 'inline'}`);
                                resolve(); // Resolvemos incluso con error para continuar
                            };
                        });

                        // Manejar scripts externos vs. inline
                        if (script.src) {
                            // Resolver la URL del script correctamente
                            scriptElement.src = resolverURL(script.src, ruta);

                            // Añadir parámetro anti-caché
                            const cacheBustUrl = scriptElement.src + (scriptElement.src.includes('?') ? '&' : '?') + 't=' + Date.now();
                            scriptElement.src = cacheBustUrl;

                            scriptPromises.push(loadPromise);
                            document.body.appendChild(scriptElement); // Los scripts externos van al final del body
                        } else {
                            // Para scripts inline, ejecutamos su contenido
                            try {
                                scriptElement.textContent = script.textContent;
                                elementoPrincipal.appendChild(scriptElement); // Los scripts inline se mantienen en contexto
                                scriptPromises.push(Promise.resolve());
                            } catch (error) {
                                console.error('Error al ejecutar script inline:', error);
                                scriptPromises.push(Promise.resolve()); // Resolvemos para continuar
                            }
                        }
                    });

                    return Promise.all(scriptPromises);
                });
            }

            // Procesar header y footer en secuencia
            return procesarElemento(headerTemporal, headerPrincipal)
                .then(() => procesarElemento(footerTemporal, footerPrincipal))
                .then(() => {
                    console.log('Header y footer cargados con estilos y scripts procesados correctamente.');

                    // Para manejar cualquier código de inicialización
                    // Ejecutar cualquier código que normalmente estaría en DOMContentLoaded
                    const domContentLoadedRegex = /document\.addEventListener\(['"]DOMContentLoaded['"],\s*function\s*\([^)]*\)\s*\{([\s\S]*?)\}\s*\)/g;
                    let match;

                    while ((match = domContentLoadedRegex.exec(html)) !== null) {
                        try {
                            const functionBody = match[1];
                            const func = new Function(functionBody);
                            func();
                        } catch (e) {
                            console.error('Error al ejecutar código DOMContentLoaded:', e);
                        }
                    }

                    // Llamar a una función de inicialización global si existe
                    if (typeof inicializarHeaderFooter === 'function') {
                        inicializarHeaderFooter();
                    }

                    // Forzar un reflow para asegurar que los estilos se apliquen
                    document.body.offsetHeight;

                    return { header: headerPrincipal, footer: footerPrincipal };
                });
        })
        .catch(error => {
            console.error('Error al cargar header y footer:', error);
            throw error;
        });
}