import * as React from "react";
import { INewsListProps } from "./INewsListProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPFI } from "@pnp/sp";
import { useEffect, useState } from "react";
import { INewsList } from "../../../interface";
import { getSP } from "../../../pnpjsConfig";
import { SearchBox, ISearchBoxStyles } from "@fluentui/react/lib/SearchBox";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import {
  Dropdown,
  DropdownMenuItemType,
  IDropdownOption,
  IDropdownStyles,
} from "@fluentui/react/lib/Dropdown";
import {
  ChoiceGroup,
  IChoiceGroupOption,
} from "@fluentui/react/lib/ChoiceGroup";

import { Item } from "@pnp/sp/items";
import CardView from "./Card/CardView";
import cls from "./NewsList.module.scss";
import ListingView from "./Listing/ListingView";
import { Stack, IStackTokens, MarqueeSelection } from "@fluentui/react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "office-ui-fabric-react";

const options: IDropdownOption<any>[] = [
  { key: "", text: "Todas" },
  { key: "Tecnologia", text: "Tecnologia" },
  { key: "Actualidad", text: "Actualidad" },
  { key: "Economia", text: "Economia" },
];

const checkOptions: IChoiceGroupOption[] = [
  { key: "", text: "Todos", styles: { field: { marginLeft: "3px" } } },
  {
    key: "Isabel Faro Medina",
    text: "Isabel Faro Medina",
    styles: { field: { marginLeft: "3px" } },
  },
  {
    key: "Javier Arbiol",
    text: "Javier Arbiol",
    styles: { field: { marginLeft: "3px" } },
  },
  {
    key: "Beatriz Garcia",
    text: "Beatriz Garcia",
    styles: { field: { marginLeft: "3px", marginBotton: "3px" } },
  },
];

export default function NewsList(props: INewsListProps): JSX.Element {
  console.log("montando componente");
  console.log(props);
  //const LOG_SOURCE = "NewsList Webpart";
  const LIST_NAME = "Noticias";
  const _sp: SPFI = getSP(props.context);

  const [listed, setListed] = useState<boolean>(true);
  const [display, setDisplay] = useState<boolean>(false);

  const [filteredNews, setFilteredNews] = useState<INewsList[]>([]);

  const [news, setNews] = useState<INewsList[]>([]);
  //const [searchList, setSearchList] = useState<INewsList[]>([]);
  // const [filterList, setFilterList] = useState<INewsList[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<any>("");
  const [check, setCheck] = useState<any>("");

  const getNews = async () => {
    /*const items = this._sp.web.lists.getByTitle(this.LIST_NAME).items.select("*", "Responsable/Title", "Responsable/ID").expand("Responsable")().then((value: any) => {
        console.log("Noticias: ",value);
        this.initializeVariables(value);});*/

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
        setFilteredNews(elements);
        setDisplay(true);
        //setSearchList(value as INewsList[]);
        // setFilterList(value as INewsList[]);
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
    getNews().catch(console.error);
  }, []);

  const handleClick = () => {
    setListed((prev) => !prev);
  };

  /* const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };*/

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const search = e.target.value; //input
    setSearch(search);
  };

  /*filtro que funciona
  const onFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = e.target.value; //select
    setFilter(filter);
  };
*/

  const onFilter = (
    e: React.FormEvent<HTMLDivElement>,
    item: IDropdownOption
  ): void => {
    const filter = item;
    setFilter(filter);
  };

  // const [check, setCheck] = useState<string>("");
  //checkOption, key, text

  const onCheck = (
    e: React.FormEvent<HTMLInputElement>,
    option: IChoiceGroupOption
  ): void => {
    const check = option;
    setCheck(check);
  };

  useEffect(() => {
    //Skippea del render
    console.count("filter");
    console.log(filter);
    let result = news;
    if (filter !== "") {
      //aplicar filtro categoria
      result = result.filter((news) => {
        return news.category.indexOf(filter.key) >= 0;
      });
    }

    console.log(result);

    if (search !== "") {
      //aplicar filtro search
      result = result.filter(
        (news) =>
          news.title.toLowerCase().includes(search.toLowerCase()) ||
          news.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (check !== "") {
      //aplicar filtro autor
      result = result.filter((news) => {
        return news.responsible.indexOf(check.key) >= 0;
      });
    }

    //return result;
    setFilteredNews(result);
  }, [filter, search, check]); //si cambia alguno de estos elementos del array de dependencia, se recalcula, si no, skippea

  return (
    <>
      {display && news.length > 0 && (
        <section className={cls.root}>
          <div className={cls.header}>
            <div className={cls.upper}>
              <PrimaryButton onClick={handleClick} className={cls.button}>
                Modo {listed ? "Lista" : "Tarjeta"}
              </PrimaryButton>
              <div className={cls.searchContainer}>
                <SearchBox placeholder="Buscar noticia" onChange={onSearch} />
                <Dropdown
                  placeholder="Selecciona una opcion"
                  options={options}
                  onChange={onFilter}
                />
              </div>
            </div>
          </div>
          <div className={cls.bottom}>
            <div className={cls.filterContainer}>
              <ChoiceGroup
                selectedKey={check.key}
                styles={{ flexContainer: { display: "flex" } }}
                options={checkOptions}
                onChange={onCheck}
              />
            </div>
          </div>
          {listed ? (
            <CardView news={filteredNews} />
          ) : (
            <ListingView news={filteredNews} />
          )}
        </section>
      )}
    </>
  );
}
