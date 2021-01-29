// inspired by https://www.w3schools.com/howto/howto_js_treeview.asp

export function templateItemsTree (children: Array<TreeItem>, parent?: HTMLElement): Array<HTMLElement> {
    let items = children.map(templateItemTree);
    parent?.append(...items);
    return items;
}

export function templateItemTree (item: TreeItem): HTMLElement {
    const itemDom = document.createElement('li');
    if (item.page)
        itemDom.setAttribute('data-page', item.page.toString());
    const itemTextDom = document.createElement('span');
    itemTextDom.classList.add('item-text');
    itemTextDom.innerText = item.text;
    itemTextDom.addEventListener('click', function (e) {
        if (item.onClick)
            item.onClick(item, itemDom, e)
    });
    itemDom.append(itemTextDom);

    if (item.children && item.children.length > 0) {
        const caretDom = document.createElement('span');
        caretDom.classList.add('caret');
        caretDom.addEventListener('click', function () {
            this.parentElement.querySelector('.nested').classList.toggle('active');
            this.classList.toggle('down');
        })
        itemDom.prepend(caretDom);
        const nestedDom = document.createElement('ul');
        nestedDom.classList.add('nested');
        for (const child of item.children) {
            nestedDom.append(templateItemTree(child));
        }
        itemDom.append(nestedDom);
    } else {
        itemTextDom.classList.add('no-caret');
    }

    return itemDom;
}

export function wrapAll (rootElement: HTMLElement): void {
    rootElement.querySelectorAll('.nested.active').forEach(openElement => openElement.classList.toggle('active'));
}

export function resetHighlight (rootElement: HTMLElement): void {
    rootElement.querySelectorAll('.highlight').forEach(highlightedElement => highlightedElement.classList.toggle('highlight'));
}

export interface TreeItem {
    text: string,
    page?: number,
    onClick?: (item: TreeItem, domTarget: HTMLElement, mouseEvent: MouseEvent) => any
    children?: Array<TreeItem>
}
