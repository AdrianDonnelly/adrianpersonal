import stripMarkdown from 'remove-markdown';
import type {ParsedFile, ParsedFiles} from './schemas';

function SplitTableOfContents(data: string): [string, string] {
    const tocTag = '[//]: # (TOC_END)\n';
    const tocIndex = data.indexOf(tocTag);
    if (tocIndex === -1) return ['', data];
    return [data.slice(0, tocIndex + tocTag.length), data.slice(tocIndex + tocTag.length)];
}

function IsLocalFileReference(str: string) {
    return str.startsWith('<local:') && str.endsWith('>');
}

function ConvertReference(data: string, folder: string, contentDir: string, files: ParsedFiles) {
    if (!IsLocalFileReference(data)) return data;
    const filename = data.slice(7, -1);
    const filepath = `${folder}/content/${filename}`;
    const file = files.find((file) => file.ContentLocation.endsWith(filepath));
    if (!file) throw new Error(`File ${filename} not found.`);
    return `${contentDir}${file.Hash}.${file.Extension}`;
}

function ConvertReferences(data: string, folder: string, contentDir: string, files: ParsedFiles) {
    return data.replace(/<local:(.*?)>/g, (match, filename) => {
        const filepath = `${folder}/content/${filename}`;
        const file = files.find((file) => file.ContentLocation.endsWith(filepath));
        if (!file) throw new Error(`File ${filename} not found in ${folder}.`);
        return `${contentDir}${file.Hash}.${file.Extension}`;
    });
}

export {
    SplitTableOfContents,
    IsLocalFileReference,
    ConvertReferences,
    ConvertReference
};