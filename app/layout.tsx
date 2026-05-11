import React from "react";

export const metadata = { title: "Fitbite" };

export default function RootLayout(props: { children: React.ReactNode }) {
  return React.createElement(
    "html",
    { lang: "id" },
    React.createElement("body", null, props.children)
  );
}
