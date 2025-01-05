"use client"

import {
  Anchor,
  Button,
  Checkbox,
  Container,
  type DefaultMantineColor,
  LoadingOverlay,
  type MantineColorsTuple,
  MantineProvider,
  Select,
  TextInput,
} from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { IconChevronDown } from "@tabler/icons-react"
import type { ReactNode } from "react"

// default
import "@mantine/core/styles.css"

// components
// import "@mantine/carousel/styles.css"
import "@mantine/notifications/styles.css"

// original
import "./styles/global.css"

import { Z_INDEX } from "./consts"
import ActiveClassNames from "./styles/Active.module.css"
import ButtonClassNames from "./styles/Button.module.css"
import SelectClassNames from "./styles/Select.module.css"
import TextInputClassNames from "./styles/TextInput.module.css"

const appColors = {
  // warning, error, brand-*, text-*, accent
  body: ["", "", "", "", "", "", "#ECEEF1", "", "", ""],
  primary: ["", "", "", "", "", "", "#5F4DD7", "", "", ""],
  success: ["", "", "", "", "", "", "#21D1A7", "", "", ""],
  warning: ["", "", "", "", "", "", "#F76707", "", "", ""],
  error: ["", "", "", "", "", "", "#f03e3e", "", "", ""],
} as const

export const MantineUIProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider
      theme={{
        black: "#404040",
        primaryColor: "primary",
        colors: appColors,
        fontFamily: "Noto Sans JP, sans-serif",
        components: {
          Container: Container.extend({
            defaultProps: {
              size: "lg", // 1140px, p:16px
            },
          }),
          /**
           * 主要要素
           */
          Anchor: Anchor.extend({
            defaultProps: { c: "#4484BC", underline: "always" },
          }),
          Button: Button.extend({
            classNames: ButtonClassNames,
          }),
          /**
           * フォーム要素
           */
          Select: Select.extend({
            classNames: SelectClassNames,
            defaultProps: {
              variant: "default",
              placeholder: "Select",
              withCheckIcon: false,
              rightSection: <IconChevronDown width={20} color="#070A12" />,
              comboboxProps: { withinPortal: true, transitionProps: { transition: "scale-y", duration: 300 }, shadow: "md" },
            },
          }),
          TextInput: TextInput.extend({
            classNames: TextInputClassNames,
            defaultProps: { variant: "filled" },
          }),
          Checkbox: Checkbox.extend({
            defaultProps: { color: "#4484BC", iconColor: "white" },
          }),
          /**
           * モーダル要素
           */
          LoadingOverlay: LoadingOverlay.extend({
            defaultProps: { zIndex: Z_INDEX.LOADING, overlayProps: { blur: 1 }, loaderProps: { color: "primary", type: "bars" } },
          }),
          // Modal: Modal.extend({
          //   defaultProps: {
          //     transitionProps: { transition: "fade", duration: 300 },
          //     styles: { header: { padding: "24px" }, body: { padding: 0 }, title: { fontSize: "24px", fontWeight: "bold" } },
          //     closeButtonProps: { icon: <Image src={Images.CLOSE} w={32} h={32} /> },
          //   },
          // }),
        },
        /**
         * Press Button(ActionIcon) action style.
         * */
        activeClassName: ActiveClassNames.active,
      }}
    >
      <Notifications />
      {children}
    </MantineProvider>
  )
}

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<"primary" | DefaultMantineColor, MantineColorsTuple>
  }
}
