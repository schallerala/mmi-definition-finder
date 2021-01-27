// @ts-ignore
stork.register(
    "mmi",
    "mmi.st", {
        onQueryUpdate: function (search, results) {
            console.log("on query update");
        },
        onResultSelected: function (search, { entry: { fields: { pdf } } }) {
            searchFor = search;
            return onSelectResult(`output/${pdf}`);
        }
    }
);
import pdfjsLib = require("pdfjs-dist");
import PDFViewer = require("pdfjs-dist/web/pdf_viewer");
require("pdfjs-dist/build/pdf.worker.entry");

// Some PDFs need external cmaps.
const CMAP_URL = "./node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

let searchFor = "";

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
    container,
    eventBus,
    linkService: pdfLinkService,
    findController: pdfFindController,
});
pdfLinkService.setViewer(pdfViewer);

/*
 *  ACTUALLY, we have a WINNER over the WINNER! LaTeX: Standalone with multi class option
 *  and use the single page viewer!
 *  WE HAVE A WINNER! USE A a \href{#my-file.pdf}{TEXT} and capture in pdfHistory#push
 */
const initialPush = PDFViewer.PDFHistory.prototype.push;
/**
 * @param parameters {
 *  "namedDest": "1-2-2-22-other.pdf", <-------------
 *  "explicitDest":[
 *      {"num":3,"gen":0},
 *      {"name":"Fit"}
 *  ],
 *  "pageNumber":1
 * }
 */
PDFViewer.PDFHistory.prototype.push = function (parameters) {
    console.log("on push", arguments);
    debugger;
    return initialPush.apply(this, arguments);
}

const pdfHistory = new PDFViewer.PDFHistory({
    linkService: pdfLinkService,
    eventBus
});

pdfLinkService.setHistory(pdfHistory);

eventBus.on("pagesinit", function () {
    // We can use pdfViewer now, e.g. let's change default scale.
    pdfViewer.currentScaleValue = "page-width";

    // We can try searching for things.
    if (searchFor) {
        console.log("SEARCHING...");
        pdfFindController.executeCommand("find", { query: searchFor });
    }
});

async function onSelectResult (url) {
    // Loading document.
    const loadingTask = pdfjsLib.getDocument({
        url,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED,
    });

    const pdfDocument = await loadingTask.promise;
    // Document loaded, specifying document for the viewer and
    // the (optional) linkService.
    pdfViewer.setDocument(pdfDocument);
    const destinations = await pdfDocument.getDestinations();
    console.log('---- destinations:', destinations);

    pdfLinkService.setDocument(pdfDocument, null);
}
