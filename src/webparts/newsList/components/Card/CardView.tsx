import * as React from "react";

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
import ListingView from "../Listing/ListingView";
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardTitle,
  DocumentCardDetails,
  DocumentCardImage,
  IDocumentCardStyles,
  IDocumentCardActivityPerson,
} from "@fluentui/react/lib/DocumentCard";

export default class CardView extends React.Component {
  private news: INewsList[];
  constructor(props: { news: INewsList[] }) {
    super(props);
    this.news = props.news;
    console.log(props.news);
  }

  render() {
    return (
      <>
        <p>tarjetas</p>
        {
          <div className="container">
            {this.news.map((n) => {
              return (
                <div key={n.id} className="element">
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
