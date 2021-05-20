import React, { ReactNode, useEffect } from "react";
import useCurrentRoutePath from "../../hooks/use-current-route-path";
import Header from "./Header";
import Footer from "./Footer";
import { useCustomSettings } from "../../hooks/use-custom-settings";
import useSetKeyIdClass from "../../hooks/use-set-key-id-class";
import useSetId from "../../hooks/use-set-id";

type LayoutItem = "header" | "main" | "footer";
type LayoutItemsProps = Record<
  LayoutItem,
  { className?: string; children?: ReactNode | null }
>;
type Props = { routeLayoutConfig?: Record<string, LayoutItemsProps> } & {
  children?: ReactNode;
} & Partial<LayoutItemsProps>;

const Layout: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const pathKey = useCurrentRoutePath();
  const { primaryColor, customCss } = useCustomSettings();

  const key = useSetKeyIdClass();
  useSetId(key);

  useEffect(() => {
    const css = customCss || "";
    const elem = document.querySelector('[data-custom-css="customCss"]');
    if (elem) {
      elem.innerHTML = css;
    }
  }, [customCss]);

  const headerProps =
    props.routeLayoutConfig?.[pathKey as string]?.header ?? props.header;
  const footerProps =
    props.routeLayoutConfig?.[pathKey as string]?.footer ?? props.footer;
  const mainProps =
    props.routeLayoutConfig?.[pathKey as string]?.main ?? props.main;
  const customStyle = {
    "--primary-color": primaryColor,
  } as React.CSSProperties;


  return (
    <>
      {/* <Header {...headerProps} /> */}
      <main>
        {props.children}
        {/* {mainProps?.children ?? null} */}
      </main>
      {/* <Footer {...footerProps} style={customStyle} /> */}
    </>
  );
};

export default Layout;
