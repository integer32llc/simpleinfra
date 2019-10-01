module.exports=function(e,t){"use strict";var r={};function __webpack_require__(t){if(r[t]){return r[t].exports}var n=r[t]={i:t,l:false,exports:{}};e[t].call(n.exports,n,n.exports,__webpack_require__);n.l=true;return n.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(104)}return startup()}({18:function(){eval("require")("encoding")},87:function(e){e.exports=require("os")},104:function(e,t,r){const n=r(470);const o=r(129);const s=r(454);const i=r(237);const u="Runner.Worker";const c=async()=>{let e=parseInt(n.getInput("check_every_seconds",{required:true}));while(true){if(await l()===false){let e=await a();if(e!==null){process.kill(e,"SIGTERM")}return}await new Promise(t=>setTimeout(t,e*1e3))}};const l=async()=>{let e=process.env["GITHUB_SHA"];let t=process.env["GITHUB_REF"];let r=process.env["GITHUB_REPOSITORY"];let o=n.getInput("github_token",{required:true});let i=await s("https://api.github.com/repos/"+r+"/commits/"+t,{headers:{Accept:"application/vnd.github.v3.sha",Authorization:"token "+o,"If-None-Match":'"'+e+'"'}});let u=await i.text();if(i.status===200&&u!==e){return false}else if(i.status===304){return true}else if(i.status===429){return true}else{n.setFailed("Failed to fetch the latest commit!");process.exit(1)}};const f=async()=>{let e=await a();if(e===null){n.setFailed("A process named "+u+" is not running!");return}let t=o.fork(__filename,["foreground"],{detached:true,stdio:"ignore"});t.unref();n.info("Successfully daemonized cancel-outdated-builds.");process.exit(0)};const a=async()=>{let e=d(u);let t=(await i()).find(t=>t.name===e);if(t===undefined){return null}else{return t.pid}};const d=e=>{if(process.platform==="win32"){return e+".exe"}else{return e}};if(process.argv.length==3&&process.argv[2]=="foreground"){c()}else{f()}},129:function(e){e.exports=require("child_process")},211:function(e){e.exports=require("https")},237:function(e,t,r){"use strict";const n=r(669);const o=r(622);const s=r(129);const i=1e3*1e3*10;const u=n.promisify(s.execFile);const c=async()=>{const e=r.ab+"fastlist.exe";const{stdout:t}=await u(r.ab+"fastlist.exe",{maxBuffer:i});return t.trim().split("\r\n").map(e=>e.split("\t")).map(([e,t,r])=>({name:e,pid:Number.parseInt(t,10),ppid:Number.parseInt(r,10)}))};const l=async(e={})=>{const t=(e.all===false?"":"a")+"wwxo";const r={};await Promise.all(["comm","args","ppid","uid","%cpu","%mem"].map(async e=>{const{stdout:n}=await u("ps",[t,`pid,${e}`],{maxBuffer:i});for(let t of n.trim().split("\n").slice(1)){t=t.trim();const[n]=t.split(" ",1);const o=t.slice(n.length+1).trim();if(r[n]===undefined){r[n]={}}r[n][e]=o}}));return Object.entries(r).filter(([,e])=>e.comm&&e.args&&e.ppid&&e.uid&&e["%cpu"]&&e["%mem"]).map(([e,t])=>({pid:Number.parseInt(e,10),name:o.basename(t.comm),cmd:t.args,ppid:Number.parseInt(t.ppid,10),uid:Number.parseInt(t.uid,10),cpu:Number.parseFloat(t["%cpu"]),memory:Number.parseFloat(t["%mem"])}))};e.exports=process.platform==="win32"?c:l;e.exports.default=e.exports},413:function(e){e.exports=require("stream")},431:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});const n=r(87);function issueCommand(e,t,r){const o=new Command(e,t,r);process.stdout.write(o.toString()+n.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const o="::";class Command{constructor(e,t,r){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=r}toString(){let e=o+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";for(const t in this.properties){if(this.properties.hasOwnProperty(t)){const r=this.properties[t];if(r){e+=`${t}=${escape(`${r||""}`)},`}}}}e+=o;const t=`${this.message||""}`;e+=escapeData(t);return e}}function escapeData(e){return e.replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escape(e){return e.replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/]/g,"%5D").replace(/;/g,"%3B")}},454:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});function _interopDefault(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var n=_interopDefault(r(413));var o=_interopDefault(r(605));var s=_interopDefault(r(835));var i=_interopDefault(r(211));var u=_interopDefault(r(761));const c=n.Readable;const l=Symbol("buffer");const f=Symbol("type");class Blob{constructor(){this[f]="";const e=arguments[0];const t=arguments[1];const r=[];let n=0;if(e){const t=e;const o=Number(t.length);for(let e=0;e<o;e++){const o=t[e];let s;if(o instanceof Buffer){s=o}else if(ArrayBuffer.isView(o)){s=Buffer.from(o.buffer,o.byteOffset,o.byteLength)}else if(o instanceof ArrayBuffer){s=Buffer.from(o)}else if(o instanceof Blob){s=o[l]}else{s=Buffer.from(typeof o==="string"?o:String(o))}n+=s.length;r.push(s)}}this[l]=Buffer.concat(r);let o=t&&t.type!==undefined&&String(t.type).toLowerCase();if(o&&!/[^\u0020-\u007E]/.test(o)){this[f]=o}}get size(){return this[l].length}get type(){return this[f]}text(){return Promise.resolve(this[l].toString())}arrayBuffer(){const e=this[l];const t=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength);return Promise.resolve(t)}stream(){const e=new c;e._read=function(){};e.push(this[l]);e.push(null);return e}toString(){return"[object Blob]"}slice(){const e=this.size;const t=arguments[0];const r=arguments[1];let n,o;if(t===undefined){n=0}else if(t<0){n=Math.max(e+t,0)}else{n=Math.min(t,e)}if(r===undefined){o=e}else if(r<0){o=Math.max(e+r,0)}else{o=Math.min(r,e)}const s=Math.max(o-n,0);const i=this[l];const u=i.slice(n,n+s);const c=new Blob([],{type:arguments[2]});c[l]=u;return c}}Object.defineProperties(Blob.prototype,{size:{enumerable:true},type:{enumerable:true},slice:{enumerable:true}});Object.defineProperty(Blob.prototype,Symbol.toStringTag,{value:"Blob",writable:false,enumerable:false,configurable:true});function FetchError(e,t,r){Error.call(this,e);this.message=e;this.type=t;if(r){this.code=this.errno=r.code}Error.captureStackTrace(this,this.constructor)}FetchError.prototype=Object.create(Error.prototype);FetchError.prototype.constructor=FetchError;FetchError.prototype.name="FetchError";let a;try{a=r(18).convert}catch(e){}const d=Symbol("Body internals");const p=n.PassThrough;function Body(e){var t=this;var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{},o=r.size;let s=o===undefined?0:o;var i=r.timeout;let u=i===undefined?0:i;if(e==null){e=null}else if(isURLSearchParams(e)){e=Buffer.from(e.toString())}else if(isBlob(e))   ;else if(Buffer.isBuffer(e))   ;else if(Object.prototype.toString.call(e)==="[object ArrayBuffer]"){e=Buffer.from(e)}else if(ArrayBuffer.isView(e)){e=Buffer.from(e.buffer,e.byteOffset,e.byteLength)}else if(e instanceof n)   ;else{e=Buffer.from(String(e))}this[d]={body:e,disturbed:false,error:null};this.size=s;this.timeout=u;if(e instanceof n){e.on("error",function(e){const r=e.name==="AbortError"?e:new FetchError(`Invalid response body while trying to fetch ${t.url}: ${e.message}`,"system",e);t[d].error=r})}}Body.prototype={get body(){return this[d].body},get bodyUsed(){return this[d].disturbed},arrayBuffer(){return consumeBody.call(this).then(function(e){return e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength)})},blob(){let e=this.headers&&this.headers.get("content-type")||"";return consumeBody.call(this).then(function(t){return Object.assign(new Blob([],{type:e.toLowerCase()}),{[l]:t})})},json(){var e=this;return consumeBody.call(this).then(function(t){try{return JSON.parse(t.toString())}catch(t){return Body.Promise.reject(new FetchError(`invalid json response body at ${e.url} reason: ${t.message}`,"invalid-json"))}})},text(){return consumeBody.call(this).then(function(e){return e.toString()})},buffer(){return consumeBody.call(this)},textConverted(){var e=this;return consumeBody.call(this).then(function(t){return convertBody(t,e.headers)})}};Object.defineProperties(Body.prototype,{body:{enumerable:true},bodyUsed:{enumerable:true},arrayBuffer:{enumerable:true},blob:{enumerable:true},json:{enumerable:true},text:{enumerable:true}});Body.mixIn=function(e){for(const t of Object.getOwnPropertyNames(Body.prototype)){if(!(t in e)){const r=Object.getOwnPropertyDescriptor(Body.prototype,t);Object.defineProperty(e,t,r)}}};function consumeBody(){var e=this;if(this[d].disturbed){return Body.Promise.reject(new TypeError(`body used already for: ${this.url}`))}this[d].disturbed=true;if(this[d].error){return Body.Promise.reject(this[d].error)}let t=this.body;if(t===null){return Body.Promise.resolve(Buffer.alloc(0))}if(isBlob(t)){t=t.stream()}if(Buffer.isBuffer(t)){return Body.Promise.resolve(t)}if(!(t instanceof n)){return Body.Promise.resolve(Buffer.alloc(0))}let r=[];let o=0;let s=false;return new Body.Promise(function(n,i){let u;if(e.timeout){u=setTimeout(function(){s=true;i(new FetchError(`Response timeout while trying to fetch ${e.url} (over ${e.timeout}ms)`,"body-timeout"))},e.timeout)}t.on("error",function(t){if(t.name==="AbortError"){s=true;i(t)}else{i(new FetchError(`Invalid response body while trying to fetch ${e.url}: ${t.message}`,"system",t))}});t.on("data",function(t){if(s||t===null){return}if(e.size&&o+t.length>e.size){s=true;i(new FetchError(`content size at ${e.url} over limit: ${e.size}`,"max-size"));return}o+=t.length;r.push(t)});t.on("end",function(){if(s){return}clearTimeout(u);try{n(Buffer.concat(r,o))}catch(t){i(new FetchError(`Could not create Buffer from response body for ${e.url}: ${t.message}`,"system",t))}})})}function convertBody(e,t){if(typeof a!=="function"){throw new Error("The package `encoding` must be installed to use the textConverted() function")}const r=t.get("content-type");let n="utf-8";let o,s;if(r){o=/charset=([^;]*)/i.exec(r)}s=e.slice(0,1024).toString();if(!o&&s){o=/<meta.+?charset=(['"])(.+?)\1/i.exec(s)}if(!o&&s){o=/<meta[\s]+?http-equiv=(['"])content-type\1[\s]+?content=(['"])(.+?)\2/i.exec(s);if(o){o=/charset=(.*)/i.exec(o.pop())}}if(!o&&s){o=/<\?xml.+?encoding=(['"])(.+?)\1/i.exec(s)}if(o){n=o.pop();if(n==="gb2312"||n==="gbk"){n="gb18030"}}return a(e,"UTF-8",n).toString()}function isURLSearchParams(e){if(typeof e!=="object"||typeof e.append!=="function"||typeof e.delete!=="function"||typeof e.get!=="function"||typeof e.getAll!=="function"||typeof e.has!=="function"||typeof e.set!=="function"){return false}return e.constructor.name==="URLSearchParams"||Object.prototype.toString.call(e)==="[object URLSearchParams]"||typeof e.sort==="function"}function isBlob(e){return typeof e==="object"&&typeof e.arrayBuffer==="function"&&typeof e.type==="string"&&typeof e.stream==="function"&&typeof e.constructor==="function"&&typeof e.constructor.name==="string"&&/^(Blob|File)$/.test(e.constructor.name)&&/^(Blob|File)$/.test(e[Symbol.toStringTag])}function clone(e){let t,r;let o=e.body;if(e.bodyUsed){throw new Error("cannot clone body after it is used")}if(o instanceof n&&typeof o.getBoundary!=="function"){t=new p;r=new p;o.pipe(t);o.pipe(r);e[d].body=t;o=r}return o}function extractContentType(e){if(e===null){return null}else if(typeof e==="string"){return"text/plain;charset=UTF-8"}else if(isURLSearchParams(e)){return"application/x-www-form-urlencoded;charset=UTF-8"}else if(isBlob(e)){return e.type||null}else if(Buffer.isBuffer(e)){return null}else if(Object.prototype.toString.call(e)==="[object ArrayBuffer]"){return null}else if(ArrayBuffer.isView(e)){return null}else if(typeof e.getBoundary==="function"){return`multipart/form-data;boundary=${e.getBoundary()}`}else if(e instanceof n){return null}else{return"text/plain;charset=UTF-8"}}function getTotalBytes(e){const t=e.body;if(t===null){return 0}else if(isBlob(t)){return t.size}else if(Buffer.isBuffer(t)){return t.length}else if(t&&typeof t.getLengthSync==="function"){if(t._lengthRetrievers&&t._lengthRetrievers.length==0||t.hasKnownLength&&t.hasKnownLength()){return t.getLengthSync()}return null}else{return null}}function writeToStream(e,t){const r=t.body;if(r===null){e.end()}else if(isBlob(r)){r.stream().pipe(e)}else if(Buffer.isBuffer(r)){e.write(r);e.end()}else{r.pipe(e)}}Body.Promise=global.Promise;const h=/[^\^_`a-zA-Z\-0-9!#$%&'*+.|~]/;const m=/[^\t\x20-\x7e\x80-\xff]/;function validateName(e){e=`${e}`;if(h.test(e)||e===""){throw new TypeError(`${e} is not a legal HTTP header name`)}}function validateValue(e){e=`${e}`;if(m.test(e)){throw new TypeError(`${e} is not a legal HTTP header value`)}}function find(e,t){t=t.toLowerCase();for(const r in e){if(r.toLowerCase()===t){return r}}return undefined}const y=Symbol("map");class Headers{constructor(){let e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:undefined;this[y]=Object.create(null);if(e instanceof Headers){const t=e.raw();const r=Object.keys(t);for(const e of r){for(const r of t[e]){this.append(e,r)}}return}if(e==null)   ;else if(typeof e==="object"){const t=e[Symbol.iterator];if(t!=null){if(typeof t!=="function"){throw new TypeError("Header pairs must be iterable")}const r=[];for(const t of e){if(typeof t!=="object"||typeof t[Symbol.iterator]!=="function"){throw new TypeError("Each header pair must be iterable")}r.push(Array.from(t))}for(const e of r){if(e.length!==2){throw new TypeError("Each header pair must be a name/value tuple")}this.append(e[0],e[1])}}else{for(const t of Object.keys(e)){const r=e[t];this.append(t,r)}}}else{throw new TypeError("Provided initializer must be an object")}}get(e){e=`${e}`;validateName(e);const t=find(this[y],e);if(t===undefined){return null}return this[y][t].join(", ")}forEach(e){let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:undefined;let r=getHeaders(this);let n=0;while(n<r.length){var o=r[n];const s=o[0],i=o[1];e.call(t,i,s,this);r=getHeaders(this);n++}}set(e,t){e=`${e}`;t=`${t}`;validateName(e);validateValue(t);const r=find(this[y],e);this[y][r!==undefined?r:e]=[t]}append(e,t){e=`${e}`;t=`${t}`;validateName(e);validateValue(t);const r=find(this[y],e);if(r!==undefined){this[y][r].push(t)}else{this[y][e]=[t]}}has(e){e=`${e}`;validateName(e);return find(this[y],e)!==undefined}delete(e){e=`${e}`;validateName(e);const t=find(this[y],e);if(t!==undefined){delete this[y][t]}}raw(){return this[y]}keys(){return createHeadersIterator(this,"key")}values(){return createHeadersIterator(this,"value")}[Symbol.iterator](){return createHeadersIterator(this,"key+value")}}Headers.prototype.entries=Headers.prototype[Symbol.iterator];Object.defineProperty(Headers.prototype,Symbol.toStringTag,{value:"Headers",writable:false,enumerable:false,configurable:true});Object.defineProperties(Headers.prototype,{get:{enumerable:true},forEach:{enumerable:true},set:{enumerable:true},append:{enumerable:true},has:{enumerable:true},delete:{enumerable:true},keys:{enumerable:true},values:{enumerable:true},entries:{enumerable:true}});function getHeaders(e){let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"key+value";const r=Object.keys(e[y]).sort();return r.map(t==="key"?function(e){return e.toLowerCase()}:t==="value"?function(t){return e[y][t].join(", ")}:function(t){return[t.toLowerCase(),e[y][t].join(", ")]})}const b=Symbol("internal");function createHeadersIterator(e,t){const r=Object.create(g);r[b]={target:e,kind:t,index:0};return r}const g=Object.setPrototypeOf({next(){if(!this||Object.getPrototypeOf(this)!==g){throw new TypeError("Value of `this` is not a HeadersIterator")}var e=this[b];const t=e.target,r=e.kind,n=e.index;const o=getHeaders(t,r);const s=o.length;if(n>=s){return{value:undefined,done:true}}this[b].index=n+1;return{value:o[n],done:false}}},Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]())));Object.defineProperty(g,Symbol.toStringTag,{value:"HeadersIterator",writable:false,enumerable:false,configurable:true});function exportNodeCompatibleHeaders(e){const t=Object.assign({__proto__:null},e[y]);const r=find(e[y],"Host");if(r!==undefined){t[r]=t[r][0]}return t}function createHeadersLenient(e){const t=new Headers;for(const r of Object.keys(e)){if(h.test(r)){continue}if(Array.isArray(e[r])){for(const n of e[r]){if(m.test(n)){continue}if(t[y][r]===undefined){t[y][r]=[n]}else{t[y][r].push(n)}}}else if(!m.test(e[r])){t[y][r]=[e[r]]}}return t}const w=Symbol("Response internals");const B=o.STATUS_CODES;class Response{constructor(){let e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};Body.call(this,e,t);const r=t.status||200;const n=new Headers(t.headers);if(e!=null&&!n.has("Content-Type")){const t=extractContentType(e);if(t){n.append("Content-Type",t)}}this[w]={url:t.url,status:r,statusText:t.statusText||B[r],headers:n,counter:t.counter}}get url(){return this[w].url||""}get status(){return this[w].status}get ok(){return this[w].status>=200&&this[w].status<300}get redirected(){return this[w].counter>0}get statusText(){return this[w].statusText}get headers(){return this[w].headers}clone(){return new Response(clone(this),{url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected})}}Body.mixIn(Response.prototype);Object.defineProperties(Response.prototype,{url:{enumerable:true},status:{enumerable:true},ok:{enumerable:true},redirected:{enumerable:true},statusText:{enumerable:true},headers:{enumerable:true},clone:{enumerable:true}});Object.defineProperty(Response.prototype,Symbol.toStringTag,{value:"Response",writable:false,enumerable:false,configurable:true});const x=Symbol("Request internals");const T=s.parse;const E=s.format;const S="destroy"in n.Readable.prototype;function isRequest(e){return typeof e==="object"&&typeof e[x]==="object"}function isAbortSignal(e){const t=e&&typeof e==="object"&&Object.getPrototypeOf(e);return!!(t&&t.constructor.name==="AbortSignal")}class Request{constructor(e){let t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};let r;if(!isRequest(e)){if(e&&e.href){r=T(e.href)}else{r=T(`${e}`)}e={}}else{r=T(e.url)}let n=t.method||e.method||"GET";n=n.toUpperCase();if((t.body!=null||isRequest(e)&&e.body!==null)&&(n==="GET"||n==="HEAD")){throw new TypeError("Request with GET/HEAD method cannot have body")}let o=t.body!=null?t.body:isRequest(e)&&e.body!==null?clone(e):null;Body.call(this,o,{timeout:t.timeout||e.timeout||0,size:t.size||e.size||0});const s=new Headers(t.headers||e.headers||{});if(o!=null&&!s.has("Content-Type")){const e=extractContentType(o);if(e){s.append("Content-Type",e)}}let i=isRequest(e)?e.signal:null;if("signal"in t)i=t.signal;if(i!=null&&!isAbortSignal(i)){throw new TypeError("Expected signal to be an instanceof AbortSignal")}this[x]={method:n,redirect:t.redirect||e.redirect||"follow",headers:s,parsedURL:r,signal:i};this.follow=t.follow!==undefined?t.follow:e.follow!==undefined?e.follow:20;this.compress=t.compress!==undefined?t.compress:e.compress!==undefined?e.compress:true;this.counter=t.counter||e.counter||0;this.agent=t.agent||e.agent}get method(){return this[x].method}get url(){return E(this[x].parsedURL)}get headers(){return this[x].headers}get redirect(){return this[x].redirect}get signal(){return this[x].signal}clone(){return new Request(this)}}Body.mixIn(Request.prototype);Object.defineProperty(Request.prototype,Symbol.toStringTag,{value:"Request",writable:false,enumerable:false,configurable:true});Object.defineProperties(Request.prototype,{method:{enumerable:true},url:{enumerable:true},headers:{enumerable:true},redirect:{enumerable:true},clone:{enumerable:true},signal:{enumerable:true}});function getNodeRequestOptions(e){const t=e[x].parsedURL;const r=new Headers(e[x].headers);if(!r.has("Accept")){r.set("Accept","*/*")}if(!t.protocol||!t.hostname){throw new TypeError("Only absolute URLs are supported")}if(!/^https?:$/.test(t.protocol)){throw new TypeError("Only HTTP(S) protocols are supported")}if(e.signal&&e.body instanceof n.Readable&&!S){throw new Error("Cancellation of streamed requests with AbortSignal is not supported in node < 8")}let o=null;if(e.body==null&&/^(POST|PUT)$/i.test(e.method)){o="0"}if(e.body!=null){const t=getTotalBytes(e);if(typeof t==="number"){o=String(t)}}if(o){r.set("Content-Length",o)}if(!r.has("User-Agent")){r.set("User-Agent","node-fetch/1.0 (+https://github.com/bitinn/node-fetch)")}if(e.compress&&!r.has("Accept-Encoding")){r.set("Accept-Encoding","gzip,deflate")}let s=e.agent;if(typeof s==="function"){s=s(t)}if(!r.has("Connection")&&!s){r.set("Connection","close")}return Object.assign({},t,{method:e.method,headers:exportNodeCompatibleHeaders(r),agent:s})}function AbortError(e){Error.call(this,e);this.type="aborted";this.message=e;Error.captureStackTrace(this,this.constructor)}AbortError.prototype=Object.create(Error.prototype);AbortError.prototype.constructor=AbortError;AbortError.prototype.name="AbortError";const O=n.PassThrough;const v=s.resolve;function fetch(e,t){if(!fetch.Promise){throw new Error("native promise missing, set fetch.Promise to your favorite alternative")}Body.Promise=fetch.Promise;return new fetch.Promise(function(r,s){const c=new Request(e,t);const l=getNodeRequestOptions(c);const f=(l.protocol==="https:"?i:o).request;const a=c.signal;let d=null;const p=function abort(){let e=new AbortError("The user aborted a request.");s(e);if(c.body&&c.body instanceof n.Readable){c.body.destroy(e)}if(!d||!d.body)return;d.body.emit("error",e)};if(a&&a.aborted){p();return}const h=function abortAndFinalize(){p();finalize()};const m=f(l);let y;if(a){a.addEventListener("abort",h)}function finalize(){m.abort();if(a)a.removeEventListener("abort",h);clearTimeout(y)}if(c.timeout){m.once("socket",function(e){y=setTimeout(function(){s(new FetchError(`network timeout at: ${c.url}`,"request-timeout"));finalize()},c.timeout)})}m.on("error",function(e){s(new FetchError(`request to ${c.url} failed, reason: ${e.message}`,"system",e));finalize()});m.on("response",function(e){clearTimeout(y);const t=createHeadersLenient(e.headers);if(fetch.isRedirect(e.statusCode)){const n=t.get("Location");const o=n===null?null:v(c.url,n);switch(c.redirect){case"error":s(new FetchError(`redirect mode is set to error: ${c.url}`,"no-redirect"));finalize();return;case"manual":if(o!==null){try{t.set("Location",o)}catch(e){s(e)}}break;case"follow":if(o===null){break}if(c.counter>=c.follow){s(new FetchError(`maximum redirect reached at: ${c.url}`,"max-redirect"));finalize();return}const n={headers:new Headers(c.headers),follow:c.follow,counter:c.counter+1,agent:c.agent,compress:c.compress,method:c.method,body:c.body,signal:c.signal,timeout:c.timeout};if(e.statusCode!==303&&c.body&&getTotalBytes(c)===null){s(new FetchError("Cannot follow redirect with body being a readable stream","unsupported-redirect"));finalize();return}if(e.statusCode===303||(e.statusCode===301||e.statusCode===302)&&c.method==="POST"){n.method="GET";n.body=undefined;n.headers.delete("content-length")}r(fetch(new Request(o,n)));finalize();return}}e.once("end",function(){if(a)a.removeEventListener("abort",h)});let n=e.pipe(new O);const o={url:c.url,status:e.statusCode,statusText:e.statusMessage,headers:t,size:c.size,timeout:c.timeout,counter:c.counter};const i=t.get("Content-Encoding");if(!c.compress||c.method==="HEAD"||i===null||e.statusCode===204||e.statusCode===304){d=new Response(n,o);r(d);return}const l={flush:u.Z_SYNC_FLUSH,finishFlush:u.Z_SYNC_FLUSH};if(i=="gzip"||i=="x-gzip"){n=n.pipe(u.createGunzip(l));d=new Response(n,o);r(d);return}if(i=="deflate"||i=="x-deflate"){const t=e.pipe(new O);t.once("data",function(e){if((e[0]&15)===8){n=n.pipe(u.createInflate())}else{n=n.pipe(u.createInflateRaw())}d=new Response(n,o);r(d)});return}if(i=="br"&&typeof u.createBrotliDecompress==="function"){n=n.pipe(u.createBrotliDecompress());d=new Response(n,o);r(d);return}d=new Response(n,o);r(d)});writeToStream(m,c)})}fetch.isRedirect=function(e){return e===301||e===302||e===303||e===307||e===308};fetch.Promise=global.Promise;e.exports=t=fetch;Object.defineProperty(t,"__esModule",{value:true});t.default=t;t.Headers=Headers;t.Request=Request;t.Response=Response;t.FetchError=FetchError},470:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){function adopt(e){return e instanceof r?e:new r(function(t){t(e)})}return new(r||(r=Promise))(function(r,o){function fulfilled(e){try{step(n.next(e))}catch(e){o(e)}}function rejected(e){try{step(n["throw"](e))}catch(e){o(e)}}function step(e){e.done?r(e.value):adopt(e.value).then(fulfilled,rejected)}step((n=n.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:true});const o=r(431);const s=r(87);const i=r(622);var u;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(u=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){process.env[e]=t;o.issueCommand("set-env",{name:e},t)}t.exportVariable=exportVariable;function exportSecret(e,t){exportVariable(e,t);o.issueCommand("set-secret",{},t);throw new Error("Not implemented.")}t.exportSecret=exportSecret;function addPath(e){o.issueCommand("add-path",{},e);process.env["PATH"]=`${e}${i.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!r){throw new Error(`Input required and not supplied: ${e}`)}return r.trim()}t.getInput=getInput;function setOutput(e,t){o.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setFailed(e){process.exitCode=u.Failure;error(e)}t.setFailed=setFailed;function debug(e){o.issueCommand("debug",{},e)}t.debug=debug;function error(e){o.issue("error",e)}t.error=error;function warning(e){o.issue("warning",e)}t.warning=warning;function info(e){process.stdout.write(e+s.EOL)}t.info=info;function startGroup(e){o.issue("group",e)}t.startGroup=startGroup;function endGroup(){o.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return n(this,void 0,void 0,function*(){startGroup(e);let r;try{r=yield t()}finally{endGroup()}return r})}t.group=group},605:function(e){e.exports=require("http")},622:function(e){e.exports=require("path")},669:function(e){e.exports=require("util")},761:function(e){e.exports=require("zlib")},835:function(e){e.exports=require("url")}});