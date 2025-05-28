const { jsPDF } = window.jspdf;
import DataManager from './DataManager.js';
import { showAlert } from './carrito.js';
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnPdfReport').addEventListener('click', async () => {
        try {
            const url = "/src/resources/EHlogo.png"; // URL de la imagen
            const datosImagen = await (cargarImagen(url));

            const document = new jsPDF({
                orientation: 'portrait', // 'landscape' or 'portrait'
                unit: 'mm', //unidad de medida
                format: 'a4',// formato
                putOnlyUsedFonts: true,
                floatPrecision: 16 // or "smart", default is 16
            });
            encabezado(document, datosImagen);
            //conectar con local storage
            const dataM = new DataManager("Productos");
            const productos = dataM.readData();
            if (productos.length === 0) {
                showAlert("No hay productos para generar el reporte", "warning");
                return;
            }
            //console.log(productos);
            const body = productos.map(articulos => [
                articulos.id,
                articulos.nombre,
                articulos.categoria,
                articulos.precio,
                articulos.fecha,
                articulos.descripcion,
                articulos.stock,
                articulos.destacar ? "Si" : "No",
                articulos.disponibilidad ? "Si" : "No"

            ]
            );
            const optiontTable = {
                sarty: 40,
                theme: 'grid',
                headStyles: {
                    fillColor: [191, 146, 100],
                    textColor: [255, 255, 255],
                    fontSize: 10,
                    font: 'Helvetica',
                    fontStyle: 'bold',
                    haling: `center`
                },
                bodyStyles: {
                    //fillColor: [255, 255, 255],
                    textColor: [0, 0, 0],
                    fontSize: 8,
                    font: 'Helvetica'
                    //fontStyle: 'normal',
                    //haling:`center`
                },


            }
            document.autoTable({
                head: [["Id", "Nombre", "Categoría", "Precio", "Fecha", "Descripción", "Stock", "Destacar", "Disponibilidad"]],
                body: body,
                startY: 40,
                ...optiontTable,
                didParseCell: function (data) {
                    if (data.seccion !== "head" && data.column.index === 3) {
                        const precio = parseFloat(data.cell.raw);
                        if (!isNaN(precio)) {
                            data.cell.text = `$` + precio.toFixed(2);
                            data.cell.styles.halign = "right";
                        }
                    }
                }
            });

            const categoriaCounts = {};

            for (const producto of productos) {
                if (categoriaCounts.hasOwnProperty(producto.categoria)) {
                    categoriaCounts[producto.categoria]++;
                } else {
                    categoriaCounts[producto.categoria] = 1;
                }
            }
            //console.log(categoriaCounts);


            /**for (const producto of productos) {
                const categoria = producto.categoria;
                if (categoriaCounts[categoria]) {
                    categoriaCounts[categoria]++;
                } else {
                    categoriaCounts[categoria] = 1;
                }
            }
            */
            document.addPage();
            encabezado(document, datosImagen);
            const charPostX = 10;
            const charPostY = 200;
            const charWidth = 180;
            const maxBarHeight = 100;
            const barSpacing = 5;
            graficaBarras(document, categoriaCounts, charPostX, charPostY, charWidth, maxBarHeight, barSpacing);
            numberPage(document);
            document.save('reporte.pdf');
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    });
});


//async
function cargarImagen(url) {
    return new Promise(function (resolve, reject) {
        const img = new Image();// se crea un objeto de tipo de imagen
        // se establece el atributo crossOrigin para permitir la carga de imágenes de otros dominios

        img.crossOrigin = "Anonymous";
        img.onload = () => {

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL('image/jpeg');

            resolve(dataURL);
        };
        img.onerror = function () {
            reject(new Error("fallo la carga de la imagen"));
        };
        img.src = url;
    });

}
function encabezado(doc, datosImagen) {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(2, 64, 24);
    //doc.text("Reporte de Ventas", 105, 20, { align: "center" });
    doc.text(["Reporte del producto"],
        doc.internal.pageSize.getWidth() / 2,
        20,
        { align: "center" }
    )

    doc.addImage(datosImagen, 'JPEG', 10, 4, 25, 25); // A4 size in mm

}

//graficaBarras(document, categoriaCounts, charPostX, charPostY, charWidth, maxBarHeight, barSpacing)
function graficaBarras(doc, data, x, y, width, height, barSpacing) {
    const categoryColors = {
        Cremas: [255, 0, 0],
        Maquillaje: [0, 255, 0],
        Perfumes: [0, 0, 255],
        Bálsamos: [255, 255, 0],
        Protector_Solar: [255, 0, 255]
    };
    const barWidth = (width - (barSpacing * (Object.keys(data).length - 1))) / Object.keys(data).length;
    let maxCount = 0;
    for (const category in data) {
        if (data[category] > maxCount) {
            maxCount = data[category];
        }
    }
    let barraActualX = x;
    for (const category in data) {
        const count = data[category];
        const barHeight = (count / maxCount) * height;
        const color = categoryColors[category] || [0, 0, 0]; // Default to black if no color is defined
        //doc.setFillColor(color[0], color[1], color[2]);
        doc.setFillColor(...color);
        //doc.rect(barraActualX, y + height - barHeight, barraWidth, barHeight, 'F');
        doc.rect(barraActualX, y, barWidth, -barHeight, 'F');
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont("Helvetica", "bold");

        //doc.text(category, barraActualX + barWidth / 2, y + height + 5, { align: 'center' });
        //category, { maxWidth:barWidth,align: 'center' }
        const text = `${data[category]}\n${category}`;

        doc.text(barraActualX + (barWidth / 2), y + 5, text, { maxWidth: barWidth, align: 'center' });

        barraActualX += barWidth + barSpacing;


    }



}
function numberPage(doc) {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        const pageNumberText = `Página ${i} de ${pageCount}`;
        const textWidth = doc.getTextWidth(pageNumberText);
        const xCoordinate = doc.internal.pageSize.getWidth() - textWidth - 10;
        doc.text(pageNumberText, xCoordinate, doc.internal.pageSize.getHeight() - 10);
    }

}



/**
 * // Obtener el número total de páginas
var pageCount = pdf.internal.getNumberOfPages();

// Bucle para iterar sobre cada página
for (var i = 1; i <= pageCount; i++) {
  // Establecer la página actual
  pdf.setPage(i);

  // Configurar el tamaño de fuente y el estilo
  pdf.setFontSize(10);

  // Calcular la posición del número de página en el pie de página
  var pageWidth = pdf.internal.pageSize.getWidth();
  var pageHeight = pdf.internal.pageSize.getHeight();
  var xPosition = pageWidth / 2;  // Posición horizontal en el centro
  var yPosition = pageHeight - 10; // Posición vertical en el pie de página

  // Añadir el número de página
  pdf.text(i.toString(), xPosition, yPosition, {
    align: 'center' // Alineación horizontal (centro)
  });
}
 */