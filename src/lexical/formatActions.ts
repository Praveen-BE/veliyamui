import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $createParagraphNode, $getSelection, LexicalEditor } from "lexical";

function formatParagraph(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection();
    $setBlocksType(selection, () => $createParagraphNode());
  });
}

function formatHeading(editor: LexicalEditor, headingTag: "h1" | "h2" | "h3") {
  editor.update(() => {
    const selection = $getSelection();
    $setBlocksType(selection, () => $createHeadingNode(headingTag));
  });
}

function formatQuote(editor: LexicalEditor) {
  editor.update(() => {
    const selection = $getSelection();
    $setBlocksType(selection, () => $createQuoteNode());
  });
}

export default function applyBlockType(editor: LexicalEditor, type: string) {
  if (type === "paragraph") {
    formatParagraph(editor);
  } else if (type === "quote") {
    formatQuote(editor);
  } else {
    formatHeading(editor, type as "h1" | "h2" | "h3");
  }
}
