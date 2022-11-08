import * as React from "react";
import { INewsListProps } from "./INewsListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPFI } from "@pnp/sp";
import { useEffect, useState } from "react";
import { INewsList } from "../../../interface";
import { getSP } from "../../../pnpjsConfig";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Item } from "@pnp/sp/items";
import CardView from "./Card/CardView";
import cls from "./NewsList.module.scss";
import ListingView from "./Listing/ListingView";
import { Stack, IStackTokens } from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
export default function NewsList(props: INewsListProps): JSX.Element {
  console.log("montando componente");
  console.log(props);
  //const LOG_SOURCE = "NewsList Webpart";
  const LIST_NAME = "Noticias";
  const _sp: SPFI = getSP(props.context);

  const [listed, setListed] = useState<boolean>(true);
  const [display, setDisplay] = useState<boolean>(false);

  const [news, setNews] = useState<INewsList[]>([]);
  const [searchList, setSearchList] = useState<INewsList[]>([]);
  const [filterList, setFilterList] = useState<INewsList[]>([]);

  const getNews = async () => {
    /*const items = this._sp.web.lists.getByTitle(this.LIST_NAME).items.select("*", "Responsable/Title", "Responsable/ID").expand("Responsable")().then((value: any) => {
        console.log("Noticias: ",value);
        this.initializeVariables(value);
      });*/

    await _sp.web.lists
      .getByTitle(LIST_NAME)
      .items.select("*")
      .expand()()
      .then((value: any) => {
        let elements: any[] = [];
        console.log(value);
        elements = value.map((item: any) => {
          return {
            id: item.ID,
            title: item.Title,
            description: item.Description,
            category: item.Category,
            publicationDate: item.Created,
            responsible: item.Responsible,
            image: JSON.parse(item.image),
          };
        });
        console.log("Noticias: ", elements);
        setNews(elements);
        setDisplay(true);
        setSearchList(value as INewsList[]);
        setFilterList(value as INewsList[]);
        console.log("Noticias: ", value);
      });
  };

  //const items = await _sp.web.lists.getById(listGuid).items.select()();
  //.orderBy("Description", true)
  //.orderBy("Title", true)

  /*
   *JSON.parse({"type":"thumbnail","fileName":"resizer.jpg","nativeFile":{},"fieldName":"image","serverUrl":"https://t6b7m.sharepoint.com","fieldId":"c5c900c6-5ca5-4a9d-8464-2ef25cec71f9","serverRelativeUrl":"/sites/intranet/SiteAssets/Lists/49ae4e06-148c-4f49-a7ee-105badb7a13d/resizer.jpg","id":"4bc24aed-08d2-4ae5-8cb6-89298db6c617"})
   */

  /* useEffect(() => {
    console.log("use effect");
    console.log("props", props);
    if (!listGuid) {
      return () => console.log("desmontando componente");
    }*/

  useEffect(() => {
    getNews().catch;
  }, []);

  const handleListClick = () => {
    setListed(true);
    //el setter pasa, el listed almacena
  };

  const handleCardClick = () => {
    setListed(false);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value; //input
    if (search && search.length > 0) {
      const newsList = news.filter(
        (news) =>
          news.title.toLowerCase().includes(search.toLowerCase()) ||
          news.description.toLowerCase().includes(search.toLowerCase())
      );
      setSearchList(newsList);
    }
  };

  const onFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const select = e.target.value; //select
    if (select === "") {
      useState({
        category: select,
        news: news.filter((news) => {
          return news.category.indexOf(e.target.value) >= 0;
        }),
      });
    }
  };

  return (
    <>
      {display &&
        news.length > 0 &&
        (listed ? (
          <section className={cls.root}>
            <div className={cls.header}>
              <PrimaryButton onClick={handleCardClick} className={cls.button}>
                Modo Lista
              </PrimaryButton>
              <div className={cls.searchContainer}>
                <input
                  type="text"
                  className="form-control"
                  //value={title}
                  placeholder="Buscar noticia"
                  aria-label="Buscar noticia"
                  aria-describedby="basic-addon2"
                  onChange={onSearch}
                />
                <select onChange={onFilter}>
                  <option>Todo</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Actualidad">Actualidad</option>
                  <option value="Economia">Economia</option>
                </select>
              </div>
            </div>
            <CardView {...{ news: news }} />
          </section>
        ) : (
          <section className={cls.root}>
            <div className={cls.header}>
              <PrimaryButton onClick={handleListClick} className={cls.button}>
                Modo Tarjeta
              </PrimaryButton>
              <div className={cls.searchContainer}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar noticia"
                  aria-label="Buscar noticia"
                  aria-describedby="basic-addon2"
                  onChange={onSearch}
                />
                <select>
                  <option>All</option>
                  <option value="Tecnologia">Tecnologia</option>
                  <option value="Actualidad">Actualidad</option>
                  <option value="Economia">Economia</option>
                </select>
              </div>
            </div>
            <ListingView {...{ news: news }} />
          </section>
        ))}
    </>
  );
}
