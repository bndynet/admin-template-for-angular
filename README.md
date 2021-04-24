# Admin Template for Angular - [Demo Site](https://bndynet.github.io/admin-template-for-angular/)

![CI](https://github.com/bndynet/admin-template-for-angular/workflows/CI/badge.svg)

An angular starter project with material design. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.3.

<img src="https://static.bndy.net/images/projects/admin-template-for-angular.gif">

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

`npm start` and open [local site](http://localhost:9000/)

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

ThemeService

```typescript
this.theme.themeChanged.subscribe((t) => {
    if (this.theme.isDark()) {
      // TODO:
    } else {
      // TODO:
    }
  });
```

## ELK

### Logstash Configuration Example

```
input {
  http {
    response_headers => {
      "Access-Control-Allow-Origin" => "*"
      "Access-Control-Allow-Headers" => "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
      "Access-Control-Allow-Methods" => "*"
      "Access-Control-Allow-Credentials" => "*"
    }
    host => "10.10.10.10"
    port => 8080
  }
}
```
