// import * as React from "react";

// import { escape } from "@microsoft/sp-lodash-subset";
// import { SPFI } from "@pnp/sp";
// import { useEffect, useState } from "react";
// import { Component } from "react";
// import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
// import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
// import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
// import { Item } from "@pnp/sp/items";
// import NewsList from "../NewsList";
// import NewsListWebPart from "../../NewsListWebPart";
// import { INewsList } from "../../../../interface";
// import ListingView from "../Listing/ListingView";

// let news: INewsList[];

// export default class CardView extends React.Component {
//   render() {
//     return (
//       <>
//         <div className="container">
//           {news.map((n) => {
//             return (
//               <div key={n.id} className="element">
//                 <h1>{`${n.title}`}</h1>
//                 {news.length > 0 && <p>{` ${n.description}`}</p>}
//                 <p>{` ${n.category}`}</p>
//                 <p>{` ${n.publicationDate}`}</p>
//                 <p>{` ${n.responsible}`}</p>
//               </div>
//             );
//           })}
//         </div>
//       </>
//     );
//   }
// }
