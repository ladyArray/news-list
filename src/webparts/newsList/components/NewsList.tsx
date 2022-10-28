import * as React from "react";
import styles from "./NewsList.module.scss";
import { INewsListProps } from "./INewsListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPFI } from "@pnp/sp";
import { useEffect, useState } from "react";
import { INewsList } from "../../../interface";
import { getSP } from "../../../pnpjsConfig";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

const NewsList = (props: INewsListProps) => {
  const LOG_SOURCE = "NewsList Webpart";
  const LIST_NAME = "Noticias";
  const _sp: SPFI = getSP(props.context);

  const [NewsListItems, setNewsListItems] = useState<INewsList[]>([]);

  const getNewsListItems = async () => {
    console.log("context", _sp);

    /*const items = this._sp.web.lists.getByTitle(this.LIST_NAME).items.select("*", "Responsable/Title", "Responsable/ID").expand("Responsable")().then((value: any) => {
        console.log("Noticias: ",value);
        this.initializeVariables(value);
      });*/

    const items = _sp.web.lists
      .getById(props.listGuid)
      .items.select("Title", "Responsable/Title", "Responsable/ID")
      .expand("Responsable")();

    console.log("NewsList Items", items);

    setNewsListItems(
      (await items).map((item: any) => {
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          category: item.category,
          publicationDate: item.publicationDate,
          responsible: item.responsable,
          image: item.image.url,
        };
      })
    );
  };

  useEffect(() => {
    console.log("props", props);

    if (props.listGuid && props.listGuid != "") {
      getNewsListItems;
    }
  }, [props]);

  return (
    <>
      <WebPartTitle
        displayMode={props.displayMode}
        title={props.title}
        updateProperty={props.updateProperty}
      />
      {props.listGuid ? (
        NewsListItems.map((o: INewsList, index: number) => {
          return (
            <Accordion key={index} title={o.title} defaultCollapsed={true}>
              {o.description}
            </Accordion>
          );
        })
      ) : (
        <Placeholder
          iconName="Edit"
          iconText="Configure your web part"
          description="Please configure the web part."
          buttonLabel="Configure"
          onConfigure={() => props.context.propertyPane.open()}
        />
      )}
    </>
  );
};

export default NewsList;
