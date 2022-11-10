import * as React from "react";

import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardDetails,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  DocumentCardType,
  IDocumentCardActivityPerson,
} from "@fluentui/react/lib/DocumentCard";
import { Stack, IStackTokens } from "@fluentui/react/lib/Stack";
import { getTheme } from "@fluentui/react/lib/Styling";

import cls from "./CardView.module.scss";
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

export default class CardView extends React.Component<any, any> {
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
}*/

  //responsibleArray: IDocumentCardActivityPerson[] = this.props.news.responsible;

  public render(): JSX.Element {
    return (
      <>
        {
          <div className={cls.container}>
            {this.props.news.map((n: any) => {
              return (
                <div key={n.id} className={cls.element}>
                  <DocumentCard type={DocumentCardType.normal}>
                    <DocumentCardDetails>
                      <DocumentCardTitle title={n.title} />
                      <DocumentCardActivity
                        people={n.responsible} //es una array ??  people={people.slice(6)}
                        activity={n.publicationDate}
                      />
                    </DocumentCardDetails>
                  </DocumentCard>
                </div>
              );
            })}
          </div>
        }
      </>
    );
  }
}
