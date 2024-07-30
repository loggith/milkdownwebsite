import { CodemirrorRef } from "../../components/codemirror";
import type { MilkdownRef } from "../../components/playground-editor";
import { FeatureToggleProvider } from "../../components/playground-editor/FeatureToggleProvider";
import { InspectorProvider } from "../../components/playground-editor/InspectorProvider";
import { ProseStateProvider } from "../../components/playground-editor/ProseStateProvider";
import { ShareProvider } from "../../components/playground-editor/ShareProvider";
import { compose } from "../../utils/compose";
import { decode } from "../../utils/share";
import { MilkdownProvider } from "@milkdown/react";
import { ProsemirrorAdapterProvider } from "@prosemirror-adapter/react";
import { useRouter } from "next/router";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import React from "react";
import { PlaygroundMilkdown } from "../../components/playground-editor";
import { ControlPanel } from "../../components/playground/control-panel";

import snApi from "sn-extension-api";

snApi.initialize({
  debounceSave: 400,
});

snApi.subscribe(() => {
  console.log("snApi.text:", snApi.text);
});

const Provider = compose(
  FeatureToggleProvider,
  MilkdownProvider,
  ProsemirrorAdapterProvider,
  ProseStateProvider,
  ShareProvider,
  InspectorProvider
);

let myBool = false;

export const Playground: FC = () => {
  const template = "Loading...";
  const [content, setContent] = useState(template);

  // useEffect(() => {
  //   snApi.subscribe(() => {
  //     setContent(snApi.text);
  //     const { current } = milkdownRef;
  //     current?.update(snApi.text);
  //     const codemirror = codemirrorRef.current;
  //     codemirror?.update(snApi.text);
  //     myBool = true;
  //     console.log("myBool:true snApi.text:", snApi.text);
  //   });
  // }, []);

  const router = useRouter();
  const path = router.asPath;

  useEffect(() => {
    const [_, search = ""] = path.split("?");
    const searchParams = new URLSearchParams(search);
    const text = searchParams.get("text");
    if (text) {
      setContent(decode(text));
    }
  }, [path]);

  const lockCodemirror = useRef(false);
  const milkdownRef = useRef<MilkdownRef>(null);
  const codemirrorRef = useRef<CodemirrorRef>(null);

  const onMilkdownChange = useCallback((markdown: string) => {
    const lock = lockCodemirror.current;
    if (lock) return;

    const codemirror = codemirrorRef.current;
    if (!codemirror) return;
    codemirror.update(markdown);
    console.log("when Callback myBool:", myBool);
    if (!myBool) return;
    snApi.text = markdown;
  }, []);

  const onCodemirrorChange = useCallback((getCode: () => string) => {
    const { current } = milkdownRef;
    if (!current) return;
    const value = getCode();
    current.update(value);
    if (!myBool) return;
    snApi.text = value;
  }, []);

  return (
    <Provider>
      <div className="h-[calc(50vh-2rem)] overflow-auto overscroll-none md:h-[calc(100vh-0px)]">
        <PlaygroundMilkdown
          milkdownRef={milkdownRef}
          content={content}
          onChange={onMilkdownChange}
        />
      </div>
      <div className="h-[calc(50vh-2rem)] overflow-auto overscroll-none border-l border-gray-300 dark:border-gray-600 md:h-[calc(100vh-0px)]">
        <ControlPanel
          codemirrorRef={codemirrorRef}
          content={content}
          onChange={onCodemirrorChange}
          lock={lockCodemirror}
        />
      </div>
    </Provider>
  );
};
