import React from "react";
import {
  DOMConversionMap,
  DOMConversionOutput,
  DOMExportOutput,
  EditorConfig,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  Spread,
} from "lexical";
import { DecoratorNode } from "lexical";

export interface ImagePayload {
  altText?: string;
  key?: NodeKey;
  src: string;
}

export type SerializedImageNode = Spread<
  {
    altText: string;
    src: string;
  },
  SerializedLexicalNode
>;

export class ImageNode extends DecoratorNode<React.ReactNode> {
  __src: string;
  __altText: string;

  static getType(): string {
    return "image";
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode(node.__src, node.__altText, node.__key);
  }

  static importJSON(serializedNode: SerializedImageNode): ImageNode {
    const { src, altText } = serializedNode;
    return $createImageNode({ src, altText });
  }

  constructor(src: string, altText?: string, key?: NodeKey) {
    super(key);
    this.__src = src;
    this.__altText = altText || "Uploaded image";
  }

  exportJSON(): SerializedImageNode {
    return {
      altText: this.__altText,
      src: this.__src,
      type: "image",
      version: 1,
    };
  }

  createDOM(config: EditorConfig): HTMLElement {
    const span = document.createElement("span");
    const theme = config.theme;
    if (theme.image) {
      span.className = theme.image;
    }
    return span;
  }

  updateDOM(): false {
    return false;
  }

  // Renders the actual image component directly in the editor UI
  decorate(): React.ReactNode {
    return (
      <div className="my-4 flex w-full justify-center select-none user-select-none">
        <img
          src={this.__src}
          alt={this.__altText}
          className="max-h-112.5 max-w-full rounded-lg object-contain shadow-sm"
          draggable="false"
        />
      </div>
    );
  }
}

export function $createImageNode({ src, altText }: ImagePayload): ImageNode {
  return new ImageNode(src, altText);
}

export function $isImageNode(
  node: LexicalNode | null | undefined,
): node is ImageNode {
  return node instanceof ImageNode;
}
