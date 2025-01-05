declare module "*.module.css" {
  const classes: { [key: string]: string }
  export default classes
}

/**
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic
 */
declare interface NextJS {
  dynamic: "auto" | "force-dynamic" | "error" | "force-static"
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"
    readonly API_URL: string
  }
}

// declare interface Window {
//   /** EthereumのプロバイダーAPIの標準仕様 */
//   ethereum: ethers.Eip1193Provider
// }
