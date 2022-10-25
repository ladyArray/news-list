import { IReadonlyTheme } from "@microsoft/sp-component-base";

export interface INewsListProps {
  title: string;
  description: string;
  category: string; //choice
  publicationDate: Date;
  responsable: string;
  image: string;
  storageList: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  themeVariant: IReadonlyTheme | undefined;
}

/*
Crear una lista de “Noticias” con los siguientes campos:
Título
Descripción
Categoría (elección)
Fecha de publicación
Responsable (*usuario)
Imagen (*tipo vínculo)
*/
