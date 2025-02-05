# turbo-app

## Product Infomation

| environment | URL |
| ----------- | --- |
| Production  | -   |
| Staging     | -   |
| Development | -   |

## Using Technologies


| Category       | Library                     | Description |
| -------------- | --------------------------- | ----------- |
| Frontend       | TypeScript NextJS MantineUI | -           |
| Backend        | TypeScript NestJS           | -           |
| Testing        | Vitest TestingLibrary       | -           |
| Linter         | Biome                       | -           |
| Edge           | Vercel EdgeConfig           | -           |
| Infrastructure | Vercel                      | -           |
| Database       | -                           | -           |
| Authentication | -                           | -           |
| CI/CD          | GithubActions               | -           |
| Accessibility  | Lighthouse                  | -           |
| Monitoring     | -                           | -           |
| Desgin         | Figma                       | -           |
| Mailer System  | -                           | -           |

## Getting Started

環境変数の値はメンバーに聞いてください。

```shell:
$ pnpm install
$ pnpm api # generate API schema and document.

$ cd api && vercel env pull .env

$ pnpm dev # start web and api.
```

## Trouble shooting

#### ビルドしたindex.htmlをブラウザで表示されない
- Access to script at 'file:///xxxxxxx/xxx.js' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, isolated-app, chrome-extension, chrome, https, chrome-untrusted.
- `https://ja.vitejs.dev/guide/troubleshooting.html#%E3%83%92%E3%82%99%E3%83%AB%E3%83%88%E3%82%99`