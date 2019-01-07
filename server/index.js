import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';
import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import csshook from 'css-modules-require-hook/preset'; // import hook before routes
import assethook from 'asset-require-hook';
import fs from "fs";

assethook({
  extensions: ['png']
});

import userRouter from './router/user';
import App from '../src/app';
import reducers from '../src/reducers';
import staticPath from '../build/asset-manifest.json'

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

app.use(function (req, res, next) {
  if (req.url.startsWith('/static/')) {
    return next();
  }
  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ));
  let context = {};
  const section = renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>
  )

  let pageHtml = fs.readFileSync(path.resolve('build/index.html')).toString();
  let targetDiv = '<div id="root">';
  let insertIndex = pageHtml.indexOf(targetDiv) + targetDiv.length;
  let finalHtml = pageHtml.substring(0,insertIndex+1) + section + pageHtml.substring(insertIndex+1);

  return res.send(finalHtml);
  // return res.sendFile(path.resolve('build/index.html'));
});

app.use(express.static(path.resolve('build')));

app.listen(9090, function() {
  console.log('server success start at port 9090');
});
