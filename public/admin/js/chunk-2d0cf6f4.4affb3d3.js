(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf6f4"],{6466:function(e,n,t){(function(e){e(t("56b3"),t("f9d4"))})((function(e){"use strict";e.defineMode("pegjs",(function(n){var t=e.getMode(n,"javascript");function r(e){return e.match(/^[a-zA-Z_][a-zA-Z0-9_]*/)}return{startState:function(){return{inString:!1,stringType:null,inComment:!1,inCharacterClass:!1,braced:0,lhs:!0,localState:null}},token:function(n,i){if(n&&(i.inString||i.inComment||'"'!=n.peek()&&"'"!=n.peek()||(i.stringType=n.peek(),n.next(),i.inString=!0)),i.inString||i.inComment||!n.match(/^\/\*/)||(i.inComment=!0),i.inString){while(i.inString&&!n.eol())n.peek()===i.stringType?(n.next(),i.inString=!1):"\\"===n.peek()?(n.next(),n.next()):n.match(/^.[^\\\"\']*/);return i.lhs?"property string":"string"}if(i.inComment){while(i.inComment&&!n.eol())n.match(/\*\//)?i.inComment=!1:n.match(/^.[^\*]*/);return"comment"}if(i.inCharacterClass)while(i.inCharacterClass&&!n.eol())n.match(/^[^\]\\]+/)||n.match(/^\\./)||(i.inCharacterClass=!1);else{if("["===n.peek())return n.next(),i.inCharacterClass=!0,"bracket";if(n.match(/^\/\//))return n.skipToEnd(),"comment";if(i.braced||"{"===n.peek()){null===i.localState&&(i.localState=e.startState(t));var a=t.token(n,i.localState),c=n.current();if(!a)for(var o=0;o<c.length;o++)"{"===c[o]?i.braced++:"}"===c[o]&&i.braced--;return a}if(r(n))return":"===n.peek()?"variable":"variable-2";if(-1!=["[","]","(",")"].indexOf(n.peek()))return n.next(),"bracket";n.eatSpace()||n.next()}return null}}}),"javascript")}))}}]);
//# sourceMappingURL=chunk-2d0cf6f4.4affb3d3.js.map