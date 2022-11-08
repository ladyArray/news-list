import * as React from "react";

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
  private searchList: INewsList[];
  private filterList: INewsList[];

  constructor(props: { news: INewsList[] }) {
    super(props);
    this.searchList = props.news;
    this.filterList = props.news;
    console.log(props.news);
  }

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
}
