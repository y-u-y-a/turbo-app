"use client"

import {
  Anchor,
  Button,
  Checkbox,
  Container,
  type DefaultMantineColor,
  type MantineColorsTuple,
  MantineProvider,
  NumberInput,
  TextInput,
  Textarea,
} from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import type { ReactNode } from "react"

// dates
import { DateInput, DatesProvider } from "@mantine/dates"
import dayjs from "dayjs"
import "dayjs/locale/ja"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

// default
import "@mantine/core/styles.css"

// components
// import "@mantine/carousel/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"

// original
import "./styles/global.css"

import ActiveClassNames from "./styles/Active.module.css"
import ButtonClassNames from "./styles/Button.module.css"
import TextInputClassNames from "./styles/TextInput.module.css"

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<"primary" | DefaultMantineColor, MantineColorsTuple>
  }
}

/**
 * @see https://mantine.dev/theming/theme-object
 */
export const MantineUIProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider
      theme={{
        // primaryColor: "primary",
        black: "#404040",
        colors: {
          primary: ["", "", "", "", "", "", "#FF8805", "", "", ""],
        },
        fontFamily: "Noto Sans JP, sans-serif",
        components: {
          Container: Container.extend({
            defaultProps: {
              size: "lg", // 1140px, p:16px
              // maw: 1140,
              // px: 16,
            },
          }),
          Anchor: Anchor.extend({
            defaultProps: { c: "#4484BC", underline: "always" },
          }),

          Button: Button.extend({
            classNames: ButtonClassNames,
          }),
          TextInput: TextInput.extend({
            defaultProps: { variant: "filled" },
            classNames: TextInputClassNames,
          }),
          NumberInput: NumberInput.extend({
            defaultProps: {
              variant: "unstyled",
              styles: { input: { height: "22.695px", minHeight: "22.695px", color: "red", borderRadius: 0, textAlign: "center", cursor: "pointer" } },
              hideControls: true,
            },
          }),
          DateInput: DateInput.extend({
            defaultProps: {
              variant: "unstyled",
              valueFormat: "YYYY年MM月DD日",
              styles: { input: { height: "22.695px", minHeight: "22.695px", color: "red", borderRadius: 0, textAlign: "center", cursor: "pointer" } },
            },
          }),
          Textarea: Textarea.extend({
            defaultProps: {
              variant: "default",
              styles: { input: { color: "red", borderRadius: 0, cursor: "pointer" } },
            },
          }),
          Checkbox: Checkbox.extend({
            defaultProps: { color: "#4484BC", iconColor: "white" },
          }),
        },
        /** Press Button(ActionIcon) action style. */
        activeClassName: ActiveClassNames.active,
      }}
    >
      <Notifications />
      <DatesProvider settings={{ locale: "ja" }}>{children}</DatesProvider>
    </MantineProvider>
  )
}
