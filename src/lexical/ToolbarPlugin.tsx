// ToolbarPlugin.tsx
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $getSelection,
  $isRangeSelection,
  CAN_UNDO_COMMAND,
  CAN_REDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
  $isRootOrShadowRoot,
} from "lexical";
import { $findMatchingParent, mergeRegister } from "@lexical/utils";
import { useCallback, useEffect, useState, useRef } from "react";
import applyBlockType from "./formatActions";
import { BLOCK_TYPES } from "./blockTypes";
import Divider from "./Divider";
import { ToolbarButton } from "./ToolbarButton";
import { $isHeadingNode } from "@lexical/rich-text";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let topLevelElement = $findMatchingParent(anchorNode, (e) => {
        const parent = e.getParent();
        return parent !== null && $isRootOrShadowRoot(parent);
      });
      if (topLevelElement === null) {
        topLevelElement = anchorNode.getTopLevelElementOrThrow();
      }

      if ($isHeadingNode(topLevelElement)) {
        setBlockType(topLevelElement.getTag());
      } else {
        setBlockType(topLevelElement.getType());
      }
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => $updateToolbar());
      }),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (p) => {
          setCanUndo(p);
          return false;
        },
        1,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (p) => {
          setCanRedo(p);
          return false;
        },
        1,
      ),
    );
  }, [editor, $updateToolbar]);

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 bg-zinc-50 px-2 py-1.5 border-b border-black/10">
      {/* dark:bg-zinc-800  */}
      <select
        value={blockType}
        onChange={(e) => applyBlockType(editor, e.target.value)}
        className="text-sm font-medium bg-transparent p-1"
      >
        {BLOCK_TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>

      <Divider />

      <ToolbarButton
        label="Undo"
        icon="/img/undo.svg"
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
      />
      <ToolbarButton
        label="Redo"
        icon="/img/redo.svg"
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
      />

      <Divider />

      <ToolbarButton
        label="Bold"
        icon="/img/bold.svg"
        isActive={isBold}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      />
      <ToolbarButton
        label="Italic"
        icon="/img/italic.svg"
        isActive={isItalic}
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      />

      <Divider />

      <ToolbarButton
        label="Left Align"
        icon="/img/text-align-start.svg"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
      />
      <ToolbarButton
        label="Center Align"
        icon="/img/text-align-center.svg"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
      />
      <ToolbarButton
        label="Right Align"
        icon="/img/text-align-end.svg"
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
      />
      <ToolbarButton
        label="Justify Align"
        icon="/img/text-align-justify.svg"
        onClick={() =>
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
        }
      />
    </div>
  );
}
