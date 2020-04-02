import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'WebpartexpanseWebPartStrings';
import Webpartexpanse from './components/Webpartexpanse';
import { IWebpartexpanseProps } from './components/IWebpartexpanseProps';

export interface IWebpartexpanseWebPartProps {
  description: string;
  siteurl: string;
}

export default class WebpartexpanseWebPart extends BaseClientSideWebPart<IWebpartexpanseWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IWebpartexpanseProps > = React.createElement(
      Webpartexpanse,
      {
        description: this.properties.description,
        siteurl: this.context.pageContext.web.absoluteUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
