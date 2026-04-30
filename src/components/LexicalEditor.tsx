"use client";
import React from "react";
import { lexicalEditorTheme } from "@/utils/LexicalEditorTheme";
import LoadState from "../lexical/LoadState";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { RichTextExtension } from "@lexical/rich-text";
import {
  defineExtension,
  SerializedEditorState,
  SerializedLexicalNode,
} from "lexical";
import { ToolbarPlugin } from "@/lexical/ToolbarPlugin";
import { HistoryExtension } from "@lexical/history";
import { TabIndentationExtension } from "@lexical/extension";
import { LexicalExtensionComposer } from "@lexical/react/LexicalExtensionComposer";

// Define the prop type
interface LexicalEditorProps {
  lexical_content?: SerializedEditorState<SerializedLexicalNode>; // Adjust type if you have a stricter Lexical JSON schema
}

// Error handler type
function onError(error: Error): void {
  console.error(error);
}

const landingHeroExtension = defineExtension({
  dependencies: [RichTextExtension, HistoryExtension, TabIndentationExtension],
  name: "@lexical/website/landing-hero-editor",
  namespace: "@lexical/website/landing-hero-editor",
  theme: lexicalEditorTheme,
});

const LexicalEditor: React.FC<LexicalEditorProps> = ({ lexical_content }) => {
  return (
    <LexicalExtensionComposer
      extension={landingHeroExtension}
      contentEditable={null}
    >
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-solid border-black/10 ">
        {/* dark:border-white/10 dark:bg-stone-800 */}
        {/* Toolbar — contains image upload button */}
        {/* <LoadState lexicalJson={lexical_content} /> */}
        <ToolbarPlugin />

        {/* Editor area */}
        <div className="relative">
          <ContentEditable
            className="h-55 overflow-y-auto p-4 text-base leading-relaxed text-wrap outline-none"
            aria-label="Rich text editor"
            aria-placeholder="Enter some text..."
            placeholder={
              <div className="pointer-events-none absolute top-4 left-4 text-zinc-400 select-none">
                Enter some text...
              </div>
            }
          />
        </div>
      </div>
    </LexicalExtensionComposer>
  );
};

export default LexicalEditor;
