import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BUGMZ6RB.mjs';
import 'es-module-lexer';
import { g as decodeKey } from './chunks/astro/server_CFb2y3vC.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/nikom/Dev/ecommerce-lcimports/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.Dx6u5xzt.css"}],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/categories","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/categories\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"categories","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/categories.ts","pathname":"/api/categories","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/init-db","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/init-db\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"init-db","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/init-db.ts","pathname":"/api/init-db","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/migrate-db","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/migrate-db\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"migrate-db","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/migrate-db.ts","pathname":"/api/migrate-db","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/products/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/products\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/products/[id].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/products","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/products\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"products","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/products.ts","pathname":"/api/products","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/upload","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/upload\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"upload","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/upload.ts","pathname":"/api/upload","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/vehicles/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/vehicles\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"vehicles","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/vehicles/[id].ts","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/vehicles","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/vehicles\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"vehicles","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/vehicles.ts","pathname":"/api/vehicles","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/whatsapp","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/whatsapp\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"whatsapp","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/whatsapp.ts","pathname":"/api/whatsapp","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.Dx6u5xzt.css"}],"routeData":{"route":"/nosotros","isIndex":false,"type":"page","pattern":"^\\/nosotros\\/?$","segments":[[{"content":"nosotros","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/nosotros.astro","pathname":"/nosotros","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.Dx6u5xzt.css"}],"routeData":{"route":"/vehiculos","isIndex":false,"type":"page","pattern":"^\\/vehiculos\\/?$","segments":[[{"content":"vehiculos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/vehiculos.astro","pathname":"/vehiculos","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/admin.Dx6u5xzt.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/nikom/Dev/ecommerce-lcimports/src/pages/admin.astro",{"propagation":"none","containsHead":true}],["C:/Users/nikom/Dev/ecommerce-lcimports/src/pages/index.astro",{"propagation":"none","containsHead":true}],["C:/Users/nikom/Dev/ecommerce-lcimports/src/pages/nosotros.astro",{"propagation":"none","containsHead":true}],["C:/Users/nikom/Dev/ecommerce-lcimports/src/pages/vehiculos.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/api/categories@_@ts":"pages/api/categories.astro.mjs","\u0000@astro-page:src/pages/api/init-db@_@ts":"pages/api/init-db.astro.mjs","\u0000@astro-page:src/pages/api/migrate-db@_@ts":"pages/api/migrate-db.astro.mjs","\u0000@astro-page:src/pages/api/products/[id]@_@ts":"pages/api/products/_id_.astro.mjs","\u0000@astro-page:src/pages/api/products@_@ts":"pages/api/products.astro.mjs","\u0000@astro-page:src/pages/api/upload@_@ts":"pages/api/upload.astro.mjs","\u0000@astro-page:src/pages/api/vehicles/[id]@_@ts":"pages/api/vehicles/_id_.astro.mjs","\u0000@astro-page:src/pages/api/vehicles@_@ts":"pages/api/vehicles.astro.mjs","\u0000@astro-page:src/pages/api/whatsapp@_@ts":"pages/api/whatsapp.astro.mjs","\u0000@astro-page:src/pages/nosotros@_@astro":"pages/nosotros.astro.mjs","\u0000@astro-page:src/pages/vehiculos@_@astro":"pages/vehiculos.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-manifest":"manifest_Cs4015QE.mjs","C:/Users/nikom/Dev/ecommerce-lcimports/src/components/Admin/AdminPanel":"_astro/AdminPanel.DP47CXSi.js","C:/Users/nikom/Dev/ecommerce-lcimports/src/components/Header":"_astro/Header.BDeik01h.js","C:/Users/nikom/Dev/ecommerce-lcimports/src/components/NotificationWrapper":"_astro/NotificationWrapper.CjiMxjcf.js","C:/Users/nikom/Dev/ecommerce-lcimports/src/components/Hero":"_astro/Hero.DWtXTjpf.js","C:/Users/nikom/Dev/ecommerce-lcimports/src/components/OffersCarousel":"_astro/OffersCarousel.QzGLc-VL.js","C:/Users/nikom/Dev/ecommerce-lcimports/src/components/ProductGrid":"_astro/ProductGrid.DeuOAdmR.js","C:/Users/nikom/Dev/ecommerce-lcimports/src/components/VehicleGrid":"_astro/VehicleGrid.CgPgfH1a.js","C:/Users/nikom/Dev/ecommerce-lcimports/src/components/Footer":"_astro/Footer.Bmhdq0eX.js","@astrojs/react/client.js":"_astro/client.BVFwylym.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/admin.Dx6u5xzt.css","/favicon.ico","/lcimports.background.png","/logo.png","/uploads/product_1757951269268_1p0q8m0q879.jpg","/uploads/product_1757953173047_o0w7tw1ipvp.jpg","/uploads/product_1757953195047_g1fc7fgvmmq.jpg","/uploads/product_1757953456665_zmy7r5v89pr.jpg","/uploads/product_1757954691862_hs2b6s2ddzh.jpg","/uploads/product_1757954696038_nzoopfk812l.jpg","/uploads/product_1757954699871_ikujxs4yvss.jpg","/uploads/product_1757954702867_62gd4iugvyh.jpg","/uploads/product_1757954717638_h76rngae3ri.jpg","/uploads/product_1757954717641_oyxodichk6.jpg","/uploads/product_1757954717645_923pdsf5rqv.jpg","/uploads/product_1757955014431_r7931efnbc.jpg","/uploads/product_1757955014434_d8hbgkf4d4.jpg","/uploads/product_1757955014436_z8q3t7chlt.jpg","/uploads/product_1757955180634_a45igxz4tjm.jpg","/uploads/product_1757955180637_q3ixqhh60i.jpg","/uploads/product_1757955180639_gabukbrc4vj.jpg","/uploads/product_1757955189677_lhaht1vcbmg.jpg","/uploads/product_1757955271062_1g37ikt6js8.jpg","/uploads/product_1757955316907_a9rph36nxz8.jpg","/uploads/product_1757978256335_7v88w1j79xk.jpg","/uploads/product_1757978256335_hmhrccfir2.jpg","/uploads/product_1757978256335_lnchvk7y1ri.jpg","/uploads/product_1757978256335_r0wbc9h5ckm.jpg","/uploads/product_1758623825433_xu2qc1bvtx.webp","/_astro/AdminPanel.DP47CXSi.js","/_astro/car.CbqMTok_.js","/_astro/cartStore.VKx_K2hc.js","/_astro/chevron-right.C9gZnoKy.js","/_astro/client.BVFwylym.js","/_astro/createLucideIcon.V6CX3xPE.js","/_astro/Footer.Bmhdq0eX.js","/_astro/Header.BDeik01h.js","/_astro/Hero.DWtXTjpf.js","/_astro/index.Ba-IbuDT.js","/_astro/NotificationWrapper.CjiMxjcf.js","/_astro/OffersCarousel.QzGLc-VL.js","/_astro/package.DAesrQNt.js","/_astro/phone.ALLnAV3F.js","/_astro/ProductGrid.DeuOAdmR.js","/_astro/star.Cy-Gx_tK.js","/_astro/StockIndicator.BcwvyifC.js","/_astro/user.CeD2SeTK.js","/_astro/VehicleGrid.CgPgfH1a.js","/_astro/x.ByTsRx3w.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"xd9JVPBmZGCp5e+SBpx7MZ/LAlpS4bgmuUiqdKWxywA=","experimentalEnvGetSecretEnabled":false});

export { manifest };
