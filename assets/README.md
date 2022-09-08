# Admin Template for Angular - [Demo Site](https://bndynet.github.io/admin-template-for-angular/)

![CI](https://github.com/bndynet/admin-template-for-angular/workflows/CI/badge.svg)

An angular starter project with material design.

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

About how to install ELK, please refer [](https://www.notion.so/bndynet/ELK-2503f149b5074c079d372ec41f8346cb)

You can open [local ELK](http://127.0.0.1:5601/app/management/kibana/indexPatterns) Kibana UI, then see the index starts with **http**.

### Logstash Configuration Example

```
input {
  http {
    host => "0.0.0.0"
    port => 5044
    type => http
    response_headers => {
      "Access-Control-Allow-Origin" => "*"
      "Content-Type" => "text/plain"
      "Access-Control-Allow-Headers" => "Origin, X-Requested-With, Content-Type,
       Accept"
    }
  }
}

filter {
  if [headers][request_method] == "OPTIONS" {
    drop {}
  }
}

output {
  if [type]=="http" {
    elasticsearch {
      hosts => ["127.0.0.1:9200"]
      manage_template => false
      index => "http-%{+YYYY.MM.dd}"
    }
  }
}
```
