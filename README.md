# Admin Template for Angular - [Demo Site](https://bndynet.github.io/admin-template-for-angular/)

![CI](https://github.com/bndynet/admin-template-for-angular/workflows/CI/badge.svg)

An angular starter project with material design. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

## Todo list

### Environments

Located at **src/environments/** folder. Currently, support below methods:

- **OAuth**
- **Keycloak**: An open source Identity and Access Management project provided by Redhat.
- **Local Authentication**

### Guide step by step

This feature provide a way to guide user to use your application by highlighting elements step by step. You can find definitions in **src/config/guides.ts** file.

### Internationalization

Use `@ngx-translate` library to translate your language that defined in **src/assets/i18n/json** folder.

## Angular CLI

To get help on Angular CLI use `ng help` or click [here](https://angular.io/cli) to official site.

## Theming your components

```scss
@import '../../../styles/theme';

@include each-themes using ($name, $theme) {
  :host {
    a.active {
      border-left-color: get($name, 'primary');
    }

    footer {
      background-color: get($name, 'background');
    }
  }
}
```
