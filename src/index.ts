import {resetHighlight, templateItemsTree, TreeItem, wrapAll} from './TreeComponent';

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js';
const outline = require('../output/outline.json') as Array<TreeItem>;
const indexes = require('../output/indexes.json') as { [name: string]: string };

const mmiPdf = "output/OrigMMI2020.pdf";

// Some PDFs need external cmaps.
const CMAP_URL = "./node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

let numPages = 1;
let searchFor = "";

const container = document.getElementById("viewerContainer");

const treeRoot = document.getElementById('treeView');

const initialDispatch = pdfjsViewer.EventBus.prototype.dispatch;
pdfjsViewer.EventBus.prototype.dispatch = function (eventName) {
    // console.log("EVENT!! ", eventName, arguments, " <--");
    const superReturn = initialDispatch.apply(this, arguments);
    // console.log("Event return: ", superReturn);
    return superReturn;
}

const eventBus = new pdfjsViewer.EventBus();

// (Optionally) enable hyperlinks within PDF files.
const pdfLinkService = new pdfjsViewer.PDFLinkService({
    eventBus: eventBus,
});


// (Optionally) enable find controller.
const pdfFindController = new pdfjsViewer.PDFFindController({
    eventBus: eventBus,
    linkService: pdfLinkService,
});

const pdfViewer = new pdfjsViewer.PDFSinglePageViewer({
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
const initialPush = pdfjsViewer.PDFHistory.prototype.push;
pdfjsViewer.PDFHistory.prototype.push = function ({ pageNumber }) {
    // console.log("on push", arguments);
    // debugger;
    const parentReturn = initialPush.apply(this, arguments);
    goToPage(pageNumber);
    return parentReturn;
}

const pdfHistory = new pdfjsViewer.PDFHistory({
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

function populateIndexesSelection () {
    const indexSelectDom = document.querySelector("#index-selection") as HTMLSelectElement;
    indexSelectDom.innerHTML =
        Object.entries(indexes).map(([key, index]) => `<option value="${key}">${key}</option>`).join('');

    const defaultIndex = indexes.hasOwnProperty('all') ? 'all' : Object.keys(indexes)[0];
    const indexQueryParam = getQueryVariable('index', defaultIndex);

    const indexNameToLoad = indexes.hasOwnProperty(indexQueryParam)
        ? indexQueryParam
        : defaultIndex;

    indexSelectDom.value = indexNameToLoad;

    indexSelectDom.addEventListener('change', ({ target }) => {
        const { value } = target as HTMLSelectElement;
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('index', value);
        window.location.search = searchParams.toString();
        // FIXME, force download new index
    });
}

function getIndexSelection (): string {
    const { value } = document.querySelector("#index-selection") as HTMLSelectElement;
    return value;
}

function hookIndexLoadOnActivate (dataStorkSelector: string) {
    const inputElement = document.querySelector(`input[data-stork="${dataStorkSelector}"]`);
    inputElement.addEventListener('focus', () => {
        loadIndex(dataStorkSelector)
            .then(() => inputElement.classList.remove('disabled'));
    }, {
        once: true
    });
}

async function loadIndex (dataStorkSelector: string) {
    const indexNameToLoad = getIndexSelection();

    // Following the code, we could believe we need a await on the download index
    // however, with an await, the code breaks... therefore, if not loading, try adding
    // await
    stork.downloadIndex(
        dataStorkSelector,
        indexes[indexNameToLoad], {
            // forceOverwrite: true, FIXME, wait release of new version
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

    await stork.attach('mmi');
}

(async () => {
    populateIndexesSelection();
    hookIndexLoadOnActivate('mmi');

    await Promise.all([
        loadDocument(),
        stork.initialize() // loads the wasm file
    ]);

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


function getQueryVariable(variable: string, defaultValue?: string) {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return defaultValue;
}
