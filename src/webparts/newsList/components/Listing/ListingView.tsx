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

let news: INewsList[];

export default class ListingView extends React.Component {
  render() {
    return (
      <>
        <div>
          {news.map((n) => (
            <li key={n.id}>
              {n.title}
              {n.description}
            </li>
          ))}
        </div>
      </>
    );
  }
}
