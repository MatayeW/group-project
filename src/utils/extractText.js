// Pulls plain text out of a file, right in the browser. Nothing is uploaded anywhere.
export const ACCEPTED_FILES = ".txt,.md,.docx,.pdf,.png,.jpg,.jpeg,.webp";
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

const IMAGE_TYPES = ["png", "jpg", "jpeg", "webp"];

const getExtension = (name) => name.split(".").pop().toLowerCase();

const tidy = (text) => text.replace(/\r\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();

async function fromDocx(file) {
    const module = await import("mammoth/mammoth.browser");
    const mammoth = module.default ?? module;
    const arrayBuffer = await file.arrayBuffer();
    const {value} = await mammoth.extractRawText({arrayBuffer});
    return value;
}

async function fromPdf(file) {
    const pdfjs = await import("pdfjs-dist");
    const {default: workerUrl} = await import(
        "pdfjs-dist/build/pdf.worker.min.mjs?url"
    );
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

    const pdf = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;

    const pages = [];
    for (let number = 1; number <= pdf.numPages; number++) {
        const page = await pdf.getPage(number);
        const content = await page.getTextContent();
        const text = content.items
        .filter((item) => "str" in item)
        .map((item) => item.str + (item.hasEOL ? "\n" : " "))
        .join("")
        .replace(/[ \t]+\n/g, "\n");
        pages.push(text);
    }
    return pages.join("\n\n");
}

async function fromImage(file) {
    const {createWorker} = await import("tesseract.js");
    const worker = await createWorker("eng");
    try {
        const {data} = await worker.recognize(file);
        return data.text;
    } finally {
        await worker.terminate();
    }
}

export async function extractText(file) {
    const type = getExtension(file.name);
    let text;

    if (type === "txt" || type === "md") {
        text = await file.text();
    } else if (type === "docx") {
        text = await fromDocx(file);
    } else if (type === "pdf") {
        text = await fromPdf(file);
    } else if (IMAGE_TYPES.includes(type)) {
        text = await fromImage(file);
    } else if (type === "doc") {
        throw new Error("Old .doc files can't be read. Open it in Word, save it as .docx and try again.");
    } else {
        throw new Error("That file type isn't supported. Try .txt, .md, .docx, .pdf or an image.");
    }

    return tidy(text);
}