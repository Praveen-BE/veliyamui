// // ToolbarPlugin.tsx
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import {
//   $getSelection,
//   $isRangeSelection,
//   CAN_UNDO_COMMAND,
//   CAN_REDO_COMMAND,
//   FORMAT_TEXT_COMMAND,
//   FORMAT_ELEMENT_COMMAND,
//   UNDO_COMMAND,
//   REDO_COMMAND,
//   $isRootOrShadowRoot,
// } from "lexical";
// import { $findMatchingParent, mergeRegister } from "@lexical/utils";
// import { useCallback, useEffect, useState, useRef } from "react";
// import applyBlockType from "./formatActions";
// import { BLOCK_TYPES } from "./blockTypes";
// import Divider from "./Divider";
// import { ToolbarButton } from "./ToolbarButton";
// import { $isHeadingNode } from "@lexical/rich-text";
// import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

// export function ToolbarPlugin() {
//   const [editor] = useLexicalComposerContext();
//   const [canUndo, setCanUndo] = useState(false);
//   const [canRedo, setCanRedo] = useState(false);
//   const [blockType, setBlockType] = useState("paragraph");
//   const [isBold, setIsBold] = useState(false);
//   const [isItalic, setIsItalic] = useState(false);
//   const [isUnderline, setIsUnderline] = useState(false);

//   const $updateToolbar = useCallback(() => {
//     const selection = $getSelection();
//     if ($isRangeSelection(selection)) {
//       const anchorNode = selection.anchor.getNode();
//       let topLevelElement = $findMatchingParent(anchorNode, (e) => {
//         const parent = e.getParent();
//         return parent !== null && $isRootOrShadowRoot(parent);
//       });
//       if (topLevelElement === null) {
//         topLevelElement = anchorNode.getTopLevelElementOrThrow();
//       }

//       if ($isHeadingNode(topLevelElement)) {
//         setBlockType(topLevelElement.getTag());
//       } else {
//         setBlockType(topLevelElement.getType());
//       }
//       setIsBold(selection.hasFormat("bold"));
//       setIsItalic(selection.hasFormat("italic"));
//       setIsUnderline(selection.hasFormat("underline"));
//     }
//   }, []);

//   useEffect(() => {
//     return mergeRegister(
//       editor.registerUpdateListener(({ editorState }) => {
//         editorState.read(() => $updateToolbar());
//       }),
//       editor.registerCommand(
//         CAN_UNDO_COMMAND,
//         (p) => {
//           setCanUndo(p);
//           return false;
//         },
//         1,
//       ),
//       editor.registerCommand(
//         CAN_REDO_COMMAND,
//         (p) => {
//           setCanRedo(p);
//           return false;
//         },
//         1,
//       ),
//     );
//   }, [editor, $updateToolbar]);

//   return (
//     <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 bg-zinc-50 px-2 py-1.5 border-b border-black/10">
//       {/* dark:bg-zinc-800  */}
//       <select
//         value={blockType}
//         onChange={(e) => applyBlockType(editor, e.target.value)}
//         className="text-sm font-medium bg-transparent p-1"
//       >
//         {BLOCK_TYPES.map((t) => (
//           <option key={t.value} value={t.value}>
//             {t.label}
//           </option>
//         ))}
//       </select>

//       <Divider />

//       <ToolbarButton
//         label="Undo"
//         icon="/img/undo.svg"
//         disabled={!canUndo}
//         onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
//       />
//       <ToolbarButton
//         label="Redo"
//         icon="/img/redo.svg"
//         disabled={!canRedo}
//         onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
//       />

//       <Divider />

//       <ToolbarButton
//         label="Bold"
//         icon="/img/bold.svg"
//         isActive={isBold}
//         onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
//       />
//       <ToolbarButton
//         label="Italic"
//         icon="/img/italic.svg"
//         isActive={isItalic}
//         onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
//       />

//       <Divider />

//       <ToolbarButton
//         label="Left Align"
//         icon="/img/text-align-start.svg"
//         onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
//       />
//       <ToolbarButton
//         label="Center Align"
//         icon="/img/text-align-center.svg"
//         onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
//       />
//       <ToolbarButton
//         label="Right Align"
//         icon="/img/text-align-end.svg"
//         onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
//       />
//       <ToolbarButton
//         label="Justify Align"
//         icon="/img/text-align-justify.svg"
//         onClick={() =>
//           editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify")
//         }
//       />
//     </div>
//   );
// }

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
import { useParams } from "next/navigation";
import { INSERT_IMAGE_COMMAND } from "@/components/ImagePlugin"; // 👈 Ensure this path points to your ImagesPlugin file

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const { post_id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState("paragraph");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [uploading, setUploading] = useState(false); // 👈 Controls upload indicator state

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

  // ── R2 Image Upload Handler ──────────────────────────────────────────
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Safety handling for Next.js catch-all params types
      const cleanPostId = Array.isArray(post_id) ? post_id[0] : post_id || "";
      formData.append("postId", cleanPostId);

      const res = await fetch("http://localhost:5000/api/images/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Upload request failed");

      const data = await res.json();

      if (data?.url) {
        // Dispatches the link directly to your ImagesPlugin listener
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          src: data.url,
          altText: file.name,
        });
      }
    } catch (error) {
      console.error("Cloudflare R2 Upload failed:", error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ""; // Clear file input buffer
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-0.5 bg-zinc-50 px-2 py-1.5 border-b border-black/10">
      {/* Hidden Native Input Element */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

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

      {/* 👈 Newly Added Image Upload Trigger */}
      <button
        type="button"
        disabled={uploading}
        onClick={triggerFileInput}
        className="flex h-7 w-7 items-center justify-center rounded transition-colors hover:bg-zinc-200/70 disabled:opacity-50"
        title="Upload Image to R2"
      >
        {uploading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-transparent" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-700"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        )}
      </button>

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
