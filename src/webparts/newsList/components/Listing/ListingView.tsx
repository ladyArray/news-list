import * as React from "react";

import { getRTL } from "@fluentui/react/lib/Utilities";
import { TextField } from "@fluentui/react/lib/TextField";
import { Image, ImageFit } from "@fluentui/react/lib/Image";
import { Icon } from "@fluentui/react/lib/Icon";
import { List } from "@fluentui/react/lib/List";
import {
  ITheme,
  mergeStyleSets,
  getTheme,
  getFocusStyle,
} from "@fluentui/react/lib/Styling";
import { FocusZone } from "@fluentui/react/lib/FocusZone";

import { IRectangle } from "@fluentui/react/lib/Utilities";

import { useConst } from "@fluentui/react-hooks";
import cls from "./ListingView.module.scss";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPFI } from "@pnp/sp";
import { useEffect, useState } from "react";
import { Component } from "react";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Item } from "@pnp/sp/items";
import NewsList from "../NewsList";
import NewsListWebPart from "../../NewsListWebPart";
import { INewsList } from "../../../../interface";

export default class ListingView extends React.Component<any, any> {
  constructor(props: { news: INewsList[] }) {
    super(props);

    console.log(props.news);
  }

  /*
  public render(): JSX.Element {
    return (
      <>
        {
          <div className={cls.container}>
            {this.props.news.map((n: any) => {
              return (
                <div key={n.id} className={cls.element}>
                  <h1>{`${n.title}`}</h1>
                  <p>{` ${n.description}`}</p>
                  <p>{`Categoría:  ${n.category}`}</p>
                  <p>{`Fecha:  ${n.publicationDate}`}</p>
                  <p>{`Responsable:  ${n.responsible}`}</p>
                </div>
              );
            })}
          </div>
        }
      </>
    );
  }
*/

  public render(): JSX.Element {
    return (
      <>
        {this.props.news.map((n: any) => (
          <div className={this.classNames.itemCell} data-is-focusable={true}>
            <div className={this.classNames.itemContent} key={n.id}>
              <div className={this.classNames.itemName}>{n.title}</div>
              <div className={this.classNames.itemName}>
                Categoría: {n.category}
              </div>
              <div className={this.classNames.itemIndex}>
                Fecha: {n.publicationDate}
              </div>
              <div>{n.description}</div>
            </div>
          </div>
        ))}
      </>
    );
  }

  //const theme: ITheme = getTheme();
  //const { palette, semanticColors, fonts } = theme;

  classNames = mergeStyleSets({
    itemCell: [
      //getFocusStyle(theme, { inset: -1 }),
      {
        minHeight: 54,
        padding: 10,
        boxSizing: "border-box",
        borderBottom: `1px solid`,
        display: "flex",
        selectors: {},
      },
    ],
    itemImage: {
      flexShrink: 0,
    },
    itemContent: {
      marginLeft: 10,
      overflow: "hidden",
      flexGrow: 1,
    },
    itemName: [
      {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    ],
    itemIndex: {
      marginBottom: 10,
    },
  });
}
