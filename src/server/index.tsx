import express from "express";

import React from "react";

import cookieParser from "cookie-parser";

import { Filter } from "../common/store/global/types";

import entryIndexHandler from "./handlers/entry-index";
import profileHandler from "./handlers/profile";
import entryHandler from "./handlers/entry";

const server = express();

const filters = Object.values(Filter);

server
  .disable("x-powered-by")
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .use(cookieParser())
  .use(
    [
      "^/$", // index
      `^/:filter(${filters.join("|")})$`, // /trending
      `^/:filter(${filters.join("|")})/:tag$`, //  /trending/esteem
    ],
    entryIndexHandler
  )
  .use(
    [
      "^/@:username$", // /@esteemapp
      "^/@:username/:section(blog|comments|replies|wallet)$", // /@esteemapp/comments
    ],
    profileHandler
  )
  .use(
    [
      "^/:category/@:author/:permlink$", // /esteem/@esteemapp/rss-feeds-added-into-esteem-website
      "^/@:author/:permlink$", // /@esteemapp/rss-feeds-added-into-esteem-website
    ],
    entryHandler
  );

export default server;
