import {resetHighlight, templateItemsTree, TreeItem, wrapAll} from './TreeComponent';

import pdfjsLib = require("pdfjs-dist");
import PDFViewer = require("pdfjs-dist/web/pdf_viewer");
import * as storkModule from './stork';
const stork = storkModule.stork;
const outline = require('../output/outline.json') as Array<TreeItem>;
require("pdfjs-dist/build/pdf.worker.entry");

const mmiPdf = "output/OrigMMI2020.pdf";

// Some PDFs need external cmaps.
const CMAP_URL = "./node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

let numPages = 1;
let searchFor = "";

const container = document.getElementById("viewerContainer");

const treeRoot = document.getElementById('treeView');

const initialDispatch = PDFViewer.EventBus.prototype.dispatch;
PDFViewer.EventBus.prototype.dispatch = function (eventName) {
    // console.log("EVENT!! ", eventName, arguments, " <--");
    const superReturn = initialDispatch.apply(this, arguments);
    // console.log("Event return: ", superReturn);
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
PDFViewer.PDFHistory.prototype.push = function ({ pageNumber }) {
    // console.log("on push", arguments);
    // debugger;
    const parentReturn = initialPush.apply(this, arguments);
    goToPage(pageNumber);
    return parentReturn;
}

const pdfHistory = new PDFViewer.PDFHistory({
    linkService: pdfLinkService,
    eventBus
});

pdfLinkService.setHistory(pdfHistory);

eventBus.on("pagesinit", function () {
    // We can use pdfViewer now, e.g. let's change default scale.
    pdfViewer.currentScaleValue = "page-width";
});

function goToPage (page: number, executeFind: boolean = false, query?: string) {
    page = checkPages(page);
    pdfViewer.currentPageNumber = page;
    if (executeFind && query)
        pdfFindController.executeCommand("find", { query });
    wrapAll(treeRoot);
    resetHighlight(treeRoot)
    makeSureVisible(page, treeRoot);
}

async function loadDocument () {
    // Loading document.
    const loadingTask = pdfjsLib.getDocument({
        url: mmiPdf,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED,
    });

    const pdfDocument = await loadingTask.promise;

    numPages = pdfDocument.numPages;

    // Document loaded, specifying document for the viewer and
    // the (optional) linkService.
    pdfViewer.setDocument(pdfDocument);
    // const destinations = await pdfDocument.getDestinations();
    // console.log('---- destinations:', destinations);

    pdfLinkService.setDocument(pdfDocument, null);
}

(async () => {
    // await initialize('pkg/stork.wasm');

    // @ts-ignore
    stork.register(
        "mmi",
        "output/mmi-all.st", {
            onQueryUpdate: function (search, results) {
                console.log("on query update");
            },
            onResultSelected: function (search, { entry: { fields: { page } }, excerpts }) {
                searchFor = search;
                console.log("page:", page);
                return goToPage(parseInt(page), excerpts.length > 0, search);
            }
        }
    );

    await loadDocument();

    templateItemsTree(
        outline.map(addPageNavigationOnTreeItem),
        treeRoot
    );

    document.addEventListener('keyup', ({ key, target }) => {
        if (target === document.body) {
            switch (key) {
                case "b":
                    goToPage(pdfViewer.currentPageNumber - 1);
                    break;
                case "n":
                    goToPage(pdfViewer.currentPageNumber + 1);
                    break;
            }
        }
    });
})();

function checkPages (page: number): number {
    return Math.max(0, Math.min(page, numPages));
}

function addPageNavigationOnTreeItem (tree: TreeItem): TreeItem {
    const currentListener = tree.onClick;
    tree.onClick = ((item, domTarget, mouseEvent) => {
        resetHighlight(treeRoot);
        domTarget.querySelector('.item-text').classList.add('highlight');
        if (item.page)
            pdfViewer.currentPageNumber = item.page;
        if (currentListener) {
            currentListener(item, domTarget, mouseEvent);
        }
    });
    if (tree.children) {
        tree.children = tree.children.map(addPageNavigationOnTreeItem)
    }
    return tree;
}

// improve
function makeSureVisible (page: number, rootElement: HTMLElement): void {
    let domItem = rootElement.querySelector(`[data-page="${page}"]`);
    if (domItem) {
        domItem.querySelector('.item-text').classList.add('highlight');
        while (domItem.parentElement && domItem.parentElement !== rootElement) {
            if (domItem.classList.contains('nested') && ! domItem.classList.contains('active'))
                domItem.classList.toggle('active');
            domItem = domItem.parentElement;
        }
    }

}
