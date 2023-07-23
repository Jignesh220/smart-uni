// import React, { useRef, useEffect, useState } from "react";
// import { EditorState, Plugin, PluginKey } from "prosemirror-state";
// import { EditorView } from "prosemirror-view";
// import { Schema, DOMParser } from "prosemirror-model";
// import { addListNodes } from "prosemirror-schema-list";
// import { schema as basicSchema } from "prosemirror-schema-basic";
// import { toggleMark } from "prosemirror-commands";

// const customNodes = addListNodes(
//   basicSchema.spec.nodes,
//   "paragraph block*",
//   "block"
// );
// const customMarks = basicSchema.spec.marks;

// const customSchema = new Schema({
//   nodes: customNodes,
//   marks: customMarks,
// });

// const RichTextEditor: React.FC = () => {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const viewRef = useRef<EditorView>();
//   const [previewContent, setPreviewContent] = useState<string>("");

//   useEffect(() => {
//     const createEditor = () => {
//       const schema = customSchema;

//       const content = document.querySelector("#content");
//       if (!content) {
//         console.error("Content element not found.");
//         return;
//       }

//       const doc = DOMParser.fromSchema(schema).parse(content);

//       const state = EditorState.create({
//         doc,
//         schema,
//         plugins: [
//           new Plugin({
//             key: new PluginKey("my-custom-plugin"),
//             props: {
//               handleKeyDown(view, event) {
//                 if (event.key === "b" && (event.ctrlKey || event.metaKey)) {
//                   // Ctrl + B (Cmd + B) for bold
//                   toggleMark(schema.marks.strong)(view.state, view.dispatch);
//                   return true;
//                 }
//                 if (event.key === "i" && (event.ctrlKey || event.metaKey)) {
//                   // Ctrl + I (Cmd + I) for italic
//                   toggleMark(schema.marks.em)(view.state, view.dispatch);
//                   return true;
//                 }
//                 return false;
//               },
//             },
//           }),
//         ],
//       });

//       const view = new EditorView(editorRef.current!, {
//         state,
//         dispatchTransaction(transaction) {
//           const newState = view.state.apply(transaction);
//           view.updateState(newState);

//           // Update the preview content when the editor content changes
//           const htmlContent = view.dom.innerHTML;
//           setPreviewContent(htmlContent);
//         },
//       });

//       viewRef.current = view; // Store the view instance in a ref

//       return view;
//     };

//     const editorView = createEditor();

//     return () => {
//       editorView!.destroy();
//     };
//   }, []);

//   // ... (handleBoldClick and handleItalicClick functions)
//   const handleBoldClick = () => {
//     if (viewRef.current) {
//       toggleMark(customSchema.marks.strong)(
//         viewRef.current.state,
//         viewRef.current.dispatch
//       );
//     }
//   };

//   const handleItalicClick = () => {
//     if (viewRef.current) {
//       toggleMark(customSchema.marks.em)(
//         viewRef.current.state,
//         viewRef.current.dispatch
//       );
//     }
//   };

//   return (
//     <div className="prosemirror-container">
//       <div className="editor-buttons">
//         <button onClick={handleBoldClick} className="editor-button">
//           Bold
//         </button>
//         <button onClick={handleItalicClick} className="editor-button">
//           Italic
//         </button>
//       </div>
//       <div className="prosemirror" ref={editorRef}>
//         <div className="" id="content"></div>
//       </div>
//       <div className="preview">
//         <h3>Preview:</h3>
//         <div className="font-krylon">
//           <div className="font-krylon" dangerouslySetInnerHTML={{ __html: previewContent }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RichTextEditor;



// import React, { useState } from 'react';
// import { Editor, EditorState, RichUtils, CompositeDecorator, ContentState, DraftEditorCommand, DraftHandleValue, convertToRaw, convertFromRaw } from 'draft-js';
// import '@draft-js-plugins/inline-toolbar/lib/plugin.css';

// const Link: React.FC<any> = (props) => {
//   const { url } = props.contentState.getEntity(props.entityKey).getData();
//   return (
//     <Link
//       href={url}
//       className="text-blue-600"
//       onClick={(e:React.FormEvent) => {
//         e.preventDefault();
//         window.open(url, '_blank');
//       }}
//     >
//       {props.children}
//     </Link>
//   );
// };

// const decorators = new CompositeDecorator([
//   {
//     strategy: findLinkEntities,
//     component: Link,
//   },
// ]);

// function findLinkEntities(contentBlock: any, callback: any, contentState: any) {
//   contentBlock.findEntityRanges((character: any) => {
//     const entityKey = character.getEntity();
//     return (
//       entityKey !== null &&
//       contentState.getEntity(entityKey).getType() === 'LINK'
//     );
//   }, callback);
// }



// const RichTextEditor: React.FC = () => {
//   const [editorState, setEditorState] = useState(() =>
//     EditorState.createEmpty(decorators)
//   );

//   const onChange = (newEditorState: EditorState) => {
//     setEditorState(newEditorState);
//   };

//   const handleKeyCommand = (command: DraftEditorCommand): DraftHandleValue => {
//     const newState = RichUtils.handleKeyCommand(editorState, command);

//     if (newState) {
//       onChange(newState);
//       return 'handled';
//     }

//     return 'not-handled';
//   };

//   const handleBoldClick = () => {
//     onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
//   };

//   const handleItalicClick = () => {
//     onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
//   };

//   const handleLinkClick = () => {
//     const link = window.prompt('Enter a URL:');
//     if (!link || link.trim().length === 0) {
//       onChange(RichUtils.toggleLink(editorState, editorState.getSelection(), null));
//     } else {
//       const contentState = editorState.getCurrentContent();
//       const contentStateWithEntity = contentState.createEntity(
//         'LINK',
//         'MUTABLE',
//         { url: link }
//       ) as ContentState;
//       const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
//       const newEditorState = EditorState.set(editorState, {
//         currentContent: contentStateWithEntity,
//       });
//       onChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
//     }
//   };

// //   const handlePreviewClick = () => {
// //     const contentState = editorState.getCurrentContent();
// //     const contentStateJson = JSON.stringify(convertToRaw(contentState));
// //     console.log('Content State JSON:', contentStateJson);
// //   };

//   const renderPreview = () => {
//     return (
//       <Editor
//       onChange={()=>{}}
//         editorState={editorState}
//         readOnly={true}
//       />
//     );
//   };

//   return (
//     <div className="mt-4">
//       <div className="mb-2">
//         <button
//           className="text-base font-medium text-gray-800 mr-3"
//           onClick={handleBoldClick}
//         >
//           Bold
//         </button>
//         <button
//           className="text-base font-medium text-gray-800 mr-3"
//           onClick={handleItalicClick}
//         >
//           Italic
//         </button>
//         <button
//           className="text-base font-medium text-gray-800 mr-3"
//           onClick={handleLinkClick}
//         >
//           Link
//         </button>
//         <button
//           className="text-base font-medium text-gray-800"
//         //   onClick={handlePreviewClick}
//         >
//           Preview
//         </button>
//       </div>
//       <div className="bg-white border border-gray-300 p-4 mt-4">
//         <Editor
//           editorState={editorState}
//           onChange={onChange}
//           handleKeyCommand={handleKeyCommand}
//           placeholder="Write something..."
//         />
//       </div>
//       <div className="mt-4">
//         <h2 className="text-lg font-semibold">Preview:</h2>
//         <div className="bg-white border border-gray-300 p-4 mt-2 font-krylon" style={{ minHeight: '100px' }}>
//           {/* Render the preview content here */}
//           {renderPreview()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RichTextEditor;


import React, { useState, useEffect } from 'react';
import { Editor, EditorState, RichUtils, CompositeDecorator, ContentState, DraftEditorCommand, DraftHandleValue, convertToRaw, convertFromRaw } from 'draft-js';
import '@draft-js-plugins/inline-toolbar/lib/plugin.css';
import draftToHtml from 'draftjs-to-html';

const Link: React.FC<any> = (props) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a
      href={url}
      className="text-blue-600"
      onClick={(e) => {
        e.preventDefault();
        window.open(url, '_blank');
      }}
    >
      {props.children}
    </a>
  );
};

const decorators = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

function findLinkEntities(contentBlock: any, callback: any, contentState: any) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}



const RichTextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(decorators)
  );

  useEffect(() => {
    // Whenever editorState changes, update the preview
    renderPreview();
  }, [editorState]);

  const onChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const handleKeyCommand = (command: DraftEditorCommand): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  const handleBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  const handleItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  const handleLinkClick = () => {
    const link = window.prompt('Enter a URL:');
    if (!link || link.trim().length === 0) {
      onChange(RichUtils.toggleLink(editorState, editorState.getSelection(), null));
    } else {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        { url: link }
      ) as ContentState;
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      onChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    }
  };

  const handlePreviewClick = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateJson = JSON.stringify(convertToRaw(contentState));
    console.log('Content State JSON:', contentStateJson);
  };

  // const renderPreview = (text:any) => {
  //   const contentState = editorState.getCurrentContent();
  //   const rawContentState = convertToRaw(contentState);
  //   const previewContent = rawContentState.blocks.map((block) => block.text).join('\n');
  //   return (
  //     <Editor
  //     onChange={()=>{}}
  //     editorState={text}
  //     />
  //   );
  // };

  const PreviewContent: React.FC<{ editorState: any }> = ({ editorState }) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
  
    // Convert raw content state back to ContentState
    const contentStateFromRaw = convertFromRaw(rawContentState);
    const previewEditorState = EditorState.createWithContent(contentStateFromRaw);
    console.log(rawContentState);
    
  
    return (
      <div className="preview-content">
        <Editor
          editorState={previewEditorState}
          readOnly={true}
          onChange={()=>{}}
          blockStyleFn={(contentBlock) => 'preview-content-block'}
        />
      </div>
    );
  };

  const renderPreview = () => {
    return (
      <div className="bg-white border border-gray-300 p-4 mt-2" style={{ minHeight: '100px' }}>
        <h2 className="text-lg font-semibold">Preview:</h2>
        <PreviewContent editorState={editorState} />
      </div>
    );
  };

  return (
    <div className="mt-4">
      <div className="mb-2">
        <button
          className="text-base font-medium text-gray-800 mr-3"
          onClick={handleBoldClick}
        >
          Bold
        </button>
        <button
          className="text-base font-medium text-gray-800 mr-3"
          onClick={handleItalicClick}
        >
          Italic
        </button>
        <button
          className="text-base font-medium text-gray-800 mr-3"
          onClick={handleLinkClick}
        >
          Link
        </button>
        <button
          className="text-base font-medium text-gray-800"
          onClick={handlePreviewClick}
        >
          Preview
        </button>
      </div>
      <div className=" border border-gray-300 py-16 mt-4 overflow-hidden overflow-y-scroll max-h-[80vh] ">
        <Editor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          placeholder="Write something..."
        />
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-semibold">Preview:</h2>
        <div className="bg-white border border-gray-300 p-4 mt-2" style={{ minHeight: '100px' }}>
          {/* Render the preview content here */}
          {renderPreview()}
        </div>
      </div>
    </div>
  );
};

function customStyle(contentBlock:any) {
    const type = contentBlock.getType();
    if (type === 'blockquote') {
      return 'superFancyBlockquote';
    }
  }
  
export default RichTextEditor;





