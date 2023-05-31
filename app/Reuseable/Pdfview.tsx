"use client";
import React from "react";

import {
  Viewer,
  Worker,
  RenderPage,
  RenderPageProps,
} from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PdfviewProps {
  fileurl: string;
}

export default function Pdfview({ fileurl }: PdfviewProps) {
  //   const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const renderToolbar = (
    Toolbar: (props: ToolbarProps) => React.ReactElement
  ) => (
    <Toolbar>
      {(props: ToolbarSlot) => {
        const {
          CurrentPageInput,
          Download,
          EnterFullScreen,
          GoToNextPage,
          GoToPreviousPage,
          NumberOfPages,
          Print,
          ZoomIn,
          ZoomOut,
        } = props;
        return (
          <>
            <div style={{ padding: "0px 2px" }}>
              <ZoomOut />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <ZoomIn />
            </div>
            <div style={{ padding: "0px 2px", marginLeft: "auto" }} className="text-white">
              <GoToPreviousPage />
            </div>
            <div style={{ padding: "0px 2px", width: "4rem" }} className="text-white">
              <CurrentPageInput />
            </div>
            <div style={{ padding: "0px 2px" }} className="text-sm">
              / <NumberOfPages />
            </div>
            <div style={{ padding: "0px 2px" }} className="text-sm">
              <GoToNextPage />
            </div>
            <div style={{ padding: "0px 2px", marginLeft: "auto" }}>
              <EnterFullScreen />
            </div>
            <div style={{ padding: "0px 2px" }}>
              <Print />
            </div>
          </>
        );
      }}
    </Toolbar>
  );
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) => [],
  });
  return (
    <div className="scrollbar-hidden">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
        <div style={{ height: "750px", position: "relative" }} className="scrollbar-hidden relative overflow-hidden border-0 ">
          <Viewer fileUrl={fileurl} plugins={[defaultLayoutPluginInstance]} theme="dark"/>
        </div>
      </Worker>
    </div>
  );
}
