/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

//
// Basic node example that prints document metadata and text content.
// Requires single file built version of PDF.js -- please run
// `gulp singlefile` before running the example.
//

// Run `gulp dist-install` to generate 'pdfjs-dist' npm package files.
// import pdfjsLib = require("pdfjs-dist/es5/build/pdf.js");



// Loading file from file system into typed array
const pdfPath = "1-2-2-22-other.pdf";

import pdfjsLib = require("pdfjs-dist");
import PDFViewer = require("pdfjs-dist/web/pdf_viewer");
require("pdfjs-dist/build/pdf.worker.entry");

// Some PDFs need external cmaps.
const CMAP_URL = "./node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

const DEFAULT_URL = pdfPath;
const SEARCH_FOR = "bijection"; // try 'Mozilla';
const container = document.getElementById("viewerContainer");


const initialDispatch = PDFViewer.EventBus.prototype.dispatch;
PDFViewer.EventBus.prototype.dispatch = function (eventName) {
    console.log("EVENT!! ", eventName, arguments, " <--");
    const superReturn = initialDispatch.apply(this, arguments);
    console.log("Event return: ", superReturn);
    return superReturn;
}

const eventBus = new PDFViewer.EventBus();

// (Optionally) enable hyperlinks within PDF files.
const pdfLinkService = new PDFViewer.PDFLinkService({
    eventBus: eventBus,
});

// (Optionally) enable find controller.
const pdfFindController = new PDFViewer.PDFFindController({
    eventBus: eventBus,
    linkService: pdfLinkService,
});

const pdfViewer = new PDFViewer.PDFSinglePageViewer({
    container: container,
    eventBus: eventBus,
    linkService: pdfLinkService,
    findController: pdfFindController,
});
pdfLinkService.setViewer(pdfViewer);

eventBus.on("pagesinit", function () {
    // We can use pdfViewer now, e.g. let's change default scale.
    pdfViewer.currentScaleValue = "page-width";

    // We can try searching for things.
    if (SEARCH_FOR) {
        console.log("SEARCHING...");
        pdfFindController.executeCommand("find", { query: SEARCH_FOR });
    }
});

// Loading document.
const loadingTask = pdfjsLib.getDocument({
    url: DEFAULT_URL,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
});
loadingTask.promise.then(function (pdfDocument) {
    // Document loaded, specifying document for the viewer and
    // the (optional) linkService.
    pdfViewer.setDocument(pdfDocument);

    pdfLinkService.setDocument(pdfDocument, null);
});

(async() => {
    try {
        // Loading a document.
        const doc = await pdfjsLib.getDocument(pdfPath).promise;
        const { numPages } = doc;
        console.log("# Document Loaded");
        console.log("Number of Pages: " + numPages);
        console.log();

        const metadata = await doc.getMetadata();
        console.log("# Metadata Is Loaded");
        console.log("## Info");
        console.log(JSON.stringify(metadata.info, null, 2));
        console.log();
        if (metadata.metadata) {
            console.log("## Metadata");
            // @ts-ignore
            console.log(JSON.stringify(metadata.metadata.getAll(), null, 2));
            console.log();
        }


        // Loading of the first page will wait on metadata and subsequent loadings
        // will wait on the previous pages.
        for (let i = 1; i <= Math.min(numPages, 10); i++) {
            await loadPage(doc, i);
        }
    } catch (e) {
        console.error("Error: " + e);
    }
})()

async function loadPage (doc, pageNum) {
    const page = await doc.getPage(pageNum);

    console.log("# Page " + pageNum);
    const viewport = page.getViewport({ scale: 1.0 });
    console.log("Size: " + viewport.width + "x" + viewport.height);
    console.log();
    const textContent = await page.getTextContent();
    // Content contains lots of information about the text layout and
    // styles, but we need only strings at the moment
    const strings = textContent.items.map(function (item) {
        return item.str;
    });
    console.log("## Text Content");
    console.log(strings.join(" "));
}

// // Request a first page
// return pdfDocument.getPage(1).then(function (pdfPage) {
//   // Display page on the existing canvas with 100% scale.
//   var viewport = pdfPage.getViewport({ scale: 1.0 });
//   var canvas = document.getElementById("theCanvas");
//   canvas.width = viewport.width;
//   canvas.height = viewport.height;
//   var ctx = canvas.getContext("2d");
//   var renderTask = pdfPage.render({
//     canvasContext: ctx,
//     viewport: viewport,
//   });
//   return renderTask.promise;
// });
