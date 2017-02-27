import _capitalize from 'lodash/capitalize';

export function getDocumentSize(param) {
    if (window.document) {
        // stolen from jQuery, because it well tested and pretty cross-browser
        const name = _capitalize(param);
        const elem = window.document;
        const doc = window.document.documentElement;
        return Math.max(
            elem.body[`scroll${name}`],
            doc[`scroll${name}`],
            elem.body[`offset${name}`],
            doc[`offset${name}`],
            doc[`client${name}`]
        );
    }
    return 0;
}
